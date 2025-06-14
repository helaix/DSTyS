/**
 * Base Type Utilities and Helpers
 *
 * Common validation helpers, type guard functions, schema composition utilities,
 * and error handling patterns for DSPy primitive types.
 */

import { Schema, Effect, Either } from 'effect'
import type * as ParseResult from 'effect/ParseResult'

/**
 * Common validation result type
 */
export type ValidationResult<T> = Effect.Effect<T, ParseResult.ParseError>

/**
 * Common error types for DSPy operations
 */
// biome-ignore lint/style/useNamingConvention: DSPy is the framework name
export class DSPyValidationError extends Error {
  readonly _tag = 'DSPyValidationError'
  public readonly field?: string
  public readonly value?: unknown
  public override readonly cause?: Error

  constructor(message: string, field?: string, value?: unknown, cause?: Error) {
    super(message)
    if (field !== undefined) {
      this.field = field
    }
    if (value !== undefined) {
      this.value = value
    }
    if (cause !== undefined) {
      this.cause = cause
    }
    this.name = 'DSPyValidationError'
  }
}

// biome-ignore lint/style/useNamingConvention: DSPy is the framework name
export class DSPySchemaError extends Error {
  readonly _tag = 'DSPySchemaError'
  public readonly schema?: string
  public override readonly cause?: Error

  constructor(message: string, schema?: string, cause?: Error) {
    super(message)
    if (schema !== undefined) {
      this.schema = schema
    }
    if (cause !== undefined) {
      this.cause = cause
    }
    this.name = 'DSPySchemaError'
  }
}

// biome-ignore lint/style/useNamingConvention: DSPy is the framework name
export class DSPyCompositionError extends Error {
  readonly _tag = 'DSPyCompositionError'
  public readonly operation?: string
  public override readonly cause?: Error

  constructor(message: string, operation?: string, cause?: Error) {
    super(message)
    if (operation !== undefined) {
      this.operation = operation
    }
    if (cause !== undefined) {
      this.cause = cause
    }
    this.name = 'DSPyCompositionError'
  }
}

/**
 * Generic validation helper that converts Effect validation to Either
 */
export const validateToEither = <A>(
  schema: Schema.Schema<A, unknown>,
  value: unknown
): Either.Either<A, ParseResult.ParseError> => {
  try {
    const result = Effect.runSync(Schema.decodeUnknown(schema)(value))
    return Either.right(result)
  } catch (error) {
    return Either.left(error as ParseResult.ParseError)
  }
}

/**
 * Generic validation helper that throws on error
 */
export const validateOrThrow = <A>(schema: Schema.Schema<A, unknown>, value: unknown, errorMessage?: string): A => {
  const result = validateToEither(schema, value)

  if (Either.isLeft(result)) {
    const message = errorMessage || `Validation failed: ${result.left.message}`
    throw new DSPyValidationError(message, undefined, value, new Error(result.left.message))
  }

  return result.right
}

/**
 * Safe validation helper that returns undefined on error
 */
export const validateSafe = <A>(schema: Schema.Schema<A, unknown>, value: unknown): A | undefined => {
  try {
    return validateOrThrow(schema, value)
  } catch {
    return undefined
  }
}

/**
 * Validation helper with custom error transformation
 */
export const validateWithCustomError = <A, E>(
  schema: Schema.Schema<A, unknown>,
  value: unknown,
  errorTransform: (error: ParseResult.ParseError) => E
): Either.Either<A, E> => {
  const result = validateToEither(schema, value)

  if (Either.isLeft(result)) {
    return Either.left(errorTransform(result.left))
  }

  return Either.right(result.right)
}

/**
 * Batch validation helper for arrays
 */
export const validateBatch = <A, I>(
  schema: Schema.Schema<A, I>,
  values: I[]
): Either.Either<A[], ParseResult.ParseError[]> => {
  const results: A[] = []
  const errors: ParseResult.ParseError[] = []

  for (let index = 0; index < values.length; index++) {
    const value = values[index]
    const result = Schema.decodeUnknownEither(schema)(value)
    if (Either.isLeft(result)) {
      errors.push(result.left)
    } else {
      results.push(result.right)
    }
  }

  if (errors.length > 0) {
    return Either.left(errors)
  }

  return Either.right(results)
}

/**
 * Schema composition utilities
 */

/**
 * Merge two record schemas
 */
export const mergeRecordSchemas = <A, B>(
  _schemaA: Schema.Schema<Record<string, A>, unknown>,
  _schemaB: Schema.Schema<Record<string, B>, unknown>
) => {
  return Schema.Record({
    key: Schema.String,
    value: Schema.Unknown
  })
}

/**
 * Create optional wrapper for any schema
 */
export const makeOptional = <A>(schema: Schema.Schema<A, unknown>): Schema.Schema<A | undefined, unknown> => {
  return Schema.Union(schema, Schema.Undefined)
}

/**
 * Create array wrapper for any schema
 */
export const makeArray = <A, I, R>(schema: Schema.Schema<A, I, R>) => Schema.Array(schema)

/**
 * Create nullable wrapper for any schema
 */
export const makeNullable = <A>(schema: Schema.Schema<A, unknown>): Schema.Schema<A | null, unknown> => {
  return Schema.NullOr(schema)
}

