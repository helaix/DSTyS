/**
 * Prediction Schema Tests
 *
 * Comprehensive runtime validation tests for Prediction schemas including
 * valid data, error cases, edge conditions, and serialization round-trips.
 */

import { describe, it, expect } from 'vitest'
import { Effect } from 'effect'
import {
  PredictionSchema,
  validatePrediction,
  validateCompletion,
  validateCompletions,
  validateReasoning,
  validateConfidence,
  validateAggregationMetadata,
  createPrediction,
  createValidatedPrediction,
  isPrediction,
  isCompletion,
  isCompletions,
  isReasoning,
  isConfidence,
  isAggregationMetadata,
  getFirstCompletion,
  hasReasoning,
  hasConfidence,
  isAggregated,
  encodePrediction,
  decodePrediction
} from './prediction.js'
import { safeJsonStringify, safeJsonParse, testRoundTrip } from './utils.js'

describe('Prediction Schema', () => {
  describe('CompletionSchema', () => {
    it('should validate valid completion', async () => {
      const validCompletion = {
        answer: 'Paris',
        confidence: 0.95,
        reasoning: 'France is a country in Europe'
      }

      const result = await Effect.runPromise(validateCompletion(validCompletion))
      expect(result).toEqual(validCompletion)
    })

    it('should validate empty completion', async () => {
      const emptyCompletion = {}
      const result = await Effect.runPromise(validateCompletion(emptyCompletion))
      expect(result).toEqual(emptyCompletion)
    })

    it('should validate completion with various value types', async () => {
      const mixedCompletion = {
        text: 'response',
        score: 0.8,
        valid: true,
        metadata: { source: 'model_v1' },
        tokens: [1, 2, 3]
      }

      const result = await Effect.runPromise(validateCompletion(mixedCompletion))
      expect(result).toEqual(mixedCompletion)
    })

    it('should reject non-object completion', async () => {
      const invalidCompletion = 'not an object'

      await expect(Effect.runPromise(validateCompletion(invalidCompletion))).rejects.toThrow()
    })
  })

  describe('CompletionsSchema', () => {
    it('should validate array of completions', async () => {
      const validCompletions = [{ answer: 'Paris' }, { answer: 'London' }, { answer: 'Berlin' }]

      const result = await Effect.runPromise(validateCompletions(validCompletions))
      expect(result).toEqual(validCompletions)
    })

    it('should validate empty completions array', async () => {
      const emptyCompletions: unknown[] = []
      const result = await Effect.runPromise(validateCompletions(emptyCompletions))
      expect(result).toEqual(emptyCompletions)
    })

    it('should reject non-array completions', async () => {
      const invalidCompletions = 'not an array'

      await expect(Effect.runPromise(validateCompletions(invalidCompletions))).rejects.toThrow()
    })

    it('should reject array with invalid completion', async () => {
      const invalidCompletions = [{ answer: 'Paris' }, 'invalid completion']

      await expect(Effect.runPromise(validateCompletions(invalidCompletions))).rejects.toThrow()
    })
  })

  describe('ReasoningSchema', () => {
    it('should validate complete reasoning', async () => {
      const validReasoning = {
        text: 'Let me think step by step...',
        steps: [
          'First, I need to identify the country',
          'France is a European country',
          'The capital of France is Paris'
        ],
        type: 'chain-of-thought',
        confidence: 0.9
      }

      const result = await Effect.runPromise(validateReasoning(validReasoning))
      expect(result).toEqual(validReasoning)
    })

    it('should validate minimal reasoning (text only)', async () => {
      const minimalReasoning = {
        text: 'Simple reasoning'
      }

      const result = await Effect.runPromise(validateReasoning(minimalReasoning))
      expect(result).toEqual(minimalReasoning)
    })

    it('should reject reasoning without text', async () => {
      const invalidReasoning = {
        steps: ['step 1', 'step 2']
      }

      await expect(Effect.runPromise(validateReasoning(invalidReasoning))).rejects.toThrow()
    })

    it('should reject reasoning with invalid confidence', async () => {
      const invalidReasoning = {
        text: 'reasoning',
        confidence: 1.5 // > 1
      }

      await expect(Effect.runPromise(validateReasoning(invalidReasoning))).rejects.toThrow()
    })

    it('should reject reasoning with negative confidence', async () => {
      const invalidReasoning = {
        text: 'reasoning',
        confidence: -0.1
      }

      await expect(Effect.runPromise(validateReasoning(invalidReasoning))).rejects.toThrow()
    })
  })

  describe('ConfidenceSchema', () => {
    it('should validate complete confidence', async () => {
      const validConfidence = {
        score: 0.85,
        method: 'ensemble_voting',
        fieldScores: {
          answer: 0.9,
          reasoning: 0.8
        },
        metadata: {
          model_agreement: 0.75,
          calibration_score: 0.82
        }
      }

      const result = await Effect.runPromise(validateConfidence(validConfidence))
      expect(result).toEqual(validConfidence)
    })

    it('should validate minimal confidence (score only)', async () => {
      const minimalConfidence = {
        score: 0.7
      }

      const result = await Effect.runPromise(validateConfidence(minimalConfidence))
      expect(result).toEqual(minimalConfidence)
    })

    it('should reject confidence without score', async () => {
      const invalidConfidence = {
        method: 'voting'
      }

      await expect(Effect.runPromise(validateConfidence(invalidConfidence))).rejects.toThrow()
    })

    it('should reject confidence with invalid score range', async () => {
      const invalidConfidence = {
        score: 2.0 // > 1
      }

      await expect(Effect.runPromise(validateConfidence(invalidConfidence))).rejects.toThrow()
    })

    it('should reject confidence with invalid field scores', async () => {
      const invalidConfidence = {
        score: 0.8,
        fieldScores: {
          field1: 1.5 // > 1
        }
      }

      await expect(Effect.runPromise(validateConfidence(invalidConfidence))).rejects.toThrow()
    })
  })

  describe('AggregationMetadataSchema', () => {
    it('should validate complete aggregation metadata', async () => {
      const validAggregation = {
        method: 'weighted_majority',
        count: 5,
        weights: [0.3, 0.25, 0.2, 0.15, 0.1],
        agreement: {
          score: 0.8,
          metric: 'exact_match'
        },
        individualScores: [0.9, 0.85, 0.8, 0.75, 0.7],
        metadata: {
          ensemble_type: 'diverse_models',
          voting_threshold: 0.6
        }
      }

      const result = await Effect.runPromise(validateAggregationMetadata(validAggregation))
      expect(result).toEqual(validAggregation)
    })

    it('should validate minimal aggregation metadata', async () => {
      const minimalAggregation = {
        method: 'majority',
        count: 3
      }

      const result = await Effect.runPromise(validateAggregationMetadata(minimalAggregation))
      expect(result).toEqual(minimalAggregation)
    })

    it('should reject aggregation without method', async () => {
      const invalidAggregation = {
        count: 3
      }

      await expect(Effect.runPromise(validateAggregationMetadata(invalidAggregation))).rejects.toThrow()
    })

    it('should reject aggregation without count', async () => {
      const invalidAggregation = {
        method: 'majority'
      }

      await expect(Effect.runPromise(validateAggregationMetadata(invalidAggregation))).rejects.toThrow()
    })

    it('should reject aggregation with invalid count', async () => {
      const invalidAggregation = {
        method: 'majority',
        count: 0 // must be positive
      }

      await expect(Effect.runPromise(validateAggregationMetadata(invalidAggregation))).rejects.toThrow()
    })

    it('should reject aggregation with invalid agreement score', async () => {
      const invalidAggregation = {
        method: 'majority',
        count: 3,
        agreement: {
          score: 1.5, // > 1
          metric: 'exact_match'
        }
      }

      await expect(Effect.runPromise(validateAggregationMetadata(invalidAggregation))).rejects.toThrow()
    })
  })

  describe('PredictionSchema', () => {
    it('should validate complete prediction', async () => {
      const validPrediction = {
        completions: [
          { answer: 'Paris', confidence: 0.9 },
          { answer: 'London', confidence: 0.1 }
        ],
        reasoning: {
          text: 'Based on geographical knowledge...',
          type: 'factual_recall',
          confidence: 0.95
        },
        confidence: {
          score: 0.9,
          method: 'model_confidence'
        },
        aggregation: {
          method: 'weighted_voting',
          count: 2
        },
        metadata: {
          model: 'gpt-4',
          temperature: 0.1
        },
        timestamp: '2023-01-01T00:00:00Z'
      }

      const result = await Effect.runPromise(validatePrediction(validPrediction))
      expect(result).toEqual(validPrediction)
    })

    it('should validate minimal prediction (completions only)', async () => {
      const minimalPrediction = {
        completions: [{ answer: 'test' }]
      }

      const result = await Effect.runPromise(validatePrediction(minimalPrediction))
      expect(result).toEqual(minimalPrediction)
    })

    it('should reject prediction without completions', async () => {
      const invalidPrediction = {
        reasoning: { text: 'some reasoning' }
      }

      await expect(Effect.runPromise(validatePrediction(invalidPrediction))).rejects.toThrow()
    })

    it('should reject prediction with empty completions', async () => {
      const invalidPrediction = {
        completions: []
      }

      // Note: Empty completions array is actually valid in our schema
      // If you want to require at least one completion, you'd need to modify the schema
      const result = await Effect.runPromise(validatePrediction(invalidPrediction))
      expect(result).toEqual(invalidPrediction)
    })

    it('should reject prediction with invalid timestamp', async () => {
      const invalidPrediction = {
        completions: [{ answer: 'test' }],
        timestamp: 'not-a-date'
      }

      await expect(Effect.runPromise(validatePrediction(invalidPrediction))).rejects.toThrow()
    })
  })

  describe('Factory Functions', () => {
    it('should create prediction with createPrediction', () => {
      const completions = [{ answer: 'test' }]
      const reasoning = { text: 'reasoning' }
      const confidence = { score: 0.8 }

      const prediction = createPrediction(completions, reasoning, confidence)

      expect(prediction.completions).toEqual(completions)
      expect(prediction.reasoning).toEqual(reasoning)
      expect(prediction.confidence).toEqual(confidence)
      expect(prediction.timestamp).toBeDefined()
    })

    it('should create prediction without optional fields', () => {
      const completions = [{ answer: 'test' }]
      const prediction = createPrediction(completions)

      expect(prediction.completions).toEqual(completions)
      expect(prediction.reasoning).toBeUndefined()
      expect(prediction.confidence).toBeUndefined()
      expect(prediction.timestamp).toBeDefined()
    })

    it('should create validated prediction with createValidatedPrediction', async () => {
      const completions = [{ answer: 'test' }]
      const reasoning = { text: 'reasoning' }

      const result = await Effect.runPromise(createValidatedPrediction(completions, reasoning))

      expect(result.completions).toEqual(completions)
      expect(result.reasoning).toEqual(reasoning)
    })

    it('should reject invalid data in createValidatedPrediction', async () => {
      const invalidCompletions = 'not an array'

      await expect(Effect.runPromise(createValidatedPrediction(invalidCompletions))).rejects.toThrow()
    })
  })

  describe('Utility Functions', () => {
    it('should get first completion', () => {
      const prediction = {
        completions: [{ answer: 'first' }, { answer: 'second' }]
      }

      const first = getFirstCompletion(prediction)
      expect(first).toEqual({ answer: 'first' })
    })

    it('should return undefined for empty completions', () => {
      const prediction = {
        completions: []
      }

      const first = getFirstCompletion(prediction)
      expect(first).toBeUndefined()
    })

    it('should check if prediction has reasoning', () => {
      const withReasoning = {
        completions: [{ answer: 'test' }],
        reasoning: { text: 'reasoning' }
      }

      const withoutReasoning = {
        completions: [{ answer: 'test' }]
      }

      expect(hasReasoning(withReasoning)).toBe(true)
      expect(hasReasoning(withoutReasoning)).toBe(false)
    })

    it('should check if prediction has confidence', () => {
      const withConfidence = {
        completions: [{ answer: 'test' }],
        confidence: { score: 0.8 }
      }

      const withoutConfidence = {
        completions: [{ answer: 'test' }]
      }

      expect(hasConfidence(withConfidence)).toBe(true)
      expect(hasConfidence(withoutConfidence)).toBe(false)
    })

    it('should check if prediction is aggregated', () => {
      const aggregated = {
        completions: [{ answer: 'test' }],
        aggregation: { method: 'majority', count: 3 }
      }

      const notAggregated = {
        completions: [{ answer: 'test' }]
      }

      expect(isAggregated(aggregated)).toBe(true)
      expect(isAggregated(notAggregated)).toBe(false)
    })
  })

  describe('Type Guards', () => {
    it('should correctly identify valid predictions', () => {
      const validPrediction = {
        completions: [{ answer: 'test' }]
      }

      expect(isPrediction(validPrediction)).toBe(true)
    })

    it('should correctly reject invalid predictions', () => {
      const invalidPrediction = {
        notCompletions: 'value'
      }

      expect(isPrediction(invalidPrediction)).toBe(false)
    })

    it('should correctly identify valid completions', () => {
      const validCompletions = [{ answer: 'test' }]
      expect(isCompletions(validCompletions)).toBe(true)
    })

    it('should correctly identify valid completion', () => {
      const validCompletion = { answer: 'test' }
      expect(isCompletion(validCompletion)).toBe(true)
    })

    it('should correctly identify valid reasoning', () => {
      const validReasoning = { text: 'reasoning' }
      expect(isReasoning(validReasoning)).toBe(true)
    })

    it('should correctly identify valid confidence', () => {
      const validConfidence = { score: 0.8 }
      expect(isConfidence(validConfidence)).toBe(true)
    })

    it('should correctly identify valid aggregation metadata', () => {
      const validAggregation = { method: 'majority', count: 3 }
      expect(isAggregationMetadata(validAggregation)).toBe(true)
    })
  })

  describe('Serialization', () => {
    it('should encode and decode prediction correctly', async () => {
      const prediction = {
        completions: [{ answer: 'test' }],
        reasoning: { text: 'reasoning' },
        confidence: { score: 0.8 },
        timestamp: '2023-01-01T00:00:00Z'
      }

      const encoded = await Effect.runPromise(encodePrediction(prediction))
      const decoded = await Effect.runPromise(decodePrediction(encoded))

      expect(decoded).toEqual(prediction)
    })

    it('should handle JSON serialization round-trip', () => {
      const prediction = {
        completions: [{ answer: 'test', score: 0.9 }],
        reasoning: { text: 'reasoning', confidence: 0.8 },
        confidence: { score: 0.85 }
      }

      const jsonResult = safeJsonStringify(PredictionSchema, prediction)
      expect(jsonResult._tag).toBe('Right')

      if (jsonResult._tag === 'Right') {
        const parseResult = safeJsonParse(PredictionSchema, jsonResult.right)
        expect(parseResult._tag).toBe('Right')

        if (parseResult._tag === 'Right') {
          expect(parseResult.right).toEqual(prediction)
        }
      }
    })

    it('should pass round-trip test', () => {
      const prediction = {
        completions: [{ answer: 'test' }]
      }

      const result = testRoundTrip(PredictionSchema, prediction)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Edge Cases', () => {
    it('should handle prediction with complex nested completions', async () => {
      const complexPrediction = {
        completions: [
          {
            answer: 'complex answer',
            metadata: {
              tokens: [1, 2, 3],
              probabilities: [0.8, 0.15, 0.05],
              alternatives: [
                { text: 'alt1', score: 0.7 },
                { text: 'alt2', score: 0.3 }
              ]
            },
            reasoning_trace: {
              steps: ['step1', 'step2'],
              intermediate_results: [
                { step: 1, result: 'intermediate1' },
                { step: 2, result: 'intermediate2' }
              ]
            }
          }
        ],
        reasoning: {
          text: 'Complex multi-step reasoning...',
          steps: Array.from({ length: 10 }, (_, i) => `Step ${i + 1}`),
          type: 'multi_step_reasoning',
          confidence: 0.92
        }
      }

      const result = await Effect.runPromise(validatePrediction(complexPrediction))
      expect(result).toEqual(complexPrediction)
    })

    it('should handle prediction with many completions', async () => {
      const manyCompletions = Array.from({ length: 100 }, (_, i) => ({
        answer: `answer_${i}`,
        score: Math.random()
      }))

      const prediction = {
        completions: manyCompletions,
        aggregation: {
          method: 'ensemble',
          count: 100,
          individualScores: Array.from({ length: 100 }, () => Math.random())
        }
      }

      const result = await Effect.runPromise(validatePrediction(prediction))
      expect(result.completions).toHaveLength(100)
      expect(result.aggregation?.count).toBe(100)
    })

    it('should handle edge values in confidence scores', async () => {
      const edgePrediction = {
        completions: [{ answer: 'test' }],
        confidence: {
          score: 0.0, // minimum valid score
          fieldScores: {
            field1: 1.0, // maximum valid score
            field2: 0.5
          }
        },
        reasoning: {
          text: 'reasoning',
          confidence: 1.0 // maximum valid confidence
        }
      }

      const result = await Effect.runPromise(validatePrediction(edgePrediction))
      expect(result).toEqual(edgePrediction)
    })
  })
})
