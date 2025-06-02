/**
 * @fileoverview Bootstrap Optimizer for DSTyS
 *
 * The Bootstrap optimizer is a simple but effective optimizer that runs a module
 * on training examples, collects traces, selects the best examples as few-shot
 * demonstrations, and updates module parameters.
 */

import { Effect } from 'effect'
import {
  BaseOptimizer,
  type OptimizerConfig,
  type OptimizationResult,
  type OptimizerErrors,
  OptimizerDataError,
  OptimizerConfigError
} from './optimizer.js'
import type { Module } from '../primitives/module.js'
import type { Example } from '../schemas/example.js'
import { globalTraceCollector, type Trace } from '../primitives/trace.js'

/**
 * Configuration specific to Bootstrap optimizer
 */
export interface BootstrapConfig extends OptimizerConfig {
  // Maximum number of examples to use as demonstrations
  maxBootstraps?: number

  // Minimum success rate required for an example to be selected
  minSuccessRate?: number

  // Whether to use validation set for example selection
  useValidation?: boolean

  // Strategy for selecting examples ('best', 'diverse', 'random')
  selectionStrategy?: 'best' | 'diverse' | 'random'

  // Number of attempts per example during bootstrap
  attemptsPerExample?: number
}

/**
 * Bootstrap optimizer implementation
 *
 * This optimizer works by:
 * 1. Running the module on training examples to collect traces
 * 2. Identifying successful examples and their traces
 * 3. Selecting the best examples as few-shot demonstrations
 * 4. Updating the module's parameters with selected examples
 */
export class BootstrapOptimizer extends BaseOptimizer {
  private bootstrapConfig: BootstrapConfig

  constructor(config: BootstrapConfig = {}) {
    super(config)
    this.bootstrapConfig = {
      maxBootstraps: 8,
      minSuccessRate: 0.8,
      useValidation: true,
      selectionStrategy: 'best',
      attemptsPerExample: 3,
      ...config
    }
  }

  /**
   * Optimize a module using bootstrap method
   */
  optimize(
    module: Module,
    trainset: Example[],
    config?: OptimizerConfig
  ): Effect.Effect<OptimizationResult, OptimizerErrors> {
    const self = this
    return Effect.gen(function* () {
      // Merge configs
      const finalConfig = { ...self.bootstrapConfig, ...config }

      if (trainset.length === 0) {
        yield* Effect.fail(new OptimizerDataError('Empty training dataset'))
      }

      // Clear previous traces
      yield* globalTraceCollector.clear()

      // Split dataset if using validation
      const { train, validation } = finalConfig.useValidation
        ? self.splitDataset(trainset, finalConfig.validationSplit || 0.2)
        : { train: trainset, validation: [] }

      // Get initial performance
      const initialMetrics = yield* self.evaluate(module, validation.length > 0 ? validation : train)

      // Create a copy of the module for optimization
      const optimizedModule = yield* module.deepcopy()

      // Bootstrap process
      const bootstrapExamples = yield* self.runBootstrap(optimizedModule, train, finalConfig)

      // Update module with selected examples
      yield* optimizedModule.updateParams({
        examples: bootstrapExamples
      })

      // Evaluate final performance
      const finalMetrics = yield* self.evaluate(optimizedModule, validation.length > 0 ? validation : train)

      // Collect all traces
      const traceCollection = yield* globalTraceCollector.getCollection()

      const result: OptimizationResult = {
        optimizedModule,
        initialMetrics,
        finalMetrics,
        iterations: 1, // Bootstrap is typically single iteration
        converged: true,
        traces: traceCollection.traces,
        metadata: {
          bootstrapExamples: bootstrapExamples.length,
          selectionStrategy: finalConfig.selectionStrategy,
          totalTrainingExamples: train.length
        }
      }

      return result
    })
  }

  /**
   * Run the bootstrap process to select best examples
   */
  private runBootstrap(
    module: Module,
    trainset: Example[],
    config: BootstrapConfig
  ): Effect.Effect<Example[], OptimizerErrors> {
    const self = this
    return Effect.gen(function* () {
      const candidateExamples: Array<{ example: Example; traces: Trace[]; successRate: number }> = []

      // Run module on each training example multiple times
      for (const example of trainset) {
        const exampleTraces: Trace[] = []
        let successCount = 0

        // Extract inputs from example
        const inputs: Record<string, unknown> = {}
        for (const key of example.inputKeys || []) {
          inputs[key] = example.data[key]
        }

        // Extract expected outputs
        const expected: Record<string, unknown> = {}
        for (const [key, value] of Object.entries(example.data)) {
          if (!(example.inputKeys || []).includes(key)) {
            expected[key] = value
          }
        }

        // Run multiple attempts
        for (let attempt = 0; attempt < (config.attemptsPerExample || 3); attempt++) {
          try {
            const prediction = yield* module.__call__(inputs)

            // Get the trace for this execution
            const allTraces = yield* globalTraceCollector.getTraces()
            const latestTrace = allTraces[allTraces.length - 1]

            if (latestTrace) {
              exampleTraces.push(latestTrace)

              // Check if this attempt was successful
              const actual = prediction.completions?.[0]?.['data'] || {}
              if (self.isCorrect(expected, actual)) {
                successCount++
              }
            }
          } catch (error) {
            // Failed attempt, continue
          }
        }

        const successRate = successCount / (config.attemptsPerExample || 3)

        // Only consider examples that meet minimum success rate
        if (successRate >= (config.minSuccessRate || 0.8)) {
          candidateExamples.push({
            example,
            traces: exampleTraces,
            successRate
          })
        }
      }

      // Select best examples based on strategy
      const selectedExamples = self.selectExamples(candidateExamples, config)

      return selectedExamples.map((candidate) => candidate.example)
    })
  }

