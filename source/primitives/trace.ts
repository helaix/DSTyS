/**
 * @fileoverview Trace System for DSTyS
 *
 * This module provides the tracing infrastructure that records module executions
 * for optimization and debugging. Every module execution produces traces that
 * become training data for self-improvement.
 */

import { Schema, Effect } from 'effect'
import type { Example } from '../schemas/example.js'
import type { Prediction } from '../schemas/prediction.js'

/**
 * Learnable parameters that can be optimized
 */
export const LearnableParamsSchema = Schema.Struct({
  // Few-shot demonstration examples
  examples: Schema.Array(Schema.Unknown), // Will be Example[] when imported

  // System instructions for the module
  instructions: Schema.String,

  // Temperature for LLM generation
  temperature: Schema.Number.pipe(Schema.between(0, 2)),

  // Model identifier (optional)
  model: Schema.optional(Schema.String),

  // Maximum tokens for generation
  maxTokens: Schema.optional(Schema.Number.pipe(Schema.int(), Schema.positive())),

  // Additional custom parameters
  custom: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Trace record for a single module execution
 */
export const TraceSchema = Schema.Struct({
  // Unique identifier for this trace
  id: Schema.String,

  // Module name/type that generated this trace
  module: Schema.String,

  // Input data provided to the module
  input: Schema.Unknown,

  // Module parameters at execution time (snapshot)
  parameters: LearnableParamsSchema,

  // Generated prompt sent to LLM
  prompt: Schema.String,

  // Raw response from LLM
  response: Schema.String,

  // Parsed output from the module
  output: Schema.Unknown, // Will be Prediction when imported

  // Execution timestamp
  timestamp: Schema.Date,

  // Execution duration in milliseconds
  duration: Schema.Number.pipe(Schema.nonNegative()),

  // Any error that occurred during execution
  error: Schema.optional(Schema.String),

  // Success flag
  success: Schema.Boolean,

  // Additional metadata
  metadata: Schema.optional(
    Schema.Record({
      key: Schema.String,
      value: Schema.Unknown
    })
  )
})

/**
 * Collection of traces for analysis and optimization
 */
export const TraceCollectionSchema = Schema.Struct({
  // Array of individual traces
  traces: Schema.Array(TraceSchema),

  // Collection metadata
  metadata: Schema.Struct({
    // Total number of traces
    count: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),

    // Date range of traces
    startDate: Schema.Date,
    endDate: Schema.Date,

    // Modules represented in this collection
    modules: Schema.Array(Schema.String),

    // Success rate
    successRate: Schema.Number.pipe(Schema.between(0, 1))
  })
})

/**
 * Type definitions
 */
export type LearnableParams = Schema.Schema.Type<typeof LearnableParamsSchema>
export type Trace = Schema.Schema.Type<typeof TraceSchema>
export type TraceCollection = Schema.Schema.Type<typeof TraceCollectionSchema>

/**
 * Error types for trace operations
 */
export class TraceError extends Error {
  readonly _tag = 'TraceError'

  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = 'TraceError'
  }
}

/**
 * Trace collector that manages trace recording and storage
 */
export class TraceCollector {
  private traces: Trace[] = []

  /**
   * Record a new trace
   */
  record(trace: Omit<Trace, 'id' | 'timestamp'>): Effect.Effect<Trace, TraceError> {
    return Effect.try({
      try: () => {
        const fullTrace: Trace = {
          ...trace,
          id: this.generateTraceId(),
          timestamp: new Date()
        }

        this.traces.push(fullTrace)
        return fullTrace
      },
      catch: (error) => new TraceError('Failed to record trace', error)
    })
  }

  /**
   * Get all traces
   */
  getTraces(): Effect.Effect<Trace[], never> {
    return Effect.succeed([...this.traces])
  }

  /**
   * Get traces for a specific module
   */
  getTracesForModule(moduleName: string): Effect.Effect<Trace[], never> {
    return Effect.succeed(this.traces.filter((trace) => trace.module === moduleName))
  }

  /**
   * Get successful traces only
   */
  getSuccessfulTraces(): Effect.Effect<Trace[], never> {
    return Effect.succeed(this.traces.filter((trace) => trace.success))
  }

  /**
   * Clear all traces
   */
  clear(): Effect.Effect<void, never> {
    return Effect.sync(() => {
      this.traces = []
    })
  }

  /**
   * Get trace collection with metadata
   */
  getCollection(): Effect.Effect<TraceCollection, TraceError> {
    return Effect.try({
      try: () => {
        const traces = [...this.traces]
        const modules = [...new Set(traces.map((t) => t.module))]
        const successfulTraces = traces.filter((t) => t.success)

        const collection: TraceCollection = {
          traces,
          metadata: {
            count: traces.length,
            startDate: traces.length > 0 ? new Date(Math.min(...traces.map((t) => t.timestamp.getTime()))) : new Date(),
            endDate: traces.length > 0 ? new Date(Math.max(...traces.map((t) => t.timestamp.getTime()))) : new Date(),
            modules,
            successRate: traces.length > 0 ? successfulTraces.length / traces.length : 0
          }
        }

        return collection
      },
      catch: (error) => new TraceError('Failed to create trace collection', error)
    })
  }

  /**
   * Generate a unique trace ID
   */
  private generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

/**
 * Global trace collector instance
 */
export const globalTraceCollector = new TraceCollector()

/**
 * Utility functions for working with traces
 */
export const TraceUtils = {
  /**
   * Create learnable parameters with defaults
   */
  createLearnableParams(overrides: Partial<LearnableParams> = {}): LearnableParams {
    return {
      examples: [],
      instructions: '',
      temperature: 0.7,
      model: undefined,
      maxTokens: undefined,
      custom: undefined,
      ...overrides
    }
  },

  /**
   * Validate a trace object
   */
  validateTrace: Schema.decodeUnknown(TraceSchema),

  /**
   * Validate learnable parameters
   */
  validateLearnableParams: Schema.decodeUnknown(LearnableParamsSchema),

  /**
   * Validate trace collection
   */
  validateTraceCollection: Schema.decodeUnknown(TraceCollectionSchema)
}

/**
 * Export validation functions
 */
export const validateTrace = TraceUtils.validateTrace
export const validateLearnableParams = TraceUtils.validateLearnableParams
export const validateTraceCollection = TraceUtils.validateTraceCollection
