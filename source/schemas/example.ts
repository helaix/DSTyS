/**
 * Example Schema Definition
 * 
 * Defines Effect Schema types for DSPy Examples, which store data with
 * input keys, and metadata for few-shot demonstrations and training.
 */

import { Schema, Effect, ParseResult } from "effect"

/**
 * Base data storage schema for Example
 * Represents arbitrary key-value pairs where values can be of any type
 */
export const ExampleDataSchema = Schema.Record({
  key: Schema.String,
  value: Schema.Unknown
})

/**
 * Input keys schema - array of strings identifying which fields are inputs
 */
export const InputKeysSchema = Schema.Array(Schema.String)

/**
 * Metadata schema for Example instances
 * Stores additional information about the example
 */
export const ExampleMetadataSchema = Schema.Struct({
  // DSPy-specific metadata
  dspy_uuid: Schema.optional(Schema.String),
  dspy_split: Schema.optional(Schema.String),
  
  // General metadata
  source: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/))),
  tags: Schema.optional(Schema.Array(Schema.String)),
  
  // Custom metadata - allows arbitrary additional fields
  custom: Schema.optional(Schema.Record({
    key: Schema.String,
    value: Schema.Unknown
  }))
})

/**
 * Complete Example schema
 * Represents a DSPy Example with data, input keys, and metadata
 */
export const ExampleSchema = Schema.Struct({
  // Core data storage - required
  data: ExampleDataSchema,
  
  // Input keys - optional, defaults to empty array
  inputKeys: Schema.optional(InputKeysSchema),
  
  // Metadata - optional
  metadata: Schema.optional(ExampleMetadataSchema)
})

/**
 * Type definitions derived from schemas
 */
export type ExampleData = Schema.Schema.Type<typeof ExampleDataSchema>
export type InputKeys = Schema.Schema.Type<typeof InputKeysSchema>
export type ExampleMetadata = Schema.Schema.Type<typeof ExampleMetadataSchema>
export type Example = Schema.Schema.Type<typeof ExampleSchema>

/**
 * Encoded types for serialization
 */
export type ExampleDataEncoded = Schema.Schema.Encoded<typeof ExampleDataSchema>
export type ExampleMetadataEncoded = Schema.Schema.Encoded<typeof ExampleMetadataSchema>
export type ExampleEncoded = Schema.Schema.Encoded<typeof ExampleSchema>

/**
 * Validation helpers
 */
export const validateExample = Schema.decodeUnknown(ExampleSchema)
export const validateExampleData = Schema.decodeUnknown(ExampleDataSchema)
export const validateExampleMetadata = Schema.decodeUnknown(ExampleMetadataSchema)

/**
 * Serialization helpers
 */
export const encodeExample = Schema.encode(ExampleSchema)
export const decodeExample = Schema.decode(ExampleSchema)

/**
 * Type guards
 */
export const isExample = Schema.is(ExampleSchema)
export const isExampleData = Schema.is(ExampleDataSchema)
export const isExampleMetadata = Schema.is(ExampleMetadataSchema)

/**
 * Factory functions for creating Examples
 */
export const createExample = (
  data: ExampleData,
  inputKeys?: InputKeys,
  metadata?: ExampleMetadata
): Example => ({
  data,
  ...(inputKeys !== undefined && { inputKeys }),
  ...(metadata !== undefined && { metadata })
})

/**
 * Factory function to create a validated Example
 * 
 * @param data - The example data
 * @param inputKeys - Optional input keys
 * @param metadata - Optional metadata
 * @returns Effect that resolves to a validated Example
 */
export const createValidatedExample = (
  data: unknown,
  inputKeys?: unknown,
  metadata?: unknown
): Effect.Effect<Example, ParseResult.ParseError> => {
  const exampleData = {
    data,
    ...(inputKeys !== undefined && { inputKeys }),
    ...(metadata !== undefined && { metadata })
  }
  return Schema.decodeUnknown(ExampleSchema)(exampleData)
}

