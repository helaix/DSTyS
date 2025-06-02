/**
 * @fileoverview Tests for the Module class
 *
 * These tests verify the core functionality of the Module base class,
 * including parameter management, composition, deep copying, and state management.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Effect, pipe } from 'effect'
import { Module, ModuleError, ModuleNotImplementedError, type Parameter, type LM } from './module.js'
import type { Example } from '../schemas/example.js'
import type { Prediction } from '../schemas/prediction.js'
import type { Signature } from '../schemas/signature.js'

// Mock implementations for testing
class MockParameter implements Parameter {
  readonly _tag = 'Parameter' as const

  constructor(public value: string = 'test') {}

  reset(): Effect.Effect<void, never> {
    this.value = 'reset'
    return Effect.void
  }

  dumpState(): Effect.Effect<Record<string, unknown>, never> {
    return Effect.succeed({ value: this.value })
  }

  loadState(state: Record<string, unknown>): Effect.Effect<void, ModuleError> {
    this.value = state.value as string
    return Effect.void
  }
}

class MockLM implements LM {
  readonly _tag = 'LM' as const

  constructor(public name: string = 'mock-lm') {}
}

class TestModule extends Module {
  public testParam: MockParameter
  public subModule: TestModule | null = null

  constructor() {
    super()
    this.testParam = new MockParameter()
  }

  forward(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError> {
    // Mock implementation for testing
    return Effect.succeed({
      completions: [{ text: `Processed: ${JSON.stringify(inputs)}` }],
      reasoning: 'Mock reasoning',
      confidence: 0.9
    } as Prediction)
  }
}

class CompiledTestModule extends TestModule {
  constructor() {
    super()
    this._compiled = true
  }
}

class NestedTestModule extends Module {
  public level1: TestModule
  public level2: { nested: TestModule }
  public arrayModules: TestModule[]

  constructor() {
    super()
    this.level1 = new TestModule()
    this.level2 = { nested: new TestModule() }
    this.arrayModules = [new TestModule(), new TestModule()]
  }

  forward(inputs: Record<string, unknown>): Effect.Effect<Prediction, ModuleError> {
    return Effect.succeed({
      completions: [{ text: 'nested result' }],
      reasoning: 'nested reasoning',
      confidence: 0.8
    } as Prediction)
  }
}

describe('Module', () => {
  let module: TestModule
  let mockLM: MockLM
  let mockExamples: Example[]
  let mockSignature: Signature

  beforeEach(() => {
    module = new TestModule()
    mockLM = new MockLM('test-lm')
    mockExamples = [
      { input: { question: 'What is 2+2?' }, output: { answer: '4' } },
      { input: { question: 'What is 3+3?' }, output: { answer: '6' } }
    ] as Example[]
    mockSignature = {
      instructions: 'Test signature',
      fields: {},
      inputFields: [],
      outputFields: []
    } as Signature
  })

  describe('Basic Properties', () => {
    it('should initialize with default values', () => {
      expect(module.lm).toBeNull()
      expect(module.demos).toEqual([])
      expect(module.signature).toBeNull()
      expect(module._compiled).toBe(false)
      expect(module._tag).toBe('Module')
    })

    it('should set language model', () => {
      const result = module.setLm(mockLM)
      expect(module.lm).toBe(mockLM)
      expect(result).toBe(module) // Should return this for chaining
    })

    it('should set demos', () => {
      const result = module.setDemos(mockExamples)
      expect(module.demos).toEqual(mockExamples)
      expect(module.demos).not.toBe(mockExamples) // Should be a copy
      expect(result).toBe(module) // Should return this for chaining
    })

    it('should set signature', () => {
      const result = module.setSignature(mockSignature)
      expect(module.signature).toBe(mockSignature)
      expect(result).toBe(module) // Should return this for chaining
    })
  })

  describe('Abstract Methods', () => {
    it('should require forward method implementation', async () => {
      const inputs = { question: 'test' }
      const result = await Effect.runPromise(module.forward(inputs))
      expect(result.completions[0].text).toContain('Processed')
    })
  })

  describe('Parameter Management', () => {
    it('should find named parameters', () => {
      const namedParams = module.namedParameters()
      expect(namedParams).toHaveLength(1)
      expect(namedParams[0][0]).toBe('testParam')
      expect(namedParams[0][1]).toBe(module.testParam)
    })

    it('should find parameters', () => {
      const params = module.parameters()
      expect(params).toHaveLength(1)
      expect(params[0]).toBe(module.testParam)
    })

    it('should find named predictors', () => {
      const namedPredictors = module.namedPredictors()
      expect(namedPredictors).toHaveLength(1)
      expect(namedPredictors[0][0]).toBe('testParam')
      expect(namedPredictors[0][1]).toBe(module.testParam)
    })

    it('should find predictors', () => {
      const predictors = module.predictors()
      expect(predictors).toHaveLength(1)
      expect(predictors[0]).toBe(module.testParam)
    })

    it('should handle nested modules', () => {
      const nested = new NestedTestModule()
      const namedParams = nested.namedParameters()

      // Should find parameters from all nested modules
      expect(namedParams.length).toBeGreaterThan(1)

      // Check that we find parameters from different nesting levels
      const paramNames = namedParams.map(([name]) => name)
      expect(paramNames).toContain('level1.testParam')
      expect(paramNames).toContain("level2['nested'].testParam")
      expect(paramNames).toContain('arrayModules[0].testParam')
      expect(paramNames).toContain('arrayModules[1].testParam')
    })

    it('should respect compiled flag', () => {
      const compiledModule = new CompiledTestModule()
      module.subModule = compiledModule

      const namedParams = module.namedParameters()
      const paramNames = namedParams.map(([name]) => name)

      // Should not traverse into compiled sub-modules
      expect(paramNames).toContain('testParam')
      expect(paramNames).not.toContain('subModule.testParam')
    })

    it('should handle circular references', () => {
      const module1 = new TestModule()
      const module2 = new TestModule()
      module1.subModule = module2
      module2.subModule = module1 // Create circular reference

      // Should not infinite loop
      const namedParams = module1.namedParameters()
      expect(namedParams.length).toBeGreaterThan(0)
    })
  })

  describe('Deep Copy', () => {
    it('should create a deep copy', async () => {
      module.testParam.value = 'original'

      const copy = await Effect.runPromise(module.deepcopy())

      expect(copy).not.toBe(module)
      expect(copy.testParam).not.toBe(module.testParam)
      expect(copy.testParam.value).toBe('original')

      // Modifying copy should not affect original
      copy.testParam.value = 'modified'
      expect(module.testParam.value).toBe('original')
    })

    it('should handle nested modules in deep copy', async () => {
      const nested = new NestedTestModule()
      nested.level1.testParam.value = 'level1-original'
      nested.level2.nested.testParam.value = 'level2-original'

      const copy = await Effect.runPromise(nested.deepcopy())

      expect(copy.level1).not.toBe(nested.level1)
      expect(copy.level2.nested).not.toBe(nested.level2.nested)
      expect(copy.level1.testParam.value).toBe('level1-original')
      expect(copy.level2.nested.testParam.value).toBe('level2-original')
    })

    it('should handle non-copyable objects gracefully', async () => {
      // Add a non-copyable object
      ;(module as any).nonCopyable = () => {} // Functions are not structurally cloneable

      const copy = await Effect.runPromise(module.deepcopy())

      expect(copy).not.toBe(module)
      expect(copy.testParam).not.toBe(module.testParam)
    })
  })

  describe('Reset Copy', () => {
    it('should create a copy and reset parameters', async () => {
      module.testParam.value = 'original'

      const resetCopy = await Effect.runPromise(module.resetCopy())

      expect(resetCopy).not.toBe(module)
      expect(resetCopy.testParam.value).toBe('reset')
      expect(module.testParam.value).toBe('original') // Original unchanged
    })
  })

  describe('State Management', () => {
    it('should dump state', async () => {
      module.testParam.value = 'state-value'

      const state = await Effect.runPromise(module.dumpState())

      expect(state).toEqual({
        testParam: { value: 'state-value' }
      })
    })

    it('should load state', async () => {
      const state = {
        testParam: { value: 'loaded-value' }
      }

      await Effect.runPromise(module.loadState(state))

      expect(module.testParam.value).toBe('loaded-value')
    })

    it('should handle missing state gracefully', async () => {
      const state = {} // Missing testParam state

      await Effect.runPromise(module.loadState(state))

      // Should not throw, parameter should remain unchanged
      expect(module.testParam.value).toBe('test')
    })

    it('should handle nested module state', async () => {
      const nested = new NestedTestModule()
      nested.level1.testParam.value = 'level1-state'
      nested.level2.nested.testParam.value = 'level2-state'

      const state = await Effect.runPromise(nested.dumpState())

      expect(state['level1.testParam']).toEqual({ value: 'level1-state' })
      expect(state["level2['nested'].testParam"]).toEqual({ value: 'level2-state' })

      // Reset values
      nested.level1.testParam.value = 'reset1'
      nested.level2.nested.testParam.value = 'reset2'

      // Load state back
      await Effect.runPromise(nested.loadState(state))

      expect(nested.level1.testParam.value).toBe('level1-state')
      expect(nested.level2.nested.testParam.value).toBe('level2-state')
    })
  })

  describe('Error Handling', () => {
    it('should handle deep copy errors', async () => {
      // Create a module that will fail to copy
      class FailingModule extends Module {
        constructor() {
          super()
          // Add a property that will cause structured clone to fail
          ;(this as any).circular = this
        }

        forward(): Effect.Effect<Prediction, ModuleError> {
          return Effect.succeed({} as Prediction)
        }
      }

      const failing = new FailingModule()

      // Should still succeed with fallback copying
      const copy = await Effect.runPromise(failing.deepcopy())
      expect(copy).toBeDefined()
    })

    it('should create proper error types', () => {
      const moduleError = new ModuleError('Test error')
      expect(moduleError._tag).toBe('ModuleError')
      expect(moduleError.message).toBe('Test error')
      expect(moduleError.name).toBe('ModuleError')

      const notImplementedError = new ModuleNotImplementedError('testMethod')
      expect(notImplementedError._tag).toBe('ModuleNotImplementedError')
      expect(notImplementedError.message).toBe("Method 'testMethod' must be implemented by subclass")
      expect(notImplementedError.name).toBe('ModuleNotImplementedError')
    })
  })

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const result = module.setLm(mockLM).setDemos(mockExamples).setSignature(mockSignature)

      expect(result).toBe(module)
      expect(module.lm).toBe(mockLM)
      expect(module.demos).toEqual(mockExamples)
      expect(module.signature).toBe(mockSignature)
    })
  })
})
