# DSPy Core Primitive Types - Effect Schema Implementation

This module provides comprehensive Effect Schema types for the core DSPy primitives that form the foundation of the entire DSTyS system. These schemas provide both compile-time TypeScript types and runtime validation.

## Overview

The schemas are designed to represent the three core DSPy primitives:

- **Example**: Data storage with input keys and metadata
- **Prediction**: Completions with reasoning and confidence
- **Signature**: Field definitions with instructions and metadata

All schemas provide:
- ✅ Compile-time TypeScript type safety
- ✅ Runtime validation with clear error messages
- ✅ Serialization/deserialization support
- ✅ Type guards and utility functions
- ✅ Comprehensive test coverage

## Core Schemas

### Example Schema

Represents a DSPy Example with data, input keys, and metadata.

```typescript
import { ExampleSchema, createExample, validateExample } from './schemas'

// Create an example
const example = createExample(
  { question: "What is the capital of France?", answer: "Paris" },
  ["question"],
  { source: "geography_dataset", tags: ["geography", "capitals"] }
)

// Validate data
const result = await Effect.runPromise(validateExample(unknownData))
```

**Schema Structure:**
- `data`: Record<string, unknown> - The actual data
- `inputKeys`: string[] (optional) - Keys that represent inputs
- `metadata`: ExampleMetadata (optional) - Additional metadata

### Prediction Schema

Represents a DSPy Prediction with completions, reasoning, and confidence.

```typescript
import { PredictionSchema, createPrediction, validatePrediction } from './schemas'

// Create a prediction
const prediction = createPrediction(
  [{ answer: "Paris", confidence: 0.95 }],
  { text: "France is a country in Europe, so its capital is Paris", confidence: 0.9 },
  { score: 0.92, method: "ensemble" }
)

// Validate data
const result = await Effect.runPromise(validatePrediction(unknownData))
```

**Schema Structure:**
- `completions`: Completion[] - Array of completions/responses
- `reasoning`: Reasoning (optional) - Chain-of-thought or explanation
- `confidence`: Confidence (optional) - Confidence scores and metadata
- `aggregation`: AggregationMetadata (optional) - Info about aggregated predictions
- `metadata`: Record<string, unknown> (optional) - General metadata
- `timestamp`: string (optional) - ISO timestamp

### Signature Schema

Represents a DSPy Signature with input/output fields, instructions, and metadata.

```typescript
import { 
  SignatureSchema, 
  createSignature, 
  createInputField, 
  createOutputField,
  validateSignature 
} from './schemas'

// Create fields
const inputField = createInputField("question", "User question", { type: "string", required: true })
const outputField = createOutputField("answer", "Generated answer", { type: "string", minLength: 1 })

// Create signature
const signature = createSignature(
  [inputField],
  [outputField],
  { main: "Answer the question based on your knowledge" }
)

// Validate data
const result = await Effect.runPromise(validateSignature(unknownData))
```

**Schema Structure:**
- `inputFields`: InputField[] - Input field definitions
- `outputFields`: OutputField[] - Output field definitions  
- `instructions`: SignatureInstructions - How to use the signature
- `metadata`: SignatureMetadata (optional) - Additional metadata

## Utility Functions

### Validation Helpers

```typescript
import { validateToEither, validateOrThrow, validateSafe } from './schemas/utils'

// Convert to Either for functional error handling
const result = validateToEither(ExampleSchema, data)
if (Either.isRight(result)) {
  console.log("Valid:", result.right)
} else {
  console.log("Error:", result.left)
}

// Throw on validation error
try {
  const validated = validateOrThrow(ExampleSchema, data)
  // Use validated data
} catch (error) {
  // Handle validation error
}

// Safe validation (returns undefined on error)
const validated = validateSafe(ExampleSchema, data)
if (validated) {
  // Use validated data
}
```

### Batch Validation

```typescript
import { validateBatch } from './schemas/utils'

const results = validateBatch(ExampleSchema, [data1, data2, data3])
if (Either.isRight(results)) {
  console.log("All valid:", results.right)
} else {
  console.log("Errors:", results.left) // Array of { index, error }
}
```

### Serialization

```typescript
import { safeJsonStringify, safeJsonParse, testRoundTrip } from './schemas/utils'

// Safe JSON serialization
const jsonResult = safeJsonStringify(ExampleSchema, example)
if (Either.isRight(jsonResult)) {
  const json = jsonResult.right
  
  // Safe JSON parsing
  const parseResult = safeJsonParse(ExampleSchema, json)
  if (Either.isRight(parseResult)) {
    const parsed = parseResult.right
  }
}

// Test round-trip serialization
const roundTripResult = testRoundTrip(ExampleSchema, example)
```

