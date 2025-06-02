/**
 * @fileoverview Optimizer Interface and Base Implementation for DSTyS
 *
 * This module defines the interface for optimizers and provides a base
 * implementation with common functionality.
 */

import { Effect } from 'effect'
import type { Module } from '../primitives/module.js'
import type { Example } from '../schemas/example.js'
import type { Trace } from '../primitives/trace.js'

/**
 * Error types for optimizer operations
 */
export class OptimizerError extends Error {
  readonly _tag = 'OptimizerError' as const

  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'OptimizerError'
  }
}

export class OptimizerConfigError extends Error {
  readonly _tag = 'OptimizerConfigError' as const

  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'OptimizerConfigError'
  }
}

export class OptimizerDataError extends Error {
  readonly _tag = 'OptimizerDataError' as const

  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'OptimizerDataError'
  }
}

export type OptimizerErrors = OptimizerError | OptimizerConfigError | OptimizerDataError

/**
 * Optimization metrics returned by evaluation
 */
export interface OptimizationMetrics {
  accuracy: number
  successRate: number
  avgExecutionTime: number
  [key: string]: number
}

/**
 * Configuration for optimizers
 */
export interface OptimizerConfig {
  maxIterations?: number
  convergenceThreshold?: number
  validationSplit?: number
  earlyStoppingPatience?: number
  verbose?: boolean
  [key: string]: unknown
}

/**
 * Result of optimization process
 */
export interface OptimizationResult {
  optimizedModule: Module
  initialMetrics: OptimizationMetrics
  finalMetrics: OptimizationMetrics
  iterations: number
  converged: boolean
  traces: Trace[]
  metadata?: Record<string, unknown>
}

/**
 * Interface for all optimizers
 *
 * Optimizers are responsible for improving module performance by:
 * 1. Running modules on training data
 * 2. Collecting traces and performance metrics
 * 3. Updating module parameters based on results
 * 4. Evaluating improvements
 */
export interface Optimizer {
  /**
   * Optimize a module using the provided training data
   *
   * @param module - The module to optimize
   * @param trainset - Training examples
   * @param config - Optional configuration overrides
   * @returns Effect that produces optimization results or fails with OptimizerError
   */
  optimize(
    module: Module,
    trainset: Example[],
    config?: OptimizerConfig
  ): Effect.Effect<OptimizationResult, OptimizerErrors>

  /**
   * Evaluate a module's performance on a dataset
   *
   * @param module - The module to evaluate
   * @param dataset - Evaluation dataset
   * @returns Effect that produces metrics or fails with OptimizerError
   */
  evaluate(module: Module, dataset: Example[]): Effect.Effect<OptimizationMetrics, OptimizerErrors>

  /**
   * Get the optimizer's configuration
   */
  getConfig(): OptimizerConfig

  /**
   * Update the optimizer's configuration
   */
  updateConfig(config: Partial<OptimizerConfig>): Effect.Effect<void, OptimizerConfigError>
}

/**
 * Base optimizer implementation with common functionality
 *
 * This class provides default implementations for common optimizer operations
 * and can be extended by specific optimizer implementations.
 */
export abstract class BaseOptimizer implements Optimizer {
  protected config: OptimizerConfig

  constructor(config: OptimizerConfig = {}) {
    this.config = {
      maxIterations: 10,
      convergenceThreshold: 0.01,
      validationSplit: 0.2,
      earlyStoppingPatience: 3,
      verbose: false,
      ...config
    }
  }

  /**
   * Abstract method that must be implemented by subclasses
   */
  abstract optimize(
    module: Module,
    trainset: Example[],
    config?: OptimizerConfig
  ): Effect.Effect<OptimizationResult, OptimizerErrors>

