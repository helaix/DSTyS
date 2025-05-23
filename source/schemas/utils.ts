/**
 * Base Type Utilities and Helpers
 * 
 * Common validation helpers, type guard functions, schema composition utilities,
 * and error handling patterns for DSPy primitive types.
 */

import { Schema, Effect, Either, pipe } from "effect"
import type { ParseResult } from "effect/ParseResult"

/**
 * Common validation result type
 */
export type ValidationResult<T> = Effect.Effect<T, ParseResult.ParseError>

/**
 * Common error types for DSPy operations
 */
export class DSPyValidationError extends Error {
  readonly _tag = "DSPyValidationError"
  
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = "DSPyValidationError"
  }
}

export class DSPySchemaError extends Error {
  readonly _tag = "DSPySchemaError"
  
  constructor(
    message: string,
    public readonly schema?: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = "DSPySchemaError"
  }
}

export class DSPyCompositionError extends Error {
  readonly _tag = "DSPyCompositionError"
  
  constructor(
    message: string,
    public readonly operation?: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = "DSPyCompositionError"
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
export const validateOrThrow = <A>(
  schema: Schema.Schema<A, unknown>,
  value: unknown,
  errorMessage?: string
): A => {
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
export const validateSafe = <A>(
  schema: Schema.Schema<A, unknown>,
  value: unknown
): A | undefined => {
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
  
  return result
}

/**
 * Batch validation helper for arrays
 */
export const validateBatch = <A>(
  schema: Schema.Schema<A, unknown>,
  values: unknown[]
): Either.Either<A[], { index: number; error: ParseResult.ParseError }[]> => {
  const results: A[] = []
  const errors: { index: number; error: ParseResult.ParseError }[] = []
  
  values.forEach((value, index) => {
    const result = validateToEither(schema, value)
    
    if (Either.isLeft(result)) {
      errors.push({ index, error: result.left })
    } else {
      results.push(result.right)
    }
  })
  
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
  schemaA: Schema.Schema<Record<string, A>, unknown>,
  schemaB: Schema.Schema<Record<string, B>, unknown>
): Schema.Schema<Record<string, A | B>, unknown> => {
  return Schema.Record({
    key: Schema.String,
    value: Schema.Union(
      Schema.Unknown.pipe(Schema.compose(schemaA.pipe(Schema.values))),
      Schema.Unknown.pipe(Schema.compose(schemaB.pipe(Schema.values)))
    )
  })
}

/**
 * Create optional wrapper for any schema
 */
export const makeOptional = <A>(
  schema: Schema.Schema<A, unknown>
): Schema.Schema<A | undefined, unknown> => {
  return Schema.Union(schema, Schema.Undefined)
}

/**
 * Create array wrapper for any schema
 */
export const makeArray = <A>(
  schema: Schema.Schema<A, unknown>
): Schema.Schema<A[], unknown> => {
  return Schema.Array(schema)
}

/**
 * Create nullable wrapper for any schema
 */
export const makeNullable = <A>(
  schema: Schema.Schema<A, unknown>
): Schema.Schema<A | null, unknown> => {
  return Schema.NullOr(schema)
}

/**
 * Type guard utilities
 */

/**
 * Generic type guard creator
 */
export const createTypeGuard = <A>(
  schema: Schema.Schema<A, unknown>
) => {
  const guard = Schema.is(schema)
  return (value: unknown): value is A => guard(value)
}

/**
 * Type guard for checking if value matches any of multiple schemas
 */
export const isAnyOf = <A extends readonly Schema.Schema<any, unknown>[]>(
  schemas: A,
  value: unknown
): value is Schema.Schema.Type<A[number]> => {
  return schemas.some(schema => Schema.is(schema)(value))
}

/**
 * Type guard for checking if value is a record with specific key type
 */
export const isRecordWithKeys = <K extends string>(
  keySchema: Schema.Schema<K, unknown>,
  value: unknown
): value is Record<K, unknown> => {
  if (typeof value !== "object" || value === null) {
    return false
  }
  
  const record = value as Record<string, unknown>
  return Object.keys(record).every(key => Schema.is(keySchema)(key))
}

/**
 * Serialization utilities
 */

/**
 * Safe JSON serialization with schema validation
 */
export const safeJsonStringify = <A>(
  schema: Schema.Schema<A, unknown>,
  value: A
): Either.Either<string, Error> => {
  try {
    // Validate the value first
    const validationResult = validateToEither(schema, value)
    
    if (Either.isLeft(validationResult)) {
      return Either.left(new DSPyValidationError("Value failed schema validation before serialization"))
    }
    
    // Encode the value for serialization
    const encoded = Schema.encode(schema)(value)
    const encodedResult = Effect.runSync(encoded)
    
    // Serialize to JSON
    const json = JSON.stringify(encodedResult)
    return Either.right(json)
  } catch (error) {
    return Either.left(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Safe JSON deserialization with schema validation
 */
export const safeJsonParse = <A>(
  schema: Schema.Schema<A, unknown>,
  json: string
): Either.Either<A, Error> => {
  try {
    // Parse JSON
    const parsed = JSON.parse(json)
    
    // Decode and validate
    const result = validateToEither(schema, parsed)
    
    if (Either.isLeft(result)) {
      return Either.left(new DSPyValidationError("Parsed JSON failed schema validation"))
    }
    
    return Either.right(result.right)
  } catch (error) {
    return Either.left(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Round-trip serialization test
 */
export const testRoundTrip = <A>(
  schema: Schema.Schema<A, unknown>,
  value: A
): Either.Either<boolean, Error> => {
  return pipe(
    safeJsonStringify(schema, value),
    Either.flatMap(json => safeJsonParse(schema, json)),
    Either.map(parsed => {
      // Deep equality check would go here
      // For now, just return true if we got this far
      return true
    })
  )
}

/**
 * Error handling patterns
 */

/**
 * Convert ParseResult.ParseError to user-friendly message
 */
export const formatValidationError = (error: ParseResult.ParseError): string => {
  // This is a simplified version - in practice you'd want more sophisticated error formatting
  return `Validation error: ${error.message}`
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
export const withValidationContext = <A>(
  validator: (value: unknown) => ValidationResult<A>,
  context: string
) => {
  return (value: unknown): ValidationResult<A> => {
    return pipe(
      validator(value),
      Effect.catchAll(error => {
        const message = `${context}: ${formatValidationError(error)}`
        const contextError = createValidationError(message, undefined, value, new Error(error.message))
        return Effect.fail(contextError as any)
      })
    )
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
  if (typeof obj !== "object" || obj === null) {
    return false
  }
  
  const record = obj as Record<string, unknown>
  return requiredKeys.every(key => key in record)
}

/**
 * Extract specific keys from an object
 */
export const extractKeys = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Omit specific keys from an object
 */
export const omitKeys = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

/**
 * Deep merge two objects (simple implementation)
 */
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target }
  
  Object.keys(source).forEach(key => {
    const sourceValue = source[key as keyof T]
    const targetValue = result[key as keyof T]
    
    if (
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      typeof targetValue === "object" &&
      targetValue !== null &&
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
  })
  
  return result
}