  /**
   * Select examples based on the configured strategy
   */
  private selectExamples(
    candidates: Array<{ example: Example; traces: Trace[]; successRate: number }>,
    config: BootstrapConfig
  ): Array<{ example: Example; traces: Trace[]; successRate: number }> {
    const maxBootstraps = config.maxBootstraps || 8

    if (candidates.length <= maxBootstraps) {
      return candidates
    }

    switch (config.selectionStrategy) {
      case 'best':
        return candidates.sort((a, b) => b.successRate - a.successRate).slice(0, maxBootstraps)

      case 'diverse':
        // Simple diversity selection - could be improved with more sophisticated methods
        return this.selectDiverseExamples(candidates, maxBootstraps)

      case 'random':
        return candidates.sort(() => Math.random() - 0.5).slice(0, maxBootstraps)

      default:
        return candidates.sort((a, b) => b.successRate - a.successRate).slice(0, maxBootstraps)
    }
  }

  /**
   * Select diverse examples (simple implementation)
   */
  private selectDiverseExamples(
    candidates: Array<{ example: Example; traces: Trace[]; successRate: number }>,
    maxCount: number
  ): Array<{ example: Example; traces: Trace[]; successRate: number }> {
    const selected: Array<{ example: Example; traces: Trace[]; successRate: number }> = []
    const remaining = [...candidates]

    // Start with the best example
    remaining.sort((a, b) => b.successRate - a.successRate)
    const first = remaining.shift()
    if (first) {
      selected.push(first)
    }

    // Select remaining examples based on diversity
    while (selected.length < maxCount && remaining.length > 0) {
      let bestCandidate = remaining[0]
      let maxDiversity = 0

      for (const candidate of remaining) {
        const diversity = this.calculateDiversity(candidate, selected)
        if (diversity > maxDiversity) {
          maxDiversity = diversity
          bestCandidate = candidate
        }
      }

      selected.push(bestCandidate)
      remaining.splice(remaining.indexOf(bestCandidate), 1)
    }

    return selected
  }

  /**
   * Calculate diversity score for an example compared to already selected examples
   */
  private calculateDiversity(
    candidate: { example: Example; traces: Trace[]; successRate: number },
    selected: Array<{ example: Example; traces: Trace[]; successRate: number }>
  ): number {
    if (selected.length === 0) return 1

    // Simple diversity based on input/output differences
    let totalDifference = 0

    for (const selectedCandidate of selected) {
      let difference = 0

      // Compare input values
      for (const key of candidate.example.inputKeys || []) {
        const candidateValue = String(candidate.example.data[key] || '')
        const selectedValue = String(selectedCandidate.example.data[key] || '')
        if (candidateValue !== selectedValue) {
          difference += 1
        }
      }

      // Compare output values
      for (const [key, value] of Object.entries(candidate.example.data)) {
        if (!(candidate.example.inputKeys || []).includes(key)) {
          const candidateValue = String(value || '')
          const selectedValue = String(selectedCandidate.example.data[key] || '')
          if (candidateValue !== selectedValue) {
            difference += 1
          }
        }
      }

      totalDifference += difference
    }

    return totalDifference / selected.length
  }

  /**
   * Update bootstrap-specific configuration
   */
  updateBootstrapConfig(config: Partial<BootstrapConfig>): Effect.Effect<void, OptimizerErrors> {
    return Effect.try({
      try: () => {
        this.bootstrapConfig = { ...this.bootstrapConfig, ...config }
      },
      catch: () => new OptimizerConfigError('Failed to update bootstrap config')
    })
  }

  /**
   * Get bootstrap-specific configuration
   */
  getBootstrapConfig(): BootstrapConfig {
    return { ...this.bootstrapConfig }
  }
}

/**
 * Utility function to create a Bootstrap optimizer
 */
export const createBootstrapOptimizer = (config: BootstrapConfig = {}): BootstrapOptimizer => {
  return new BootstrapOptimizer(config)
}
