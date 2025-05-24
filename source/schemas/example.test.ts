/**
 * Example Schema Tests
 *
 * Comprehensive runtime validation tests for Example schemas including
 * valid data, error cases, edge conditions, and serialization round-trips.
 */

import { describe, it, expect } from 'vitest'
import { Effect } from 'effect'
import {
  ExampleSchema,
  validateExample,
  validateExampleData,
  validateExampleMetadata,
  createExample,
  createValidatedExample,
  isExample,
  isExampleData,
  isExampleMetadata,
  encodeExample,
  decodeExample
} from './example.js'
import { safeJsonStringify, safeJsonParse, testRoundTrip } from './utils.js'

describe('Example Schema', () => {
  describe('ExampleDataSchema', () => {
    it('should validate valid example data', async () => {
      const validData = {
        question: 'What is the capital of France?',
        answer: 'Paris',
        context: 'Geography question about European capitals'
      }

      const result = await Effect.runPromise(validateExampleData(validData))
      expect(result).toEqual(validData)
    })

    it('should validate empty data', async () => {
      const emptyData = {}
      const result = await Effect.runPromise(validateExampleData(emptyData))
      expect(result).toEqual(emptyData)
    })

    it('should validate data with various value types', async () => {
      const mixedData = {
        string: 'text',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        object: { nested: 'value' },
        null: null,
        undefined: undefined
      }

      const result = await Effect.runPromise(validateExampleData(mixedData))
      expect(result).toEqual(mixedData)
    })

    it('should reject non-object data', async () => {
      const invalidData = 'not an object'

      await expect(Effect.runPromise(validateExampleData(invalidData))).rejects.toThrow()
    })
  })

  describe('ExampleMetadataSchema', () => {
    it('should validate complete metadata', async () => {
      const validMetadata = {
        dspyUuid: '123e4567-e89b-12d3-a456-426614174000',
        dspySplit: 'train',
        source: 'datasetV1',
        timestamp: '2023-01-01T00:00:00Z',
        tags: ['geography', 'capitals'],
        custom: {
          difficulty: 'easy',
          language: 'en'
        }
      }

      const result = await Effect.runPromise(validateExampleMetadata(validMetadata))
      expect(result).toEqual(validMetadata)
    })

    it('should validate minimal metadata', async () => {
      const minimalMetadata = {}
      const result = await Effect.runPromise(validateExampleMetadata(minimalMetadata))
      expect(result).toEqual(minimalMetadata)
    })

    it('should validate partial metadata', async () => {
      const partialMetadata = {
        dspyUuid: 'test-uuid',
        tags: ['test']
      }

      const result = await Effect.runPromise(validateExampleMetadata(partialMetadata))
      expect(result).toEqual(partialMetadata)
    })

    it('should reject invalid timestamp format', async () => {
      const invalidMetadata = {
        timestamp: 'not-a-date'
      }

      // DateFromString will create an Invalid Date, which should be rejected by the schema
      await expect(Effect.runPromise(validateExampleMetadata(invalidMetadata))).rejects.toThrow()
    })

    it('should reject invalid tags (non-array)', async () => {
      const invalidMetadata = {
        tags: 'not-an-array'
      }

      await expect(Effect.runPromise(validateExampleMetadata(invalidMetadata))).rejects.toThrow()
    })
  })

  describe('ExampleSchema', () => {
    it('should validate complete example', async () => {
      const validExample = {
        data: {
          question: 'What is 2+2?',
          answer: '4'
        },
        inputKeys: ['question'],
        metadata: {
          dspyUuid: 'test-uuid',
          source: 'mathDataset',
          tags: ['arithmetic']
        }
      }

      const result = await Effect.runPromise(validateExample(validExample))
      expect(result).toEqual(validExample)
    })

    it('should validate minimal example (data only)', async () => {
      const minimalExample = {
        data: {
          input: 'test input',
          output: 'test output'
        }
      }

      const result = await Effect.runPromise(validateExample(minimalExample))
      expect(result).toEqual(minimalExample)
    })

    it('should validate example with empty inputKeys', async () => {
      const example = {
        data: { field: 'value' },
        inputKeys: []
      }

      const result = await Effect.runPromise(validateExample(example))
      expect(result).toEqual(example)
    })

    it('should reject example without data', async () => {
      const invalidExample = {
        inputKeys: ['test'],
        metadata: {}
      }

      await expect(Effect.runPromise(validateExample(invalidExample))).rejects.toThrow()
    })

    it('should reject example with invalid data type', async () => {
      const invalidExample = {
        data: 'not an object'
      }

      await expect(Effect.runPromise(validateExample(invalidExample))).rejects.toThrow()
    })

    it('should reject example with invalid inputKeys type', async () => {
      const invalidExample = {
        data: { field: 'value' },
        inputKeys: 'not an array'
      }

      await expect(Effect.runPromise(validateExample(invalidExample))).rejects.toThrow()
    })
  })

  describe('Factory Functions', () => {
    it('should create example with createExample', () => {
      const data = { question: 'test', answer: 'test' }
      const inputKeys = ['question']
      const metadata = { source: 'test' }

      const example = createExample(data, inputKeys, metadata)

      expect(example).toEqual({
        data,
        inputKeys,
        metadata
      })
    })

    it('should create example without optional fields', () => {
      const data = { field: 'value' }
      const example = createExample(data)

      expect(example).toEqual({ data })
    })

    it('should create validated example with createValidatedExample', async () => {
      const data = { question: 'test', answer: 'test' }
      const inputKeys = ['question']

      const result = await Effect.runPromise(createValidatedExample(data, inputKeys))

      expect(result).toEqual({
        data,
        inputKeys
      })
    })

    it('should reject invalid data in createValidatedExample', async () => {
      const invalidData = 'not an object'

      await expect(Effect.runPromise(createValidatedExample(invalidData))).rejects.toThrow()
    })
  })

  describe('Type Guards', () => {
    it('should correctly identify valid examples', () => {
      const validExample = {
        data: { field: 'value' }
      }

      expect(isExample(validExample)).toBe(true)
    })

    it('should correctly reject invalid examples', () => {
      const invalidExample = {
        notData: 'value'
      }

      expect(isExample(invalidExample)).toBe(false)
    })

    it('should correctly identify valid example data', () => {
      const validData = { field: 'value' }
      expect(isExampleData(validData)).toBe(true)
    })

    it('should correctly reject invalid example data', () => {
      const invalidData = 'not an object'
      expect(isExampleData(invalidData)).toBe(false)
    })

    it('should correctly identify valid metadata', () => {
      const validMetadata = { source: 'test' }
      expect(isExampleMetadata(validMetadata)).toBe(true)
    })

    it('should correctly reject invalid metadata', () => {
      const invalidMetadata = { timestamp: 'invalid-date' }
      expect(isExampleMetadata(invalidMetadata)).toBe(false)
    })
  })

  describe('Serialization', () => {
    it('should encode and decode example correctly', async () => {
      const example = {
        data: { question: 'test', answer: 'test' },
        inputKeys: ['question'],
        metadata: {
          timestamp: '2023-01-01T00:00:00Z',
          tags: ['test']
        }
      }

      const encoded = await Effect.runPromise(encodeExample(example))
      const decoded = await Effect.runPromise(decodeExample(encoded))

      expect(decoded).toEqual(example)
    })

    it('should handle JSON serialization round-trip', () => {
      const example = {
        data: { question: 'test', answer: 'test' },
        inputKeys: ['question'],
        metadata: { source: 'test' }
      }

      const jsonResult = safeJsonStringify(ExampleSchema, example)
      expect(jsonResult._tag).toBe('Right')

      if (jsonResult._tag === 'Right') {
        const parseResult = safeJsonParse(ExampleSchema, jsonResult.right)
        expect(parseResult._tag).toBe('Right')

        if (parseResult._tag === 'Right') {
          expect(parseResult.right).toEqual(example)
        }
      }
    })

    it('should pass round-trip test', () => {
      const example = {
        data: { field: 'value' },
        inputKeys: ['field']
      }

      const result = testRoundTrip(ExampleSchema, example)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Edge Cases', () => {
    it('should handle example with complex nested data', async () => {
      const complexExample = {
        data: {
          nested: {
            deeply: {
              nested: {
                value: 'test',
                array: [1, 2, { inner: 'value' }]
              }
            }
          },
          functions: null, // Functions can't be serialized, but null can
          dates: '2023-01-01T00:00:00Z'
        },
        inputKeys: ['nested'],
        metadata: {
          custom: {
            complexity: 'high',
            nested: {
              metadata: true
            }
          }
        }
      }

      const result = await Effect.runPromise(validateExample(complexExample))
      expect(result).toEqual(complexExample)
    })

    it('should handle example with empty strings and zero values', async () => {
      const edgeExample = {
        data: {
          emptyString: '',
          zero: 0,
          false: false,
          emptyArray: [],
          emptyObject: {}
        },
        inputKeys: [],
        metadata: {}
      }

      const result = await Effect.runPromise(validateExample(edgeExample))
      expect(result).toEqual(edgeExample)
    })

    it('should handle very large inputKeys array', async () => {
      const largeInputKeys = Array.from({ length: 1000 }, (_, i) => `field${i}`)
      const example = {
        data: { field0: 'value' },
        inputKeys: largeInputKeys
      }

      const result = await Effect.runPromise(validateExample(example))
      expect(result.inputKeys).toHaveLength(1000)
    })
  })
})
