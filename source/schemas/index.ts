/**
 * Schema Index
 *
 * Central export point for all DSPy schema types and utilities.
 * Provides a clean API for importing schemas, types, and helper functions.
 *
 * @example
 * import { ExampleSchema, PredictionSchema, SignatureSchema } from './schemas'
 * import { validateExample, createPrediction } from './schemas'
 */

// Export Example types and functions
export type {
  ExampleData,
  InputKeys,
  ExampleMetadata,
  Example,
  ExampleDataEncoded,
  ExampleMetadataEncoded,
  ExampleEncoded
} from './example.js'

// biome-ignore lint/performance/noBarrelFile: Schema exports need to be centralized
export {
  ExampleDataSchema,
  InputKeysSchema,
  ExampleMetadataSchema,
  ExampleSchema,
  validateExample,
  validateExampleData,
  validateExampleMetadata,
  encodeExample,
  decodeExample,
  isExample,
  isExampleData,
  isExampleMetadata,
  createExample,
  createValidatedExample
} from './example.js'

// Export Prediction types and functions
export type {
  Completion,
  Completions,
  Reasoning,
  Confidence,
  AggregationMetadata,
  Prediction,
  CompletionEncoded,
  CompletionsEncoded,
  ReasoningEncoded,
  ConfidenceEncoded,
  AggregationMetadataEncoded,
  PredictionEncoded
} from './prediction.js'

export {
  CompletionSchema,
  CompletionsSchema,
  ReasoningSchema,
  ConfidenceSchema,
  AggregationMetadataSchema,
  PredictionSchema,
  validatePrediction,
  validateCompletion,
  validateCompletions,
  validateReasoning,
  validateConfidence,
  validateAggregationMetadata,
  encodePrediction,
  decodePrediction,
  isPrediction,
  isCompletion,
  isCompletions,
  isReasoning,
  isConfidence,
  isAggregationMetadata,
  createPrediction,
  createValidatedPrediction
} from './prediction.js'

// Export Signature types and functions
export type {
  FieldConstraint,
  Field,
  InputField,
  OutputField,
  AnyField,
  InputFields,
  OutputFields,
  Fields,
  SignatureInstructions,
  SignatureMetadata,
  Signature,
  FieldConstraintEncoded,
  FieldEncoded,
  InputFieldEncoded,
  OutputFieldEncoded,
  SignatureInstructionsEncoded,
  SignatureMetadataEncoded,
  SignatureEncoded
} from './signature.js'

export {
  FieldConstraintSchema,
  FieldSchema,
  InputFieldSchema,
  OutputFieldSchema,
  AnyFieldSchema,
  InputFieldsSchema,
  OutputFieldsSchema,
  FieldsSchema,
  SignatureInstructionsSchema,
  SignatureMetadataSchema,
  SignatureSchema,
  validateSignature,
  validateInputField,
  validateOutputField,
  validateField,
  validateSignatureInstructions,
  validateSignatureMetadata,
  encodeSignature,
  decodeSignature,
  isSignature,
  isInputField,
  isOutputField,
  isField,
  isSignatureInstructions,
  isSignatureMetadata,
  createInputField,
  createOutputField,
  createSignature,
  createValidatedSignature,
  getAllFieldNames,
  getInputFieldNames,
  getOutputFieldNames,
  findField,
  hasField,
  getRequiredInputFields,
  getOptionalInputFields
} from './signature.js'

// Export utility types and functions
export type {
  ValidationResult,
  DSPyValidationError,
  DSPySchemaError,
  DSPyCompositionError
} from './utils.js'

export {
  validateToEither,
  validateOrThrow,
  validateSafe,
  validateBatch,
  safeJsonStringify,
  safeJsonParse,
  testRoundTrip,
  createTypeGuard,
  isAnyOf,
  isRecordWithKeys,
  makeOptional,
  makeArray,
  makeNullable,
  mergeRecordSchemas
} from './utils.js'
