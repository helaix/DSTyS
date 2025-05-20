# Workplan: Tool Error Handling

## Task ID
CORE-ToolImpl-04-ErrorHandling

## Problem Statement
Define and implement a structured error handling mechanism for `Tool` operations using the Effect library. This includes errors from argument validation and errors occurring during the execution of the wrapped user function.

## Proposed Implementation
- Define specific error types for `Tool` operations using `Data.TaggedError`:
    - `ArgumentValidationError extends Data.TaggedError<{ fieldErrors: Record<string, string[]> }>`: For errors when validating arguments against the tool's input schema. `fieldErrors` can capture Zod's detailed error messages.
    - `ToolExecutionError extends Data.TaggedError<{ cause: unknown }>`: For errors thrown by the wrapped user function during its execution (both sync and async).
    - These can be part of a general `ToolError` union type.
- The `Tool.execute()` method will return `Effect.Effect<any, ToolError>`.
    - If argument validation (using Zod schema) fails, `execute()` returns `Effect.fail(new ArgumentValidationError(...))`.
    - If the wrapped function throws an error (sync) or its promise rejects (async), `execute()` catches this and returns `Effect.fail(new ToolExecutionError({ cause: originalError }))`.
- Testing: Write unit tests to ensure that different failure scenarios correctly result in `Effect.fail` with the appropriate tagged error and payload.

## Components Involved
- `source/primitives/Tool.ts`
- Effect library (`Effect`, `Data.TaggedError`)
- Zod library (for providing error details to `ArgumentValidationError`)

## Dependencies
- `CORE-ToolImpl-01-ClassDef` (Tool class definition)

## Implementation Checklist
- [ ] Define `ArgumentValidationError` using `Data.TaggedError`.
    - Include a property to store detailed validation issues (e.g., from Zod).
- [ ] Define `ToolExecutionError` using `Data.TaggedError`.
    - Include a `cause` property to store the original exception/error.
- [ ] Define a union type `ToolError = ArgumentValidationError | ToolExecutionError`.
- [ ] Ensure `Tool.execute()` method's return type is `Effect.Effect<any, ToolError>`.
- [ ] In `Tool.execute()`:
    - After Zod `safeParse` on arguments, if `!result.success`, map `result.error.flatten()` to `ArgumentValidationError` and `Effect.fail`.
    - Wrap synchronous function calls in `Effect.try({ try: ..., catch: (e) => new ToolExecutionError({ cause: e }) })`.
    - Wrap asynchronous function calls in `Effect.tryPromise({ try: ..., catch: (e) => new ToolExecutionError({ cause: e }) })`.
- [ ] Write unit tests for error handling:
    - Test `execute` with arguments that fail Zod validation; verify `ArgumentValidationError`.
    - Test `execute` with a sync function that throws; verify `ToolExecutionError`.
    - Test `execute` with an async function that rejects; verify `ToolExecutionError`.

## Verification Steps
- Run unit tests for `Tool.ts` focusing on error handling.
- Confirm that argument validation failures produce `ArgumentValidationError` within an `Effect.Failure`.
- Confirm that exceptions from wrapped functions (both sync and async) produce `ToolExecutionError` within an `Effect.Failure`.
- Verify that error objects contain useful diagnostic information (e.g., Zod issues, original exception).

## Decision Authority
- Independent: Specific properties and structure of the custom error types.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Ensuring the `cause` in `ToolExecutionError` is preserved and accessible in a type-safe way.

## Acceptable Tradeoffs
- None identified; robust error handling is key.

## Status
Not Started

## Notes
Structured, Effect-based error handling makes tool failures predictable and easier to manage in agentic loops.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).