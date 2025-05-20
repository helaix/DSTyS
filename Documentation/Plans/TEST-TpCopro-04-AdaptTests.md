# Workplan: Adapt COPRO Optimizer Tests for TypeScript & Effect

## Task ID
TEST-TpCopro-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `COPRO` optimizer tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if module compilation or execution is effectful.

## Proposed Implementation
- For each placeholder test in `tests/teleprompt/COPRO.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock student modules, prompt models, trainsets, metrics, LM responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `compile` or underlying module calls are Effectful, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/teleprompt/COPRO.test.ts`.
- TypeScript, Vitest, Effect.
- Mock `Module`, `Predict`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpCopro-03-CreateTSFiles` (Placeholder test files).
- `TEST-TpCopro-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `COPRO`, `Module`, `Predict`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `COPRO.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `COPRO` instances with mock metrics, prompt models, and configurations.
    - Create mock student `Module` instances.
    - Create mock trainsets (`Example[]`).
    - Mock LM responses for the prompt model (instruction/prefix generation).
    - Call `optimizer.compile(student, trainset, eval_kwargs)`.
    - Assert properties of the optimized student (e.g., `optimizedStudent.predictor.signature.instructions`).
    - Assert statistics if `track_stats` is enabled.
- [ ] Test scenarios:
    - Basic compilation and instruction optimization.
    - Output verification of the optimized student.
    - Statistics tracking.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `COPRO` tests should initially fail.
- Test logic should be clear and target intended optimizer behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or optimizer logic if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `COPRO.compile` and its internal instruction generation modules.
- How metrics are defined and evaluated.

### Non-blocking
- Specific error types for compilation failures.

## Acceptable Tradeoffs
- Initial tests might use very simple student modules and metrics.

## Status
Not Started

## Notes
This is the core test conversion for the `COPRO` optimizer.
For broader context, see [Epic Overview: COPRO Optimizer Tests Conversion (TEST-TelepromptCoproTests)](../../docs/planning/workplans/TEST-TelepromptCoproTests.md).