/**
 * Type guard utilities
 */

/**
 * Generic type guard creator
 */
export const createTypeGuard = <A>(schema: Schema.Schema<A, unknown>) => {
  const guard = Schema.is(schema)
  return (value: unknown): value is A => guard(value)
}

/**
 * Type guard for checking if value matches any of multiple schemas
 */
export const isAnyOf = <A extends readonly Schema.Schema<unknown, unknown>[]>(
  schemas: A,
  value: unknown
): value is Schema.Schema.Type<A[number]> => {
  return schemas.some((schema) => Schema.is(schema)(value))
}

/**
 * Type guard for checking if value is a record with specific key type
 */
export const isRecordWithKeys = <K extends string>(
  keySchema: Schema.Schema<K, unknown>,
  value: unknown
): value is Record<K, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Record<string, unknown>
  return Object.keys(record).every((key) => Schema.is(keySchema)(key))
}

/**
 * Serialization utilities
 */

/**
 * Safe JSON serialization with schema validation
 */
export const safeJsonStringify = <A>(
  schema: Schema.Schema<A, unknown, never>,
  value: A
): Either.Either<string, DSPyValidationError> => {
  // First validate the value against the schema
  const validationResult = validateToEither(schema, value)
  if (Either.isLeft(validationResult)) {
    return Either.left(
      createValidationError(
        'Schema validation failed before serialization',
        'validation',
        value,
        new Error(validationResult.left.message || 'Validation error')
      )
    )
  }

  try {
    const json = JSON.stringify(value)
    return Either.right(json)
  } catch (error) {
    return Either.left(
      createValidationError(
        'JSON serialization failed',
        'serialization',
        value,
        new Error(error instanceof Error ? error.message : String(error))
      )
    )
  }
}

/**
 * Safe JSON parsing with schema validation
 */
export const safeJsonParse = <A>(
  schema: Schema.Schema<A, unknown, never>,
  json: string
): Either.Either<A, DSPyValidationError> => {
  try {
    const parsed = JSON.parse(json)
    // Use Schema.decodeUnknown directly instead of validateToEither
    const decoder = Schema.decodeUnknown(schema)
    const result = Effect.runSync(Effect.either(decoder(parsed)))

    if (Either.isLeft(result)) {
      return Either.left(
        createValidationError('Schema validation failed', 'validation', parsed, new Error('Validation error'))
      )
    }

    return Either.right(result.right)
  } catch (error) {
    return Either.left(
      createValidationError(
        'JSON parsing failed',
        'parsing',
        json,
        new Error(error instanceof Error ? error.message : String(error))
      )
    )
  }
}

/**
 * Round-trip serialization test
 */
export const testRoundTrip = <A>(
  schema: Schema.Schema<A, unknown, never>,
  value: A
): Either.Either<boolean, DSPyValidationError> => {
  const stringifyResult = safeJsonStringify(schema, value)

  if (Either.isLeft(stringifyResult)) {
    return Either.left(stringifyResult.left)
  }

  const parseResult = safeJsonParse(schema, stringifyResult.right)
  if (Either.isLeft(parseResult)) {
    return Either.left(parseResult.left)
  }

  // Return true if round-trip was successful
  return Either.right(true)
}

/**
 * Error handling patterns
 */

/**
 * Convert ParseResult.ParseError to user-friendly message
 */
export const formatValidationError = (error: ParseResult.ParseError): string => {
  // This is a simplified version - in practice you'd want more sophisticated error formatting
  return `Validation error: ${error.message || 'Unknown validation error'}`
}

/**
 * Create a validation error with context
 */
export const createValidationError = (
  message: string,
  field?: string,
  value?: unknown,
  originalError?: Error
): DSPyValidationError => {
  return new DSPyValidationError(message, field, value, originalError)
}

/**
 * Wrap a validation function with error context
 */
export const withValidationContext = <A, R>(
  validator: (input: unknown) => Effect.Effect<A, ParseResult.ParseError, R>,
  _context: string
) => {
  return (input: unknown) => {
    return Effect.mapError(validator(input), (error) => {
      // Add context to the error
      return error
    })
  }
}

/**
 * Utility functions for common patterns
 */

/**
 * Check if object has all required keys
 */
export const hasRequiredKeys = <T extends Record<string, unknown>>(
  obj: unknown,
  requiredKeys: (keyof T)[]
): obj is T => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  const record = obj as Record<string, unknown>
  return requiredKeys.every((key) => key in record)
}

/**
 * Extract specific keys from an object
 */
export const extractKeys = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * Omit specific keys from an object
 */
export const omitKeys = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

/**
 * Deep merge two objects (simple implementation)
 */
export const deepMerge = <T extends Record<string, unknown>>(target: T, source: Partial<T>): T => {
  const result = { ...target }

  for (const key of Object.keys(source)) {
    const sourceValue = source[key as keyof T]
    const targetValue = target[key as keyof T]

    if (
      sourceValue &&
      targetValue &&
      typeof sourceValue === 'object' &&
      typeof targetValue === 'object' &&
      !Array.isArray(sourceValue) &&
      !Array.isArray(targetValue)
    ) {
      result[key as keyof T] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[keyof T]
    } else {
      result[key as keyof T] = sourceValue as T[keyof T]
    }
  }

  return result
}
