# Workplan: Deepen Effect Integration for Tool Execution Flow

## Task ID
CORE-ToolImpl-05-EffectIntegration

## Problem Statement
Ensure the entire lifecycle of tool interaction, from argument validation to function execution and result/error propagation, is managed within the Effect-TS paradigm. This builds upon basic error handling to make tool usage fully composable with other Effect-based operations in DSTyS.

## Proposed Implementation
- Review the `Tool.execute()` method to ensure it's a pure Effect pipeline.
- The flow should be:
    1. Start with `Effect.succeed(rawArgs)`.
    2. Pipe through an Effectful validation step: `Effect.flatMap(validatedArgs => ...)` using the Zod schema. This step would return `Effect.fail(new ArgumentValidationError(...))` if validation fails.
    3. Pipe through an Effectful execution step: `Effect.flatMap(parsedArgs => Effect.tryPromise({ try: () => this.func(parsedArgs)... }))`.
- This ensures that if any step fails, the entire chain short-circuits and propagates the error within the Effect context.
- This approach makes the `execute` method more declarative and aligns with functional programming principles.
- Testing: Refine existing tests for `execute` to ensure they cover the full Effect pipeline, including how errors from different stages (validation, execution) are handled and propagated.

## Components Involved
- `source/primitives/Tool.ts`
- Effect library

## Dependencies
- `CORE-ToolImpl-02-Execution` (Basic execution logic)
- `CORE-ToolImpl-03-ArgParsing` (Argument validation logic)
- `CORE-ToolImpl-04-ErrorHandling` (Defined error types)

## Implementation Checklist
- [ ] Refactor `Tool.execute(rawArgs: Record<string, any>)` to be an Effect pipeline:
    ```typescript
    // Pseudocode structure
    Effect.succeed(rawArgs)
      .pipe(Effect.flatMap(args => {
        // Validate args using Zod schema (this.inputSchema)
        // If valid, Effect.succeed(parsedArgs)
        // If invalid, Effect.fail(new ArgumentValidationError(...))
      }))
      .pipe(Effect.flatMap(parsedArgs => {
        // Execute this.func(parsedArgs)
        // If sync: Effect.try({ try: () => this.func(parsedArgs), catch: e => new ToolExecutionError(e) })
        // If async: Effect.tryPromise({ try: () => this.func(parsedArgs), catch: e => new ToolExecutionError(e) })
      }))
    ```
- [ ] Ensure type parameters for `Effect.Effect<SuccessType, ErrorType>` are accurate throughout the pipeline.
- [ ] Write/refine unit tests to verify the behavior of this Effect pipeline, especially around error short-circuiting and propagation.

## Verification Steps
- Run unit tests for `Tool.ts`, specifically testing the `execute` method's Effect pipeline.
- Confirm that argument validation errors prevent function execution.
- Confirm that function execution errors are caught and propagated correctly.
- Ensure the success path works as expected.
- Code review for idiomatic Effect-TS usage.

## Decision Authority
- Independent: Specific Effect combinators used.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None, this is a refactoring task to align with Effect best practices.

### Non-blocking
- None.

## Acceptable Tradeoffs
- None identified.

## Status
Not Started

## Notes
This refactoring will make `Tool.execute` more robust and easier to integrate into larger Effect-based workflows within agentic modules.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).