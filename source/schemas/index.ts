/**
 * DSPy Core Primitive Types - Effect Schema Implementation
 * 
 * This module provides comprehensive Effect Schema types for the core DSPy primitives:
 * - Example: Data storage with input keys and metadata
 * - Prediction: Completions with reasoning and confidence
 * - Signature: Field definitions with instructions and metadata
 * 
 * All schemas provide both compile-time TypeScript types and runtime validation.
 */

// Example exports
export * from "./example.js"

// Prediction exports  
export * from "./prediction.js"

// Signature exports
export * from "./signature.js"

// Utility exports
export * from "./utils.js"

// Re-export commonly used types for convenience
export type {
  Example,
  ExampleData,
  ExampleMetadata,
  Prediction,
  Completion,
  Completions,
  Reasoning,
  Confidence,
  Signature,
  InputField,
  OutputField,
  SignatureInstructions
} from "./example.js"

export type {
  Prediction as PredictionType,
  Completion as CompletionType,
  Completions as CompletionsType
} from "./prediction.js"

export type {
  Signature as SignatureType,
  InputField as InputFieldType,
  OutputField as OutputFieldType
} from "./signature.js"

