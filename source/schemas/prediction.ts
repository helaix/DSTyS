/**
 * Prediction Schema Definition
 *
 * Defines Effect Schema types for DSPy Prediction primitives that store
 * completions, reasoning, confidence, and aggregation metadata.
 */

import { Schema, type Effect } from 'effect'
import type { ParseResult } from 'effect'

/**
 * Single completion schema
 * Represents one completion/response from a language model
 */
export const CompletionSchema = Schema.Record({
  key: Schema.String,
  value: Schema.Unknown
})

/**
 * Array of completions
 */
export const CompletionsSchema = Schema.Array(CompletionSchema)

/**
 * Reasoning schema for storing chain-of-thought or explanation
 */
export const ReasoningSchema = Schema.Struct({
  // Main reasoning text
  text: Schema.String,

  // Optional structured reasoning steps
  steps: Schema.optional(Schema.Array(Schema.String)),

  // Reasoning type (e.g., "chain-of-thought", "explanation", "justification")
  type: Schema.optional(Schema.String),

  // Confidence in the reasoning
  confidence: Schema.optional(Schema.Number.pipe(Schema.between(0, 1)))
})

/**
 * Confidence schema for prediction confidence scores
 */
export const ConfidenceSchema = Schema.Struct({
  // Overall confidence score (0-1)
  score: Schema.Number.pipe(Schema.between(0, 1)),

  // Method used to calculate confidence
  method: Schema.optional(Schema.String),

  // Per-field confidence scores
  fieldScores: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Number.pipe(Schema.between(0, 1))
    })
  ),

  // Additional confidence metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Aggregation metadata schema
 * Stores information about how multiple predictions were combined
 */
export const AggregationMetadataSchema = Schema.Struct({
  // Method used for aggregation (e.g., "majority", "weighted", "ensemble")
  method: Schema.String,

  // Number of predictions aggregated
  count: Schema.Number.pipe(Schema.int(), Schema.positive()),

  // Weights used in aggregation (if applicable)
  weights: Schema.optional(Schema.Array(Schema.Number)),

  // Agreement/consensus metrics
  agreement: Schema.optional(
    Schema.Struct({
      score: Schema.Number.pipe(Schema.between(0, 1)),
      metric: Schema.String // e.g., "exact_match", "semantic_similarity"
    })
  ),

  // Individual prediction scores before aggregation
  individualScores: Schema.optional(Schema.Array(Schema.Number)),

  // Additional aggregation metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Complete Prediction schema
 * Represents a DSPy Prediction with completions, reasoning, and confidence
 */
export const PredictionSchema = Schema.Struct({
  // Core completions - required
  completions: CompletionsSchema,

  // Reasoning information - optional
  reasoning: Schema.optional(ReasoningSchema),

  // Confidence information - optional
  confidence: Schema.optional(ConfidenceSchema),

  // Aggregation metadata - optional (present when prediction is result of aggregation)
  aggregation: Schema.optional(AggregationMetadataSchema),

  // General metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  ),

  // Timestamp when prediction was created
  timestamp: Schema.optional(Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/)))
})

/**
 * Type definitions derived from schemas
 */
export type Completion = Schema.Schema.Type<typeof CompletionSchema>
export type Completions = Schema.Schema.Type<typeof CompletionsSchema>
export type Reasoning = Schema.Schema.Type<typeof ReasoningSchema>
export type Confidence = Schema.Schema.Type<typeof ConfidenceSchema>
export type AggregationMetadata = Schema.Schema.Type<typeof AggregationMetadataSchema>
export type Prediction = Schema.Schema.Type<typeof PredictionSchema>

/**
 * Encoded types for serialization
 */
export type CompletionEncoded = Schema.Schema.Encoded<typeof CompletionSchema>
export type CompletionsEncoded = Schema.Schema.Encoded<typeof CompletionsSchema>
export type ReasoningEncoded = Schema.Schema.Encoded<typeof ReasoningSchema>
export type ConfidenceEncoded = Schema.Schema.Encoded<typeof ConfidenceSchema>
export type AggregationMetadataEncoded = Schema.Schema.Encoded<typeof AggregationMetadataSchema>
export type PredictionEncoded = Schema.Schema.Encoded<typeof PredictionSchema>

/**
 * Validation helpers
 */
export const validatePrediction = Schema.decodeUnknown(PredictionSchema)
export const validateCompletion = Schema.decodeUnknown(CompletionSchema)
export const validateCompletions = Schema.decodeUnknown(CompletionsSchema)
export const validateReasoning = Schema.decodeUnknown(ReasoningSchema)
export const validateConfidence = Schema.decodeUnknown(ConfidenceSchema)
export const validateAggregationMetadata = Schema.decodeUnknown(AggregationMetadataSchema)

/**
 * Serialization helpers
 */
export const encodePrediction = Schema.encode(PredictionSchema)
export const decodePrediction = Schema.decode(PredictionSchema)

/**
 * Type guards
 */
export const isPrediction = Schema.is(PredictionSchema)
export const isCompletion = Schema.is(CompletionSchema)
export const isCompletions = Schema.is(CompletionsSchema)
export const isReasoning = Schema.is(ReasoningSchema)
export const isConfidence = Schema.is(ConfidenceSchema)
export const isAggregationMetadata = Schema.is(AggregationMetadataSchema)

/**
 * Factory functions for creating Predictions
 */
export const createPrediction = (
  completions: Completions,
  reasoning?: Reasoning,
  confidence?: Confidence,
  aggregation?: AggregationMetadata,
  metadata?: Record<string, unknown>,
  timestamp?: string
): Prediction => {
  return {
    completions,
    ...(reasoning !== undefined && { reasoning }),
    ...(confidence !== undefined && { confidence }),
    ...(aggregation !== undefined && { aggregation }),
    ...(metadata !== undefined && { metadata }),
    timestamp: timestamp ?? new Date().toISOString()
  }
}

/**
 * Utility function to create a Prediction with validation
 */
export const createValidatedPrediction = (
  completions: unknown,
  reasoning?: unknown,
  confidence?: unknown,
  aggregation?: unknown,
  metadata?: unknown,
  timestamp?: unknown
): Effect.Effect<Prediction, ParseResult.ParseError> => {
  const predictionData: Record<string, unknown> = { completions }

  if (reasoning !== undefined) {
    predictionData['reasoning'] = reasoning
  }
  if (confidence !== undefined) {
    predictionData['confidence'] = confidence
  }
  if (aggregation !== undefined) {
    predictionData['aggregation'] = aggregation
  }
  if (metadata !== undefined) {
    predictionData['metadata'] = metadata
  }
  if (timestamp !== undefined) {
    predictionData['timestamp'] = timestamp
  }

  return Schema.decodeUnknown(PredictionSchema)(predictionData)
}

/**
 * Utility to extract the first completion from a prediction
 */
export const getFirstCompletion = (prediction: Prediction): Completion | undefined => {
  return prediction.completions[0]
}

/**
 * Utility to check if prediction has reasoning
 */
export const hasReasoning = (prediction: Prediction): prediction is Prediction & { reasoning: Reasoning } => {
  return prediction.reasoning !== undefined
}

/**
 * Utility to check if prediction has confidence
 */
export const hasConfidence = (prediction: Prediction): prediction is Prediction & { confidence: Confidence } => {
  return prediction.confidence !== undefined
}

/**
 * Utility to check if prediction is aggregated
 */
export const isAggregated = (
  prediction: Prediction
): prediction is Prediction & { aggregation: AggregationMetadata } => {
  return prediction.aggregation !== undefined
}