  /**
   * Default evaluation implementation
   */
  evaluate(module: Module, dataset: Example[]): Effect.Effect<OptimizationMetrics, OptimizerErrors> {
    const self = this
    return Effect.gen(function* () {
      if (dataset.length === 0) {
        yield* Effect.fail(new OptimizerDataError('Empty evaluation dataset'))
      }

      let successCount = 0
      let totalTime = 0
      const results: Array<{ expected: unknown; actual: unknown }> = []

      for (const example of dataset) {
        const startTime = Date.now()

        try {
          // Extract inputs from example
          const inputs: Record<string, unknown> = {}
          for (const key of example.inputKeys || []) {
            inputs[key] = example.data[key]
          }

          // Run the module
          const prediction = yield* Effect.mapError(
            module.__call__(inputs),
            (error) => new OptimizerError('Module execution failed', error)
          )
          const duration = Date.now() - startTime
          totalTime += duration

          // Extract expected outputs
          const expected: Record<string, unknown> = {}
          for (const [key, value] of Object.entries(example.data)) {
            if (!(example.inputKeys || []).includes(key)) {
              expected[key] = value
            }
          }

          // Extract actual outputs
          const actual = prediction.completions?.[0]?.['data'] || ({} as Record<string, unknown>)

          results.push({ expected, actual })

          // Simple success check (can be overridden by subclasses)
          if (self.isCorrect(expected, actual)) {
            successCount++
          }
        } catch (error) {
          // Count failures
          totalTime += Date.now() - startTime
        }
      }

      const metrics: OptimizationMetrics = {
        accuracy: successCount / dataset.length,
        successRate: successCount / dataset.length,
        avgExecutionTime: totalTime / dataset.length
      }

      return metrics
    })
  }

  getConfig(): OptimizerConfig {
    return { ...this.config }
  }

  updateConfig(config: Partial<OptimizerConfig>): Effect.Effect<void, OptimizerConfigError> {
    return Effect.try({
      try: () => {
        this.config = { ...this.config, ...config }
      },
      catch: () => new OptimizerConfigError('Failed to update config')
    })
  }

  /**
   * Check if the actual output matches the expected output
   * Can be overridden by subclasses for custom comparison logic
   */
  protected isCorrect(expected: unknown, actual: unknown): boolean {
    // Simple string comparison for now
    // Subclasses can override for more sophisticated comparison
    return JSON.stringify(expected) === JSON.stringify(actual)
  }

  /**
   * Split dataset into training and validation sets
   */
  protected splitDataset(dataset: Example[], validationSplit: number): { train: Example[]; validation: Example[] } {
    const shuffled = [...dataset].sort(() => Math.random() - 0.5)
    const splitIndex = Math.floor(dataset.length * (1 - validationSplit))

    return {
      train: shuffled.slice(0, splitIndex),
      validation: shuffled.slice(splitIndex)
    }
  }

  /**
   * Check if optimization has converged
   */
  protected hasConverged(
    currentMetrics: OptimizationMetrics,
    previousMetrics: OptimizationMetrics,
    threshold: number = this.config.convergenceThreshold || 0.01
  ): boolean {
    const improvement = currentMetrics.accuracy - previousMetrics.accuracy
    return Math.abs(improvement) < threshold
  }

  /**
   * Log optimization progress if verbose mode is enabled
   */
  protected log(message: string): void {
    if (this.config.verbose) {
      console.log(`[${this.constructor.name}] ${message}`)
    }
  }
}

/**
 * Utility functions for optimizers
 */
export const OptimizerUtils = {
  /**
   * Create a default optimizer configuration
   */
  createDefaultConfig(overrides: Partial<OptimizerConfig> = {}): OptimizerConfig {
    return {
      maxIterations: 10,
      convergenceThreshold: 0.01,
      validationSplit: 0.2,
      earlyStoppingPatience: 3,
      verbose: false,
      ...overrides
    }
  },

  /**
   * Calculate accuracy from predictions
   */
  calculateAccuracy(predictions: Array<{ expected: unknown; actual: unknown }>): number {
    if (predictions.length === 0) return 0

    const correct = predictions.filter((p) => JSON.stringify(p.expected) === JSON.stringify(p.actual)).length

    return correct / predictions.length
  },

  /**
   * Calculate diversity score for a set of examples
   */
  calculateDiversity(examples: Example[]): number {
    if (examples.length <= 1) return 0

    let totalDifferences = 0
    let comparisons = 0

    for (let i = 0; i < examples.length; i++) {
      for (let j = i + 1; j < examples.length; j++) {
        const example1 = examples[i]
        const example2 = examples[j]

        if (!example1 || !example2) continue

        // Compare input values
        let differences = 0
        for (const key of example1.inputKeys || []) {
          if (example1.data[key] !== example2.data[key]) {
            differences++
          }
        }

        totalDifferences += differences
        comparisons++
      }
    }

    return comparisons > 0 ? totalDifferences / comparisons : 0
  }
}
