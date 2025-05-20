# Workplan: Adapt TwoStep Adapter Tests for TypeScript & Effect

## Task ID
TEST-AdTwoStp-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `TwoStepAdapter` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for any effectful operations.

## Proposed Implementation
- For each placeholder test in `tests/adapters/TwoStepAdapter.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures, Examples, mock main LM, mock extraction LM) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `TwoStepAdapter` methods return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/adapters/TwoStepAdapter.test.ts`.
- TypeScript, Vitest, Effect.
- Mock implementations for `Signature`, `LM`, `Example`.

## Dependencies
- `TEST-AdTwoStp-03-CreateTSFiles` (Placeholder test files).
- `TEST-AdTwoStp-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS primitive interfaces/classes (`Signature`, `LM`, `Example`).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `TwoStepAdapter.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `TwoStepAdapter` instances with mock main and extraction LMs.
    - Create mock `Signature` and `Example` data.
    - Call `TwoStepAdapter` methods (`format`, `parse`, `__call__`).
- [ ] Test the interaction between the main generation step and the extraction step.
- [ ] Verify that the internal signature for extraction is correctly created and used.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `TwoStepAdapter` tests should initially fail.
- Test logic should be clear and target intended `TwoStepAdapter` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How the two LMs (main and extraction) are configured and managed by `TwoStepAdapter`.
- How the internal extraction signature is derived from the original signature.

### Non-blocking
- Specific error types for failures in either step.

## Acceptable Tradeoffs
- Initial tests might use simplified mock LMs, with more complex response simulations added later.

## Status
Not Started

## Notes
This is the core test conversion for the TwoStep Adapter component.
For broader context, see [Epic Overview: TwoStep Adapter Tests Conversion (TEST-AdaptersTwoStepTests)](../../docs/planning/workplans/TEST-AdaptersTwoStepTests.md).