# Workplan: Adapt BootstrapFinetune Tests for TypeScript & Effect

## Task ID
TEST-TpFinetune-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `BootstrapFinetune` optimizer tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if module compilation or LM finetuning calls are effectful.

## Proposed Implementation
- For each placeholder test in `tests/teleprompt/BootstrapFinetune.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock student/teacher modules, trainsets, metrics, mock LM finetuning API responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `compile` or underlying LM finetuning calls are Effectful, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/teleprompt/BootstrapFinetune.test.ts`.
- TypeScript, Vitest, Effect.
- Mock `Module`, `Predict`, `Example`, metric functions, `LM` (with finetuning mocks).

## Dependencies
- `TEST-TpFinetune-03-CreateTSFiles` (Placeholder test files).
- `TEST-TpFinetune-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `BootstrapFinetune`, `Module`, `Predict`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `BootstrapFinetune.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `BootstrapFinetune` instances with mock metrics and configurations.
    - Create mock student and teacher `Module` instances.
    - Create mock trainsets (`Example[]`).
    - Mock LM finetuning API calls (e.g., to simulate job creation, status updates, completion).
    - Call `optimizer.compile(student, teacher, trainset)`.
    - Assert properties of the compiled student (e.g., if it uses a finetuned model ID).
    - Assert metric scores if applicable.
- [ ] Test scenarios:
    - Data preparation for finetuning.
    - Successful finetuning call simulation.
    - Evaluation of the "finetuned" student module.
    - Error handling during the finetuning process.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `BootstrapFinetune` tests should initially fail.
- Test logic should be clear and target intended optimizer behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or optimizer logic if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `BootstrapFinetune.compile` and how it interacts with LM finetuning services.
- How metrics are defined and evaluated.

### Non-blocking
- Specific error types for finetuning failures.

## Acceptable Tradeoffs
- Initial tests might heavily mock the finetuning API calls, focusing on data flow and optimizer logic.

## Status
Not Started

## Notes
This is the core test conversion for the `BootstrapFinetune` optimizer.
For broader context, see [Epic Overview: BootstrapFinetune Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptFinetuneTests.md).
# Workplan: Adapt BootstrapFinetune Tests for TypeScript & Effect

## Task ID
TEST-TpFinetune-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `BootstrapFinetune` optimizer tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if module compilation or LM finetuning calls are effectful.

## Proposed Implementation
- For each placeholder test in `tests/teleprompt/BootstrapFinetune.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock student/teacher modules, trainsets, metrics, mock LM finetuning API responses) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - If `compile` or underlying LM finetuning calls are Effectful, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/teleprompt/BootstrapFinetune.test.ts`.
- TypeScript, Vitest, Effect.
- Mock `Module`, `Predict`, `Example`, metric functions, `LM` (with finetuning mocks).

## Dependencies
- `TEST-TpFinetune-03-CreateTSFiles` (Placeholder test files).
- `TEST-TpFinetune-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `BootstrapFinetune`, `Module`, `Predict`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `BootstrapFinetune.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `BootstrapFinetune` instances with mock metrics and configurations.
    - Create mock student and teacher `Module` instances.
    - Create mock trainsets (`Example[]`).
    - Mock LM finetuning API calls (e.g., to simulate job creation, status updates, completion).
    - Call `optimizer.compile(student, teacher, trainset)`.
    - Assert properties of the compiled student (e.g., if it uses a finetuned model ID).
    - Assert metric scores if applicable.
- [ ] Test scenarios:
    - Data preparation for finetuning.
    - Successful finetuning call simulation.
    - Evaluation of the "finetuned" student module.
    - Error handling during the finetuning process.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `BootstrapFinetune` tests should initially fail.
- Test logic should be clear and target intended optimizer behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or optimizer logic if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `BootstrapFinetune.compile` and how it interacts with LM finetuning services.
- How metrics are defined and evaluated.

### Non-blocking
- Specific error types for finetuning failures.

## Acceptable Tradeoffs
- Initial tests might heavily mock the finetuning API calls, focusing on data flow and optimizer logic.

## Status
Not Started

## Notes
This is the core test conversion for the `BootstrapFinetune` optimizer.
For broader context, see [Epic Overview: BootstrapFinetune Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptFinetuneTests.md).