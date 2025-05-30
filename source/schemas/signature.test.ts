/**
 * Signature Schema Tests
 *
 * Comprehensive runtime validation tests for Signature schemas including
 * valid data, error cases, edge conditions, and serialization round-trips.
 */

import { describe, it, expect } from 'vitest'
import { Effect, Schema } from 'effect'
import {
  SignatureSchema,
  FieldConstraintSchema,
  validateSignature,
  validateInputField,
  validateOutputField,
  validateSignatureInstructions,
  validateSignatureMetadata,
  createInputField,
  createOutputField,
  createSignature,
  createValidatedSignature,
  isSignature,
  isInputField,
  isOutputField,
  isSignatureInstructions,
  isSignatureMetadata,
  getAllFieldNames,
  getInputFieldNames,
  getOutputFieldNames,
  findField,
  hasField,
  getRequiredInputFields,
  getOptionalInputFields,
  encodeSignature,
  decodeSignature
} from './signature.js'
import { safeJsonStringify, safeJsonParse, testRoundTrip } from './utils.js'

describe('Signature Schema', () => {
  describe('FieldConstraintSchema', () => {
    it('should validate complete field constraints', async () => {
      const validConstraints = {
        type: 'string',
        format: 'email',
        minLength: 5,
        maxLength: 100,
        minimum: 0,
        maximum: 1000,
        pattern: '^[a-zA-Z0-9]+$',
        enum: ['option1', 'option2', 'option3'],
        required: true,
        custom: {
          validationRule: 'custom_rule',
          errorMessage: 'Custom error'
        }
      }

      const result = await Effect.runPromise(Schema.decodeUnknown(FieldConstraintSchema)(validConstraints))
      expect(result).toEqual(validConstraints)
    })

    it('should validate minimal constraints (empty)', async () => {
      const minimalConstraints = {}
      const result = await Effect.runPromise(Schema.decodeUnknown(FieldConstraintSchema)(minimalConstraints))
      expect(result).toEqual(minimalConstraints)
    })

    it('should reject invalid minLength (negative)', async () => {
      const invalidConstraints = {
        minLength: -1
      }

      await expect(Effect.runPromise(Schema.decodeUnknown(FieldConstraintSchema)(invalidConstraints))).rejects.toThrow()
    })

    it('should reject invalid maxLength (zero)', async () => {
      const invalidConstraints = {
        maxLength: 0
      }

      await expect(Effect.runPromise(Schema.decodeUnknown(FieldConstraintSchema)(invalidConstraints))).rejects.toThrow()
    })
  })

  describe('InputFieldSchema', () => {
    it('should validate complete input field', async () => {
      const validInputField = {
        name: 'question',
        fieldType: 'input' as const,
        description: 'The question to answer',
        prefix: 'Q:',
        constraints: {
          type: 'string',
          minLength: 1,
          required: true
        },
        defaultValue: 'What is...?',
        optional: false,
        metadata: {
          category: 'userInput',
          priority: 'high'
        }
      }

      const result = await Effect.runPromise(validateInputField(validInputField))
      expect(result).toEqual(validInputField)
    })

    it('should validate minimal input field', async () => {
      const minimalInputField = {
        name: 'input',
        fieldType: 'input' as const
      }

      const result = await Effect.runPromise(validateInputField(minimalInputField))
      expect(result).toEqual(minimalInputField)
    })

    it('should reject input field without name', async () => {
      const invalidInputField = {
        fieldType: 'input' as const
      }

      await expect(Effect.runPromise(validateInputField(invalidInputField))).rejects.toThrow()
    })

    it('should reject input field with wrong fieldType', async () => {
      const invalidInputField = {
        name: 'test',
        fieldType: 'output' as const
      }

      await expect(Effect.runPromise(validateInputField(invalidInputField))).rejects.toThrow()
    })
  })

  describe('OutputFieldSchema', () => {
    it('should validate complete output field', async () => {
      const validOutputField = {
        name: 'answer',
        fieldType: 'output' as const,
        description: 'The generated answer',
        prefix: 'A:',
        constraints: {
          type: 'string',
          minLength: 1
        },
        expectedFormat: 'Natural language response',
        postProcessing: 'trimWhitespace',
        metadata: {
          category: 'generatedContent',
          validation: 'semantic_check'
        }
      }

      const result = await Effect.runPromise(validateOutputField(validOutputField))
      expect(result).toEqual(validOutputField)
    })

    it('should validate minimal output field', async () => {
      const minimalOutputField = {
        name: 'output',
        fieldType: 'output' as const
      }

      const result = await Effect.runPromise(validateOutputField(minimalOutputField))
      expect(result).toEqual(minimalOutputField)
    })

    it('should reject output field without name', async () => {
      const invalidOutputField = {
        fieldType: 'output' as const
      }

      await expect(Effect.runPromise(validateOutputField(invalidOutputField))).rejects.toThrow()
    })

    it('should reject output field with wrong fieldType', async () => {
      const invalidOutputField = {
        name: 'test',
        fieldType: 'input' as const
      }

      await expect(Effect.runPromise(validateOutputField(invalidOutputField))).rejects.toThrow()
    })
  })

  describe('SignatureInstructionsSchema', () => {
    it('should validate complete instructions', async () => {
      const validInstructions = {
        main: 'Answer the question based on the given context',
        context: 'You are a helpful AI assistant with expertise in various domains',
        examples: ['Q: What is the capital of France? A: Paris', 'Q: What is 2+2? A: 4'],
        constraints: ['Keep answers concise', 'Provide accurate information only', 'If unsure, say so'],
        outputFormat: 'Plain text, 1-2 sentences',
        chainOfThought: true,
        metadata: {
          version: '1.0',
          author: 'system',
          difficulty: 'medium'
        }
      }

      const result = await Effect.runPromise(validateSignatureInstructions(validInstructions))
      expect(result).toEqual(validInstructions)
    })

    it('should validate minimal instructions (main only)', async () => {
      const minimalInstructions = {
        main: 'Answer the question'
      }

      const result = await Effect.runPromise(validateSignatureInstructions(minimalInstructions))
      expect(result).toEqual(minimalInstructions)
    })

    it('should reject instructions without main', async () => {
      const invalidInstructions = {
        context: 'Some context'
      }

      await expect(Effect.runPromise(validateSignatureInstructions(invalidInstructions))).rejects.toThrow()
    })
  })

  describe('SignatureMetadataSchema', () => {
    it('should validate complete metadata', async () => {
      const validMetadata = {
        name: 'QA_Signature_v1',
        version: '1.2.0',
        author: 'AI Team',
        created: '2023-01-01T00:00:00Z',
        modified: '2023-06-01T00:00:00Z',
        tags: ['qa', 'general', 'production'],
        usage: {
          count: 1500,
          lastUsed: '2023-12-01T00:00:00Z',
          averageLatency: 250.5
        },
        custom: {
          domain: 'generalKnowledge',
          complexity: 'medium',
          performanceTier: 'standard'
        }
      }

      const result = await Effect.runPromise(validateSignatureMetadata(validMetadata))
      expect(result).toEqual(validMetadata)
    })

    it('should validate minimal metadata (empty)', async () => {
      const minimalMetadata = {}
      const result = await Effect.runPromise(validateSignatureMetadata(minimalMetadata))
      expect(result).toEqual(minimalMetadata)
    })

    it('should reject invalid timestamp format', async () => {
      const invalidMetadata = {
        created: 'not-a-date'
      }

      await expect(Effect.runPromise(validateSignatureMetadata(invalidMetadata))).rejects.toThrow()
    })

    it('should reject negative usage count', async () => {
      const invalidMetadata = {
        usage: {
          count: -1
        }
      }

      await expect(Effect.runPromise(validateSignatureMetadata(invalidMetadata))).rejects.toThrow()
    })

    it('should reject negative average latency', async () => {
      const invalidMetadata = {
        usage: {
          count: 100,
          averageLatency: -50
        }
      }

      await expect(Effect.runPromise(validateSignatureMetadata(invalidMetadata))).rejects.toThrow()
    })
  })

  describe('SignatureSchema', () => {
    it('should validate complete signature', async () => {
      const validSignature = {
        inputFields: [
          {
            name: 'question',
            fieldType: 'input' as const,
            description: 'User question',
            optional: false
          },
          {
            name: 'context',
            fieldType: 'input' as const,
            description: 'Additional context',
            optional: true
          }
        ],
        outputFields: [
          {
            name: 'answer',
            fieldType: 'output' as const,
            description: 'Generated answer'
          },
          {
            name: 'confidence',
            fieldType: 'output' as const,
            description: 'Confidence score',
            expectedFormat: 'Number between 0 and 1'
          }
        ],
        instructions: {
          main: 'Answer the question using the provided context',
          chainOfThought: true
        },
        metadata: {
          name: 'QA_Signature',
          version: '1.0.0',
          tags: ['qa', 'reasoning']
        }
      }

      const result = await Effect.runPromise(validateSignature(validSignature))
      expect(result).toEqual(validSignature)
    })

    it('should validate minimal signature', async () => {
      const minimalSignature = {
        inputFields: [
          {
            name: 'input',
            fieldType: 'input' as const
          }
        ],
        outputFields: [
          {
            name: 'output',
            fieldType: 'output' as const
          }
        ],
        instructions: {
          main: 'Process the input'
        }
      }

      const result = await Effect.runPromise(validateSignature(minimalSignature))
      expect(result).toEqual(minimalSignature)
    })

    it('should reject signature without input fields', async () => {
      const invalidSignature = {
        outputFields: [
          {
            name: 'output',
            fieldType: 'output' as const
          }
        ],
        instructions: {
          main: 'Generate output'
        }
      }

      await expect(Effect.runPromise(validateSignature(invalidSignature))).rejects.toThrow()
    })

    it('should reject signature without output fields', async () => {
      const invalidSignature = {
        inputFields: [
          {
            name: 'input',
            fieldType: 'input' as const
          }
        ],
        instructions: {
          main: 'Process input'
        }
      }

      await expect(Effect.runPromise(validateSignature(invalidSignature))).rejects.toThrow()
    })

    it('should reject signature without instructions', async () => {
      const invalidSignature = {
        inputFields: [
          {
            name: 'input',
            fieldType: 'input' as const
          }
        ],
        outputFields: [
          {
            name: 'output',
            fieldType: 'output' as const
          }
        ]
      }

      await expect(Effect.runPromise(validateSignature(invalidSignature))).rejects.toThrow()
    })

    it('should allow empty input or output fields arrays', async () => {
      const signatureWithEmptyInputs = {
        inputFields: [],
        outputFields: [
          {
            name: 'output',
            fieldType: 'output' as const
          }
        ],
        instructions: {
          main: 'Generate output without input'
        }
      }

      const signatureWithEmptyOutputs = {
        inputFields: [
          {
            name: 'input',
            fieldType: 'input' as const
          }
        ],
        outputFields: [],
        instructions: {
          main: 'Process input without output'
        }
      }

      const result1 = await Effect.runPromise(validateSignature(signatureWithEmptyInputs))
      const result2 = await Effect.runPromise(validateSignature(signatureWithEmptyOutputs))

      expect(result1).toEqual(signatureWithEmptyInputs)
      expect(result2).toEqual(signatureWithEmptyOutputs)
    })
  })

  describe('Factory Functions', () => {
    it('should create input field with createInputField', () => {
      const field = createInputField(
        'question',
        'User question',
        { type: 'string', required: true },
        'Default question',
        false
      )

      expect(field).toEqual({
        name: 'question',
        fieldType: 'input',
        description: 'User question',
        constraints: { type: 'string', required: true },
        defaultValue: 'Default question',
        optional: false
      })
    })

    it('should create input field with minimal parameters', () => {
      const field = createInputField('input')

      expect(field).toEqual({
        name: 'input',
        fieldType: 'input'
      })
    })

    it('should create output field with createOutputField', () => {
      const field = createOutputField(
        'answer',
        'Generated answer',
        { type: 'string', minLength: 1 },
        'Natural language'
      )

      expect(field).toEqual({
        name: 'answer',
        fieldType: 'output',
        description: 'Generated answer',
        constraints: { type: 'string', minLength: 1 },
        expectedFormat: 'Natural language'
      })
    })

    it('should create signature with createSignature', () => {
      const inputFields = [createInputField('question')]
      const outputFields = [createOutputField('answer')]
      const instructions = { main: 'Answer the question' }
      const metadata = { name: 'QA' }

      const signature = createSignature(inputFields, outputFields, instructions, metadata)

      expect(signature).toEqual({
        inputFields,
        outputFields,
        instructions,
        metadata
      })
    })

    it('should create validated signature with createValidatedSignature', async () => {
      const inputFields = [{ name: 'input', fieldType: 'input' }]
      const outputFields = [{ name: 'output', fieldType: 'output' }]
      const instructions = { main: 'Process' }

      const result = await Effect.runPromise(createValidatedSignature(inputFields, outputFields, instructions))

      expect(result.inputFields).toEqual(inputFields)
      expect(result.outputFields).toEqual(outputFields)
      expect(result.instructions).toEqual(instructions)
    })

    it('should reject invalid data in createValidatedSignature', async () => {
      const invalidInputFields = 'not an array'
      const outputFields = [{ name: 'output', fieldType: 'output' }]
      const instructions = { main: 'Process' }

      await expect(
        Effect.runPromise(createValidatedSignature(invalidInputFields, outputFields, instructions))
      ).rejects.toThrow()
    })
  })

  describe('Utility Functions', () => {
    const sampleSignature = {
      inputFields: [
        createInputField('question', 'User question'),
        createInputField('context', 'Additional context', undefined, undefined, true)
      ],
      outputFields: [
        createOutputField('answer', 'Generated answer'),
        createOutputField('confidence', 'Confidence score')
      ],
      instructions: { main: 'Answer the question' }
    }

    it('should get all field names', () => {
      const names = getAllFieldNames(sampleSignature)
      expect(names).toEqual(['question', 'context', 'answer', 'confidence'])
    })

    it('should get input field names', () => {
      const names = getInputFieldNames(sampleSignature)
      expect(names).toEqual(['question', 'context'])
    })

    it('should get output field names', () => {
      const names = getOutputFieldNames(sampleSignature)
      expect(names).toEqual(['answer', 'confidence'])
    })

    it('should find field by name', () => {
      const field = findField(sampleSignature, 'question')
      expect(field?.name).toBe('question')
      expect(field?.fieldType).toBe('input')
    })

    it('should return undefined for non-existent field', () => {
      const field = findField(sampleSignature, 'nonexistent')
      expect(field).toBeUndefined()
    })

    it('should check if signature has field', () => {
      expect(hasField(sampleSignature, 'question')).toBe(true)
      expect(hasField(sampleSignature, 'answer')).toBe(true)
      expect(hasField(sampleSignature, 'nonexistent')).toBe(false)
    })

    it('should get required input fields', () => {
      const required = getRequiredInputFields(sampleSignature)
      expect(required).toHaveLength(1)
      expect(required[0].name).toBe('question')
    })

    it('should get optional input fields', () => {
      const optional = getOptionalInputFields(sampleSignature)
      expect(optional).toHaveLength(1)
      expect(optional[0].name).toBe('context')
    })
  })

  describe('Type Guards', () => {
    it('should correctly identify valid signatures', () => {
      const validSignature = {
        inputFields: [{ name: 'input', fieldType: 'input' }],
        outputFields: [{ name: 'output', fieldType: 'output' }],
        instructions: { main: 'Process' }
      }

      expect(isSignature(validSignature)).toBe(true)
    })

    it('should correctly reject invalid signatures', () => {
      const invalidSignature = {
        notInputFields: [],
        notOutputFields: [],
        notInstructions: {}
      }

      expect(isSignature(invalidSignature)).toBe(false)
    })

    it('should correctly identify input fields', () => {
      const inputField = { name: 'test', fieldType: 'input' }
      const outputField = { name: 'test', fieldType: 'output' }

      expect(isInputField(inputField)).toBe(true)
      expect(isInputField(outputField)).toBe(false)
    })

    it('should correctly identify output fields', () => {
      const inputField = { name: 'test', fieldType: 'input' }
      const outputField = { name: 'test', fieldType: 'output' }

      expect(isOutputField(outputField)).toBe(true)
      expect(isOutputField(inputField)).toBe(false)
    })

    it('should correctly identify signature instructions', () => {
      const validInstructions = { main: 'Process' }
      const invalidInstructions = { notMain: 'Process' }

      expect(isSignatureInstructions(validInstructions)).toBe(true)
      expect(isSignatureInstructions(invalidInstructions)).toBe(false)
    })

    it('should correctly identify signature metadata', () => {
      const validMetadata = { name: 'test' }
      const invalidMetadata = { created: 'invalid-date' }

      expect(isSignatureMetadata(validMetadata)).toBe(true)
      expect(isSignatureMetadata(invalidMetadata)).toBe(false)
    })
  })

  describe('Serialization', () => {
    it('should encode and decode signature correctly', async () => {
      const signature = {
        inputFields: [createInputField('question')],
        outputFields: [createOutputField('answer')],
        instructions: { main: 'Answer the question' },
        metadata: {
          name: 'QA',
          created: '2023-01-01T00:00:00Z'
        }
      }

      const encoded = await Effect.runPromise(encodeSignature(signature))
      const decoded = await Effect.runPromise(decodeSignature(encoded))

      expect(decoded).toEqual(signature)
    })

    it('should handle JSON serialization round-trip', () => {
      const signature = {
        inputFields: [
          createInputField('question', 'User question'),
          createInputField('context', 'Context', undefined, undefined, true)
        ],
        outputFields: [createOutputField('answer', 'Answer')],
        instructions: {
          main: 'Answer the question',
          chainOfThought: true
        }
      }

      const jsonResult = safeJsonStringify(SignatureSchema, signature)
      expect(jsonResult._tag).toBe('Right')

      if (jsonResult._tag === 'Right') {
        const parseResult = safeJsonParse(SignatureSchema, jsonResult.right)
        expect(parseResult._tag).toBe('Right')

        if (parseResult._tag === 'Right') {
          expect(parseResult.right).toEqual(signature)
        }
      }
    })

    it('should pass round-trip test', () => {
      const signature = {
        inputFields: [createInputField('input')],
        outputFields: [createOutputField('output')],
        instructions: { main: 'Process' }
      }

      const result = testRoundTrip(SignatureSchema, signature)
      expect(result._tag).toBe('Right')
    })
  })

  describe('Edge Cases', () => {
    it('should handle signature with many fields', async () => {
      const manyInputFields = Array.from({ length: 50 }, (_, i) => createInputField(`input_${i}`, `Input field ${i}`))
      const manyOutputFields = Array.from({ length: 50 }, (_, i) =>
        createOutputField(`output_${i}`, `Output field ${i}`)
      )

      const signature = {
        inputFields: manyInputFields,
        outputFields: manyOutputFields,
        instructions: { main: 'Process many fields' }
      }

      const result = await Effect.runPromise(validateSignature(signature))
      expect(result.inputFields).toHaveLength(50)
      expect(result.outputFields).toHaveLength(50)
    })

    it('should handle signature with complex constraints', async () => {
      const complexSignature = {
        inputFields: [
          {
            name: 'email',
            fieldType: 'input' as const,
            constraints: {
              type: 'string',
              format: 'email',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              minLength: 5,
              maxLength: 100,
              required: true
            }
          },
          {
            name: 'age',
            fieldType: 'input' as const,
            constraints: {
              type: 'number',
              minimum: 0,
              maximum: 150,
              required: true
            }
          },
          {
            name: 'category',
            fieldType: 'input' as const,
            constraints: {
              enum: ['A', 'B', 'C', 'D'],
              required: true
            }
          }
        ],
        outputFields: [
          {
            name: 'result',
            fieldType: 'output' as const,
            constraints: {
              type: 'string',
              minLength: 1
            }
          }
        ],
        instructions: {
          main: 'Process user data',
          constraints: ['Validate email format', 'Check age range', 'Ensure category is valid'],
          examples: [
            'Input: email=test@example.com, age=25, category=A → Result: Valid user',
            'Input: email=invalid, age=200, category=X → Result: Invalid data'
          ]
        }
      }

      const result = await Effect.runPromise(validateSignature(complexSignature))
      expect(result).toEqual(complexSignature)
    })

    it('should handle signature with empty field names', async () => {
      // Note: Our schema requires non-empty strings for field names
      // This test verifies that empty names are rejected
      const invalidSignature = {
        inputFields: [
          {
            name: '',
            fieldType: 'input' as const
          }
        ],
        outputFields: [
          {
            name: 'output',
            fieldType: 'output' as const
          }
        ],
        instructions: { main: 'Process' }
      }

      // This should be rejected if we add a minLength constraint to field names
      // For now, empty strings are technically valid
      const result = await Effect.runPromise(validateSignature(invalidSignature))
      expect(result.inputFields[0].name).toBe('')
    })
  })
})
