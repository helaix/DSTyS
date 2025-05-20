# Workplan: Ensure Signature Test Compatibility

## Task ID
CORE-SigImpl-07-TestCompatibility

## Problem Statement
Ensure that the TypeScript implementation of the `Signature` class and its functionalities (field management, creation utilities, Zod/Effect integration, metadata) is fully compatible with the ported Python DSPy tests for `Signature`.

## Proposed Implementation
- Systematically execute all tests from `TEST-SigTests` (the workplan for converting Python `Signature` tests) against the implemented TypeScript `Signature` class.
- For each failing test:
    - Analyze the failure: is it an issue in the TypeScript `Signature` implementation, its interaction with `Field`, or an incorrect/incompatible test conversion?
    - Debug and fix the relevant TypeScript implementation if it's a bug.
    - Update the test case if the test logic was flawed or incompatible, ensuring it still captures the original intent of the Python test.
- Iterate until all ported tests pass.
- Pay special attention to tests involving class-based signature definitions, string parsing with type annotations, and signature manipulation methods.
- Testing: This task is primarily about executing and verifying the full suite of ported tests.

## Components Involved
- `source/signatures/Signature.ts`
- Interactions with `Field.ts`.
- All test files under `tests/signatures/Signature.test.ts` (or equivalent path).

## Dependencies
- All preceding `CORE-SigImpl-*` tasks (01 through 06).
- `CORE-FieldImplementation` epic completed.
- All granular workplans under `TEST-SigTests` must be completed (i.e., tests converted).

## Implementation Checklist
- [ ] Set up the test environment to run `TEST-SigTests` against the TypeScript `Signature` implementation.
- [ ] Execute all converted `Signature` tests.
- [ ] For each failing test:
    - [ ] Identify the root cause.
    - [ ] Fix `Signature.ts` or `Field.ts` if it's an implementation bug.
    - [ ] Adjust the test case in `*.test.ts` if the test logic was flawed, ensuring it still validates Python DSPy behavior.
- [ ] Re-run tests until all pass.
- [ ] Document any significant deviations from Python DSPy `Signature` behavior that were necessary and confirmed by passing tests.

## Verification Steps
- All tests in the `TEST-SigTests` suite pass successfully.
- Test coverage for `Signature.ts` meets project standards (e.g., >90%).
- Any intentional deviations from Python DSPy's `Signature` behavior are documented.

## Decision Authority
- Independent: Debugging and fixing implementation bugs. Minor adjustments to test logic.
- User Input: Decisions on significant behavioral deviations if Python's dynamic metaclass patterns for Signatures prove very difficult to replicate with full type safety in TypeScript.

## Questions/Uncertainties
### Blocking
- Ensuring the chosen TypeScript pattern for class-based signatures (e.g., extending a base class, using decorators) behaves compatibly with Python tests designed around metaclasses.

### Non-blocking
- Differences in error reporting details between Python and TypeScript/Effect versions of validation.

## Acceptable Tradeoffs
- The syntax for class-based signatures in TypeScript might be more explicit or verbose than Python's to achieve type safety, and tests might need to reflect this.

## Status
Not Started

## Notes
This validation step is crucial for confirming that `Signature`s behave as expected and form a reliable basis for module contracts.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).