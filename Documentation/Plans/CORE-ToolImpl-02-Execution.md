# Workplan: Tool Execution Logic (Sync/Async)

## Task ID
CORE-ToolImpl-02-Execution

## Problem Statement
Implement the execution logic for `Tool` objects. This involves calling the wrapped user function with provided arguments, handling both synchronous and asynchronous functions, and integrating with Effect for managing the execution flow and errors.

## Proposed Implementation
- Add an `execute(...args: any[]): Effect.Effect<any, ToolError>` method to the `Tool` class.
- This method will:
    1. Validate the provided `args` against the tool's `inputSchema` (from `CORE-ToolImpl-03-ArgParsing`).
    2. If validation passes, call the wrapped `this.func` with the (potentially transformed/parsed) arguments.
    3. If `this.func` is synchronous:
        - Wrap its execution in `Effect.try()` to catch any exceptions.
        - Map successful results to `Effect.succeed()` and exceptions to `Effect.fail(new ToolExecutionError(...))`.
    4. If `this.func` is asynchronous (returns a Promise):
        - Wrap its execution in `Effect.tryPromise()` to handle promise resolution/rejection.
        - Map resolved values to `Effect.succeed()` and promise rejections to `Effect.fail(new ToolExecutionError(...))`.
- The `Tool` class might need a way to know if `this.func` is sync or async, or `Effect.try`/`Effect.tryPromise` might handle this transparently if `this.func` always returns a Promise when async. Standard practice is for async functions to be explicitly marked or return Promises.
- Testing: Test with both sync and async tool functions. Test successful execution and various failure modes (validation error, function throws sync error, async function rejects promise).

## Components Involved
- `source/primitives/Tool.ts`
- Effect library

## Dependencies
- `CORE-ToolImpl-01-ClassDef` (Tool class definition)
- `CORE-ToolImpl-03-ArgParsing` (for argument validation before execution)
- `CORE-ToolImpl-04-ErrorHandling` (for `ToolError` and its subtypes)

## Implementation Checklist
- [ ] Define the `execute` method signature on `Tool` to return `Effect.Effect<any, ToolError>`.
- [ ] Inside `execute`:
    - [ ] Perform argument validation using `this.inputSchema`. If fails, return `Effect.fail(new ArgumentValidationError(...))`.
    - [ ] Determine if `this.func` is synchronous or asynchronous.
        - One way: check `this.func.constructor.name === 'AsyncFunction'`.
    - [ ] If sync: use `Effect.try({ try: () => this.func(...args), catch: (e) => new ToolExecutionError({ cause: e }) })`.
    - [ ] If async: use `Effect.tryPromise({ try: () => this.func(...args), catch: (e) => new ToolExecutionError({ cause: e }) })`.
- [ ] Write unit tests for `execute`:
    - Test with a synchronous function that succeeds.
    - Test with a synchronous function that throws an error.
    - Test with an asynchronous function that resolves successfully.
    - Test with an asynchronous function that rejects.
    - Test with invalid arguments causing validation failure before function call.

## Verification Steps
- Run unit tests for `Tool.ts` focusing on the `execute` method.
- Confirm that both sync and async functions are handled correctly.
- Verify that successes are wrapped in `Effect.succeed` and all types of errors (validation, sync exception, async rejection) are caught and wrapped in `Effect.fail` with an appropriate `ToolError` subtype.

## Decision Authority
- Independent: Specific logic for distinguishing sync/async functions if needed.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Reliable way to distinguish sync vs. async functions if not explicitly declared by the user when creating the `Tool`. Standard JavaScript `async function` returns a Promise, which `Effect.tryPromise` handles. Regular functions do not.

### Non-blocking
- None.

## Acceptable Tradeoffs
- If distinguishing sync/async proves difficult, might initially require users to specify or only support async functions for simplicity, as sync functions can be easily wrapped in `Promise.resolve()`.

## Status
Not Started

## Notes
The `execute` method is the core operational part of a `Tool`. Its robustness and correct Effect integration are key.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).