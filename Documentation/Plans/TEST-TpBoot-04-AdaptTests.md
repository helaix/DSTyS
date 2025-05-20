# Workplan: Adapt BootstrapFewShot Tests for TypeScript & Effect

## Task ID
TEST-TpBoot-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `BootstrapFewShot` optimizer tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if module compilation or execution is effectful.

## Proposed Implementation
- For each placeholder test in `tests/teleprompt/BootstrapFewShot.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock student/teacher modules, trainsets, metrics, LM responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `compile` or underlying module calls are Effectful, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/teleprompt/BootstrapFewShot.test.ts`.
- TypeScript, Vitest, Effect.
- Mock `Module`, `Predict`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpBoot-03-CreateTSFiles` (Placeholder test files).
- `TEST-TpBoot-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `BootstrapFewShot`, `Module`, `Predict`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `BootstrapFewShot.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `BootstrapFewShot` instances with mock metrics and configurations.
    - Create mock student and teacher `Module` instances.
    - Create mock trainsets and valsets (`Example[]`).
    - Mock LM responses for teacher module predictions.
    - Call `optimizer.compile(student, teacher, trainset, valset)`.
    - Assert properties of the compiled student (e.g., `compiledStudent.predictor.demos`).
    - Assert metric scores if applicable.
- [ ] Test scenarios:
    - Basic compilation.
    - Effectiveness of generated demos.
    - Error handling during compilation.
    - Usage of validation set.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `BootstrapFewShot` tests should initially fail.
- Test logic should be clear and target intended optimizer behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or optimizer logic if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `BootstrapFewShot.compile` and how it interacts with student/teacher modules.
- How metrics are defined and evaluated.

### Non-blocking
- Specific error types for compilation failures.

## Acceptable Tradeoffs
- Initial tests might use very simple student/teacher modules and metrics.

## Status
Not Started

## Notes
This is the core test conversion for the `BootstrapFewShot` optimizer.
For broader context, see [Epic Overview: BootstrapFewShot Optimizer Tests Conversion (TEST-TelepromptBootstrapTests)](../../docs/planning/workplans/TEST-TelepromptBootstrapTests.md).