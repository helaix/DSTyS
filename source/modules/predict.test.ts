/**
 * @fileoverview Tests for Predict Module
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Effect } from 'effect'
import { Predict } from './predict.js'
import { MockLM } from '../clients/lm.js'
import type { Signature } from '../schemas/signature.js'
import type { Example } from '../schemas/example.js'

describe('Predict Module', () => {
  let mockSignature: Signature
  let mockLM: MockLM

  beforeEach(() => {
    // Create a simple signature for testing
    mockSignature = {
      inputs: [
        {
          name: 'question',
          description: 'A question to answer',
          type: 'input',
          required: true
        }
      ],
      outputs: [
        {
          name: 'answer',
          description: 'The answer to the question',
          type: 'output',
          required: true
        }
      ],
      instructions: {
        task: 'Answer the given question clearly and concisely.',
        guidelines: []
      },
      metadata: {
        name: 'QuestionAnswering',
        description: 'A simple question answering signature',
        version: '1.0.0',
        tags: ['qa', 'test']
      }
    }

    mockLM = new MockLM('The answer is 42.')
  })

  it('should create a Predict module with signature', () => {
    const predict = new Predict(mockSignature)

    expect(predict).toBeDefined()
    expect(predict.signature).toBe(mockSignature)
    expect(predict._tag).toBe('Module')
  })

  it('should create a Predict module with instructions and examples', () => {
    const instructions = 'Custom instructions for the task'
    const examples: Example[] = [
      {
        data: {
          question: 'What is 2+2?',
          answer: '4'
        },
        inputKeys: ['question'],
        metadata: {
          source: 'test'
        }
      }
    ]

    const predict = new Predict(mockSignature, instructions, examples)

    expect(predict).toBeDefined()
    expect(predict.signature).toBe(mockSignature)

    // Check that parameters were set correctly
    const params = Effect.runSync(predict.getParams())
    expect(params.instructions).toBe(instructions)
    expect(params.examples).toEqual(examples)
  })

  it('should fail forward() without LM', async () => {
    const predict = new Predict(mockSignature)
    const inputs = { question: 'What is the meaning of life?' }

    const result = await Effect.runPromise(Effect.either(predict.forward(inputs)))

    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.message).toContain('No language model provided')
    }
  })

  it('should execute forward() with LM', async () => {
    const predict = new Predict(mockSignature)
    predict.setLm(mockLM)

    const inputs = { question: 'What is the meaning of life?' }

    const result = await Effect.runPromise(Effect.either(predict.forward(inputs)))

    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right.completions).toBeDefined()
      expect(result.right.completions.length).toBeGreaterThan(0)
      expect(result.right.completions[0].text).toBe('The answer is 42.')
    }
  })

  it('should validate inputs against signature', async () => {
    const predict = new Predict(mockSignature)
    predict.setLm(mockLM)

    // Missing required field
    const invalidInputs = { wrongField: 'value' }

    const result = await Effect.runPromise(Effect.either(predict.forward(invalidInputs)))

    expect(result._tag).toBe('Left')
    if (result._tag === 'Left') {
      expect(result.left.message).toContain('Missing required input field: question')
    }
  })

  it('should execute __call__ with tracing', async () => {
    const predict = new Predict(mockSignature)
    predict.setLm(mockLM)

    const inputs = { question: 'What is the meaning of life?' }

    const result = await Effect.runPromise(Effect.either(predict.__call__(inputs)))

    expect(result._tag).toBe('Right')
    if (result._tag === 'Right') {
      expect(result.right.completions).toBeDefined()
      expect(result.right.completions.length).toBeGreaterThan(0)
    }
  })

  it('should implement Parameter interface', async () => {
    const predict = new Predict(mockSignature)

    // Test reset
    await Effect.runPromise(predict.reset())

    // Test dumpState
    const state = await Effect.runPromise(predict.dumpState())
    expect(state).toBeDefined()
    expect(state.signature).toBe(mockSignature)
    expect(state.learnableParams).toBeDefined()

    // Test loadState
    await Effect.runPromise(predict.loadState(state))

    // Test getLearnableParams
    const params = await Effect.runPromise(predict.getLearnableParams())
    expect(params).toBeDefined()
    expect(params.instructions).toBeDefined()

    // Test updateLearnableParams
    await Effect.runPromise(
      predict.updateLearnableParams({
        temperature: 0.5
      })
    )

    const updatedParams = await Effect.runPromise(predict.getLearnableParams())
    expect(updatedParams.temperature).toBe(0.5)
  })

  it('should update parameters correctly', async () => {
    const predict = new Predict(mockSignature)

    const newParams = {
      instructions: 'New instructions',
      temperature: 0.9,
      maxTokens: 500
    }

    await Effect.runPromise(predict.updateParams(newParams))

    const params = await Effect.runPromise(predict.getParams())
    expect(params.instructions).toBe('New instructions')
    expect(params.temperature).toBe(0.9)
    expect(params.maxTokens).toBe(500)
  })
})
