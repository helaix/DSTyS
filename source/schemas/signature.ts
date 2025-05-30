/**
 * Signature Schema Definition
 *
 * Defines Effect Schema types for DSPy Signature primitives that define
 * input and output field collections, instructions, and metadata.
 */

import { Schema, type Effect } from 'effect'
import type { ParseResult } from 'effect'

/**
 * Field constraint schema
 * Defines validation constraints for individual fields
 */
export const FieldConstraintSchema = Schema.Struct({
  // Type constraint (e.g., "string", "number", "boolean")
  type: Schema.optional(Schema.String),

  // Format constraint (e.g., "email", "url", "date")
  format: Schema.optional(Schema.String),

  // Length constraints
  minLength: Schema.optional(Schema.Number.pipe(Schema.int(), Schema.nonNegative())),
  maxLength: Schema.optional(Schema.Number.pipe(Schema.int(), Schema.positive())),

  // Numeric constraints
  minimum: Schema.optional(Schema.Number),
  maximum: Schema.optional(Schema.Number),

  // Pattern constraint (regex)
  pattern: Schema.optional(Schema.String),

  // Enum constraint (allowed values)
  enum: Schema.optional(Schema.Array(Schema.Unknown)),

  // Required field flag
  required: Schema.optional(Schema.Boolean),

  // Custom validation metadata
  custom: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Base field schema
 * Represents a single field in a signature
 */
export const FieldSchema = Schema.Struct({
  // Field name/key
  name: Schema.String,

  // Field description
  description: Schema.optional(Schema.String),

  // Field prefix for prompting
  prefix: Schema.optional(Schema.String),

  // Field constraints
  constraints: Schema.optional(FieldConstraintSchema),

  // Field metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Input field schema
 * Extends base field with input-specific properties
 */
export const InputFieldSchema = FieldSchema.pipe(
  Schema.extend(
    Schema.Struct({
      // Mark as input field
      fieldType: Schema.Literal('input'),

      // Default value for input field
      defaultValue: Schema.optional(Schema.Unknown),

      // Whether this input is optional
      optional: Schema.optional(Schema.Boolean)
    })
  )
)

/**
 * Output field schema
 * Extends base field with output-specific properties
 */
export const OutputFieldSchema = FieldSchema.pipe(
  Schema.extend(
    Schema.Struct({
      // Mark as output field
      fieldType: Schema.Literal('output'),

      // Expected output format/structure
      expectedFormat: Schema.optional(Schema.String),

      // Post-processing instructions
      postProcessing: Schema.optional(Schema.String)
    })
  )
)

/**
 * Union of input and output fields
 */
export const AnyFieldSchema = Schema.Union(InputFieldSchema, OutputFieldSchema)

/**
 * Field collection schemas
 */
export const InputFieldsSchema = Schema.Array(InputFieldSchema)
export const OutputFieldsSchema = Schema.Array(OutputFieldSchema)
export const FieldsSchema = Schema.Array(AnyFieldSchema)

/**
 * Signature instructions schema
 * Defines how the signature should be used
 */
export const SignatureInstructionsSchema = Schema.Struct({
  // Main instruction text
  main: Schema.String,

  // Additional context or background
  context: Schema.optional(Schema.String),

  // Examples of expected behavior
  examples: Schema.optional(Schema.Array(Schema.String)),

  // Constraints or requirements
  constraints: Schema.optional(Schema.Array(Schema.String)),

  // Output format instructions
  outputFormat: Schema.optional(Schema.String),

  // Chain-of-thought instructions
  chainOfThought: Schema.optional(Schema.Boolean),

  // Custom instruction metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Signature metadata schema
 * Stores additional information about the signature
 */
export const SignatureMetadataSchema = Schema.Struct({
  // Signature name/identifier
  name: Schema.optional(Schema.String),

  // Version information
  version: Schema.optional(Schema.String),

  // Author/creator
  author: Schema.optional(Schema.String),

  // Creation timestamp
  created: Schema.optional(Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/))),

  // Last modified timestamp
  modified: Schema.optional(Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/))),

  // Tags for categorization
  tags: Schema.optional(Schema.Array(Schema.String)),

  // Usage statistics
  usage: Schema.optional(
    Schema.Struct({
      count: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
      lastUsed: Schema.optional(Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/))),
      averageLatency: Schema.optional(Schema.Number.pipe(Schema.positive()))
    })
  ),

  // Custom metadata
  custom: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Complete Signature schema
 * Represents a DSPy Signature with input/output fields, instructions, and metadata
 */
export const SignatureSchema = Schema.Struct({
  // Input fields - required
  inputFields: InputFieldsSchema,

  // Output fields - required
  outputFields: OutputFieldsSchema,

  // Instructions - required
  instructions: SignatureInstructionsSchema,

  // Metadata - optional
  metadata: Schema.optional(SignatureMetadataSchema)
})

/**
 * Type definitions derived from schemas
 */
export type FieldConstraint = Schema.Schema.Type<typeof FieldConstraintSchema>
export type Field = Schema.Schema.Type<typeof FieldSchema>
export type InputField = Schema.Schema.Type<typeof InputFieldSchema>
export type OutputField = Schema.Schema.Type<typeof OutputFieldSchema>
export type AnyField = Schema.Schema.Type<typeof AnyFieldSchema>
export type InputFields = Schema.Schema.Type<typeof InputFieldsSchema>
export type OutputFields = Schema.Schema.Type<typeof OutputFieldsSchema>
export type Fields = Schema.Schema.Type<typeof FieldsSchema>
export type SignatureInstructions = Schema.Schema.Type<typeof SignatureInstructionsSchema>
export type SignatureMetadata = Schema.Schema.Type<typeof SignatureMetadataSchema>
export type Signature = Schema.Schema.Type<typeof SignatureSchema>

/**
 * Encoded types for serialization
 */
export type FieldConstraintEncoded = Schema.Schema.Encoded<typeof FieldConstraintSchema>
export type FieldEncoded = Schema.Schema.Encoded<typeof FieldSchema>
export type InputFieldEncoded = Schema.Schema.Encoded<typeof InputFieldSchema>
export type OutputFieldEncoded = Schema.Schema.Encoded<typeof OutputFieldSchema>
export type SignatureInstructionsEncoded = Schema.Schema.Encoded<typeof SignatureInstructionsSchema>
export type SignatureMetadataEncoded = Schema.Schema.Encoded<typeof SignatureMetadataSchema>
export type SignatureEncoded = Schema.Schema.Encoded<typeof SignatureSchema>

/**
 * Validation helpers
 */
export const validateSignature = Schema.decodeUnknown(SignatureSchema)
export const validateInputField = Schema.decodeUnknown(InputFieldSchema)
export const validateOutputField = Schema.decodeUnknown(OutputFieldSchema)
export const validateField = Schema.decodeUnknown(AnyFieldSchema)
export const validateSignatureInstructions = Schema.decodeUnknown(SignatureInstructionsSchema)
export const validateSignatureMetadata = Schema.decodeUnknown(SignatureMetadataSchema)

/**
 * Serialization helpers
 */
export const encodeSignature = Schema.encode(SignatureSchema)
export const decodeSignature = Schema.decode(SignatureSchema)

/**
 * Type guards
 */
export const isSignature = Schema.is(SignatureSchema)
export const isInputField = Schema.is(InputFieldSchema)
export const isOutputField = Schema.is(OutputFieldSchema)
export const isField = Schema.is(AnyFieldSchema)
export const isSignatureInstructions = Schema.is(SignatureInstructionsSchema)
export const isSignatureMetadata = Schema.is(SignatureMetadataSchema)

/**
 * Factory functions for creating fields and signatures
 */
export const createInputField = (
  name: string,
  description?: string,
  constraint?: FieldConstraint,
  defaultValue?: string,
  optional?: boolean
): InputField => {
  return {
    name,
    fieldType: 'input' as const,
    ...(description !== undefined && { description }),
    ...(constraint !== undefined && { constraints: constraint }),
    ...(defaultValue !== undefined && { defaultValue }),
    ...(optional !== undefined && { optional })
  }
}

export const createOutputField = (
  name: string,
  description?: string,
  constraint?: FieldConstraint,
  expectedFormat?: string,
  postProcessing?: string
): OutputField => {
  return {
    name,
    fieldType: 'output' as const,
    ...(description !== undefined && { description }),
    ...(constraint !== undefined && { constraints: constraint }),
    ...(expectedFormat !== undefined && { expectedFormat }),
    ...(postProcessing !== undefined && { postProcessing })
  }
}

export const createSignature = (
  inputFields: InputField[],
  outputFields: OutputField[],
  instructions: SignatureInstructions,
  metadata?: SignatureMetadata
): Signature => {
  return {
    inputFields,
    outputFields,
    instructions,
    ...(metadata !== undefined && { metadata })
  }
}

/**
 * Utility function to create a Signature with validation
 */
export const createValidatedSignature = (
  inputFields: unknown,
  outputFields: unknown,
  instructions?: unknown,
  metadata?: unknown
): Effect.Effect<Signature, ParseResult.ParseError> => {
  const signatureData: Record<string, unknown> = { inputFields, outputFields }

  if (instructions !== undefined) {
    signatureData['instructions'] = instructions
  }
  if (metadata !== undefined) {
    signatureData['metadata'] = metadata
  }

  return Schema.decodeUnknown(SignatureSchema)(signatureData)
}

/**
 * Utility functions for working with signatures
 */

/**
 * Get all field names from a signature
 */
export const getAllFieldNames = (signature: Signature): string[] => {
  const inputNames = signature.inputFields.map((field) => field.name)
  const outputNames = signature.outputFields.map((field) => field.name)
  return [...inputNames, ...outputNames]
}

/**
 * Get input field names only
 */
export const getInputFieldNames = (signature: Signature): string[] => {
  return signature.inputFields.map((field) => field.name)
}

/**
 * Get output field names only
 */
export const getOutputFieldNames = (signature: Signature): string[] => {
  return signature.outputFields.map((field) => field.name)
}

/**
 * Find a field by name
 */
export const findField = (signature: Signature, name: string): AnyField | undefined => {
  const allFields = [...signature.inputFields, ...signature.outputFields]
  return allFields.find((field) => field.name === name)
}

/**
 * Check if signature has a specific field
 */
export const hasField = (signature: Signature, name: string): boolean => {
  return findField(signature, name) !== undefined
}

/**
 * Get required input fields
 */
export const getRequiredInputFields = (signature: Signature): InputField[] => {
  return signature.inputFields.filter((field) => !field.optional)
}

/**
 * Get optional input fields
 */
export const getOptionalInputFields = (signature: Signature): InputField[] => {
  return signature.inputFields.filter((field) => field.optional === true)
}