### Type Guards

```typescript
import { isExample, isPrediction, isSignature } from './schemas'

if (isExample(unknownData)) {
  // TypeScript knows this is an Example
  console.log(unknownData.data)
}

if (isPrediction(unknownData)) {
  // TypeScript knows this is a Prediction
  console.log(unknownData.completions)
}
```

### Schema Composition

```typescript
import { makeOptional, makeArray, makeNullable } from './schemas/utils'

// Make any schema optional
const optionalExample = makeOptional(ExampleSchema)

// Make any schema an array
const exampleArray = makeArray(ExampleSchema)

// Make any schema nullable
const nullableExample = makeNullable(ExampleSchema)
```

## Error Handling

The schemas provide comprehensive error handling with custom error types:

```typescript
import { 
  DSPyValidationError, 
  DSPySchemaError, 
  DSPyCompositionError,
  createValidationError 
} from './schemas/utils'

try {
  const result = validateOrThrow(ExampleSchema, invalidData)
} catch (error) {
  if (error instanceof DSPyValidationError) {
    console.log("Validation failed:", error.message)
    console.log("Field:", error.field)
    console.log("Value:", error.value)
  }
}
```

## Advanced Usage

### Custom Validation Context

```typescript
import { withValidationContext } from './schemas/utils'

const validator = Schema.decodeUnknown(ExampleSchema)
const contextValidator = withValidationContext(validator, "User input validation")

// Errors will include the context in the message
```

### Object Utilities

```typescript
import { hasRequiredKeys, extractKeys, omitKeys, deepMerge } from './schemas/utils'

// Check if object has required keys
if (hasRequiredKeys(obj, ["name", "age"])) {
  // Object has both name and age properties
}

// Extract specific keys
const subset = extractKeys(obj, ["name", "email"])

// Omit specific keys  
const filtered = omitKeys(obj, ["password", "secret"])

// Deep merge objects
const merged = deepMerge(target, source)
```

## Testing

All schemas include comprehensive test suites covering:

- ✅ Valid data validation
- ✅ Invalid data rejection
- ✅ Edge cases and boundary conditions
- ✅ Serialization round-trips
- ✅ Type guard functionality
- ✅ Factory function behavior
- ✅ Utility function correctness

Run tests with:

```bash
npm test source/schemas/
```

## Integration

The schemas are automatically exported from the main package:

```typescript
// Import from main package
import { 
  ExampleSchema, 
  PredictionSchema, 
  SignatureSchema,
  createExample,
  createPrediction,
  createSignature
} from 'dstys'

// Or import directly from schemas
import { ExampleSchema } from 'dstys/schemas'
```

## Type Safety

All schemas provide full TypeScript type safety:

```typescript
import type { Example, Prediction, Signature } from 'dstys'

function processExample(example: Example) {
  // TypeScript knows the exact shape of example
  console.log(example.data) // Record<string, unknown>
  console.log(example.inputKeys) // string[] | undefined
  console.log(example.metadata) // ExampleMetadata | undefined
}

function processPrediction(prediction: Prediction) {
  // TypeScript knows the exact shape of prediction
  console.log(prediction.completions) // Completion[]
  console.log(prediction.reasoning) // Reasoning | undefined
  console.log(prediction.confidence) // Confidence | undefined
}
```

## Performance

The schemas are designed for performance:

- Lazy validation (only validates when needed)
- Efficient serialization/deserialization
- Minimal runtime overhead
- Tree-shakeable exports

## Extensibility

The schemas are designed to be extensible:

- Custom metadata fields support arbitrary data
- Schema composition utilities for building complex types
- Plugin-friendly architecture
- Forward-compatible design

## Best Practices

1. **Always validate external data** before using it in your application
2. **Use type guards** to safely check unknown data types
3. **Handle validation errors gracefully** with Either types or try/catch
4. **Leverage factory functions** for creating valid instances
5. **Test serialization round-trips** for data persistence
6. **Use batch validation** for processing multiple items efficiently

## Migration Guide

If migrating from plain TypeScript interfaces:

```typescript
// Before (plain interfaces)
interface Example {
  data: Record<string, unknown>
  inputKeys?: string[]
  metadata?: any
}

// After (Effect Schema)
import { ExampleSchema, type Example } from './schemas'

// Runtime validation now available
const validated = await Effect.runPromise(validateExample(data))
```

The schemas maintain backward compatibility with existing type definitions while adding runtime validation capabilities.

