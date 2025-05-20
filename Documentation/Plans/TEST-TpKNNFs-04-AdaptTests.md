# Workplan: Adapt KNNFewShot Optimizer Tests for TypeScript & Effect

## Task ID
TEST-TpKNNFs-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `KNNFewShot` optimizer tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if module compilation or execution is effectful.

## Proposed Implementation
- For each placeholder test in `tests/teleprompt/KNNFewShot.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock student/teacher modules, trainsets, vectorizers, KNN predictors) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `compile` or underlying module calls are Effectful, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/teleprompt/KNNFewShot.test.ts`.
- TypeScript, Vitest, Effect.
- Mock `Module`, `Predict`, `Example`, `Embedder`, `KNN`.

## Dependencies
- `TEST-TpKNNFs-03-CreateTSFiles` (Placeholder test files).
- `TEST-TpKNNFs-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `KNNFewShot`, `Module`, `Predict`, `Example`, `Embedder`, `KNN` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `KNNFewShot.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `KNNFewShot` instances with mock KNN predictors, vectorizers, and configurations.
    - Create mock student and teacher `Module` instances.
    - Create mock trainsets (`Example[]`).
    - Call `optimizer.compile(student, teacher, trainset)`.
    - Assert properties of the compiled student (e.g., `compiledStudent.predictor.demos` selected by KNN).
- [ ] Test scenarios:
    - Basic compilation.
    - Correct demo selection based on KNN.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `KNNFewShot` tests should initially fail.
- Test logic should be clear and target intended optimizer behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or optimizer logic if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `KNNFewShot.compile` and its interaction with `KNN` and `BootstrapFewShot`.

### Non-blocking
- Specific error types for compilation failures.

## Acceptable Tradeoffs
- Initial tests might use very simple student/teacher modules and KNN predictors.

## Status
Not Started

## Notes
This is the core test conversion for the `KNNFewShot` optimizer.
For broader context, see [Epic Overview: KNNFewShot Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptKNNFewShotTests.md).