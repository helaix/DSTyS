# Workplan: Adapt Chat Adapter Tests for TypeScript & Effect

## Task ID
TEST-AdChat-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `ChatAdapter` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for any adapter operations that are effectful.

## Proposed Implementation
- For each placeholder test in `tests/adapters/ChatAdapter.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures, Examples, LM responses) and expected outcomes in TypeScript.
    - Use `expect` assertions from Vitest.
    - If `ChatAdapter` methods (like `format` or `parse`) return `Effect` objects, use `Effect.runPromiseExit` or `@effect/vitest` helpers to test success and failure paths.
    - Ensure type safety in test code.

## Components Involved
- `tests/adapters/ChatAdapter.test.ts`.
- TypeScript, Vitest, Effect.
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdChat-03-CreateTSFiles` (Placeholder test files).
- `TEST-AdChat-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS primitive interfaces/classes (`Signature`, `LM`, `Example`).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `ChatAdapter.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `ChatAdapter` instances.
    - Create mock `Signature`, `LM`, and `Example` data.
    - Call `ChatAdapter` methods (`format`, `parse`, `__call__`).
    - Use `expect(...).toEqual(...)`, `expect(...).toThrow(...)` (or Effect error checks).
- [ ] For tests involving effectful operations:
    - Test success cases: `Effect.runPromiseExit(...)` should yield `Exit.Success` with the correct value.
    - Test failure cases: `Effect.runPromiseExit(...)` should yield `Exit.Failure` with the correct error tag.
- [ ] Ensure all tests are self-contained and do not rely on external state beyond mocks.

## Verification Steps
- All converted `ChatAdapter` tests should initially fail (as the implementation is not yet complete).
- Test logic should be clear and directly test the intended `ChatAdapter` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How `ChatAdapter` methods will be defined to integrate with Effect (e.g., return types of `format`, `parse`).

### Non-blocking
- Refinements to error messages or specific parsing/formatting details.

## Acceptable Tradeoffs
- Some tests might need to be marked as `.skip` or `.todo` if they depend on parts of `ChatAdapter` or its dependencies not yet designed/implemented.

## Status
Not Started

## Notes
This is the core task of test conversion for the Chat Adapter component.
For broader context, see [Epic Overview: Chat Adapter Tests Conversion (TEST-AdaptersChatTests)](../../docs/planning/workplans/TEST-AdaptersChatTests.md).
# Workplan: Adapt Chat Adapter Tests for TypeScript & Effect

## Task ID
TEST-AdChat-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `ChatAdapter` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for any adapter operations that are effectful.

## Proposed Implementation
- For each placeholder test in `tests/adapters/ChatAdapter.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures, Examples, LM responses) and expected outcomes in TypeScript.
    - Use `expect` assertions from Vitest.
    - If `ChatAdapter` methods (like `format` or `parse`) return `Effect` objects, use `Effect.runPromiseExit` or `@effect/vitest` helpers to test success and failure paths.
    - Ensure type safety in test code.

## Components Involved
- `tests/adapters/ChatAdapter.test.ts`.
- TypeScript, Vitest, Effect.
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdChat-03-CreateTSFiles` (Placeholder test files).
- `TEST-AdChat-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS primitive interfaces/classes (`Signature`, `LM`, `Example`).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `ChatAdapter.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `ChatAdapter` instances.
    - Create mock `Signature`, `LM`, and `Example` data.
    - Call `ChatAdapter` methods (`format`, `parse`, `__call__`).
    - Use `expect(...).toEqual(...)`, `expect(...).toThrow(...)` (or Effect error checks).
- [ ] For tests involving effectful operations:
    - Test success cases: `Effect.runPromiseExit(...)` should yield `Exit.Success` with the correct value.
    - Test failure cases: `Effect.runPromiseExit(...)` should yield `Exit.Failure` with the correct error tag.
- [ ] Ensure all tests are self-contained and do not rely on external state beyond mocks.

## Verification Steps
- All converted `ChatAdapter` tests should initially fail (as the implementation is not yet complete).
- Test logic should be clear and directly test the intended `ChatAdapter` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How `ChatAdapter` methods will be defined to integrate with Effect (e.g., return types of `format`, `parse`).

### Non-blocking
- Refinements to error messages or specific parsing/formatting details.

## Acceptable Tradeoffs
- Some tests might need to be marked as `.skip` or `.todo` if they depend on parts of `ChatAdapter` or its dependencies not yet designed/implemented.

## Status
Not Started

## Notes
This is the core task of test conversion for the Chat Adapter component.
For broader context, see [Epic Overview: Chat Adapter Tests Conversion (TEST-AdaptersChatTests)](../../docs/planning/workplans/TEST-AdaptersChatTests.md).