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
  Example,
  ExampleData,
  ExampleMetadata
} from "./example.js"

export {
  ExampleSchema,
  ExampleDataSchema,
  ExampleMetadataSchema,
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
} from "./example.js"

// Export Prediction types and functions
export type {
  Prediction,
  Completion,
  Completions,
  Reasoning,
  Confidence,
  AggregationMetadata
} from "./prediction.js"

export {
  PredictionSchema,
  CompletionSchema,
  CompletionsSchema,
  ReasoningSchema,
  ConfidenceSchema,
  AggregationMetadataSchema,
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
  encodePrediction,
  decodePrediction
} from "./prediction.js"

// Export Signature types and functions
export type {
  Signature,
  InputField,
  OutputField,
  FieldConstraint,
  SignatureInstructions,
  SignatureMetadata
} from "./signature.js"

export {
  SignatureSchema,
  InputFieldSchema,
  OutputFieldSchema,
  FieldConstraintSchema,
  SignatureInstructionsSchema,
  SignatureMetadataSchema,
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
} from "./signature.js"

// Export utility types and functions
export type {
  DSPyValidationError,
  DSPySchemaError,
  DSPyCompositionError
} from "./utils.js"

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
  withValidationContext,
  createValidationError,
  hasRequiredKeys,
  extractKeys,
  omitKeys,
  deepMerge
} from "./utils.js"
