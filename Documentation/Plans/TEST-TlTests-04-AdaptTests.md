# Workplan: Adapt Tool Tests for TypeScript & Effect

## Task ID
TEST-TlTests-04-AdaptTests

## Problem Statement
Convert Python `Tool` test logic and assertions into the TypeScript/Vitest placeholders, adapting for static typing, Zod for argument schemas, and Effect TS patterns for execution and error handling.

## Proposed Implementation
- For each placeholder test in `Tool.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define tools with mock functions and explicit Zod `inputSchema`.
    - Test `tool.execute(args)`:
        - Use `Effect.runPromiseExit` or helpers to assert success/failure.
        - Test argument validation failures (should return `Effect.fail(ArgumentValidationError)`).
        - Test execution errors from wrapped function (should return `Effect.fail(ToolExecutionError)`).
        - Test successful execution for both sync and async wrapped functions.
    - Test `tool.getDefinition()` for correct JSON schema output.
- Ensure type safety.

## Components Involved
- `tests/primitives/Tool.test.ts`.
- TypeScript, Vitest, Effect, Zod.

## Dependencies
- `TEST-TlTests-03-CreateTSFiles`.
- `CORE-ToolImpl-01-ClassDef` (Initial `Tool` definition).
- `CORE-ToolImpl-03-ArgParsing` (Argument schema definition).
- `CORE-ToolImpl-04-ErrorHandling` (Error types).

## Implementation Checklist
- [ ] Iterate through `Tool.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
- [ ] Define mock functions (sync and async) to be wrapped by `Tool`.
- [ ] Define Zod schemas for tool arguments in tests.
- [ ] Test `Tool` instantiation with these functions and schemas.
- [ ] Test `tool.execute()`:
    - Valid arguments, sync function success.
    - Valid arguments, sync function error.
    - Valid arguments, async function success.
    - Valid arguments, async function error.
    - Invalid arguments (missing, wrong type).
- [ ] Test `tool.getDefinition()` output.

## Verification Steps
- Converted `Tool` tests initially fail against an incomplete `Tool` implementation.
- Test logic is clear and targets intended `Tool` behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How `Tool.execute` will handle sync/async functions and integrate Effect.
- How `Tool.inputSchema` is defined and used for validation.

### Non-blocking
- None.

## Acceptable Tradeoffs
- Tests will rely on explicit Zod schemas, unlike Python's introspection.

## Status
Not Started

## Notes
This is the core test conversion for `Tool`.
For broader context, see [Epic Overview: Tool Tests Conversion (TEST-ToolTests)](../../docs/planning/workplans/TEST-ToolTests.md).