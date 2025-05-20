# Workplan: Adapt GRPO Optimizer Tests for TypeScript & Effect

## Task ID
TEST-TpGRPO-04-AdaptTests

## Problem Statement
Convert Python `GRPO` optimizer test logic into TypeScript/Vitest placeholders, adapting for static typing and Effect TS patterns.

## Proposed Implementation
- For each placeholder test in `GRPO.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock student/teacher modules, trainsets, metrics, LM responses.
    - Test `optimizer.compile(...)`.
    - Test dataset shuffling and sampling logic.
    - Test reinforcement steps if applicable.
    - If Effectful, use `Effect.runPromiseExit` or helpers.
- Ensure type safety.

## Components Involved
- `tests/teleprompt/GRPO.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for `Module`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpGRPO-03-CreateTSFiles`.
- `TEST-TpGRPO-05-CreateMocks`.
- Core DSTyS `GRPO`, `Module`, `Predict`, `Example`, `LM` structures.

## Implementation Checklist
- [ ] Iterate through `GRPO.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up `GRPO` instances with mock metrics, configurations.
    - Create mock student/teacher modules, trainsets.
    - Mock LM responses for any internal LM calls by GRPO.
    - Call `optimizer.compile(...)`.
    - Assert properties of the compiled student or optimizer state.
- [ ] Test dataset shuffling logic.
- [ ] Test reinforcement learning steps (e.g., reward calculation, policy updates if simulated).
- [ ] For effectful operations, test success/failure paths.

## Verification Steps
- Converted `GRPO` tests initially fail.
- Test logic is clear and targets intended optimizer behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- The exact API of `GRPO.compile` and its internal mechanisms.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might use simplified simulations of the RL loop.

## Status
Not Started

## Notes
Core test conversion for `GRPO`.
For broader context, see [Epic Overview: GRPO Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptGRPOTests.md).
# Workplan: Adapt GRPO Optimizer Tests for TypeScript & Effect

## Task ID
TEST-TpGRPO-04-AdaptTests

## Problem Statement
Convert Python `GRPO` optimizer test logic into TypeScript/Vitest placeholders, adapting for static typing and Effect TS patterns.

## Proposed Implementation
- For each placeholder test in `GRPO.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock student/teacher modules, trainsets, metrics, LM responses.
    - Test `optimizer.compile(...)`.
    - Test dataset shuffling and sampling logic.
    - Test reinforcement steps if applicable.
    - If Effectful, use `Effect.runPromiseExit` or helpers.
- Ensure type safety.

## Components Involved
- `tests/teleprompt/GRPO.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for `Module`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpGRPO-03-CreateTSFiles`.
- `TEST-TpGRPO-05-CreateMocks`.
- Core DSTyS `GRPO`, `Module`, `Predict`, `Example`, `LM` structures.

## Implementation Checklist
- [ ] Iterate through `GRPO.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up `GRPO` instances with mock metrics, configurations.
    - Create mock student/teacher modules, trainsets.
    - Mock LM responses for any internal LM calls by GRPO.
    - Call `optimizer.compile(...)`.
    - Assert properties of the compiled student or optimizer state.
- [ ] Test dataset shuffling logic.
- [ ] Test reinforcement learning steps (e.g., reward calculation, policy updates if simulated).
- [ ] For effectful operations, test success/failure paths.

## Verification Steps
- Converted `GRPO` tests initially fail.
- Test logic is clear and targets intended optimizer behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- The exact API of `GRPO.compile` and its internal mechanisms.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might use simplified simulations of the RL loop.

## Status
Not Started

## Notes
Core test conversion for `GRPO`.
For broader context, see [Epic Overview: GRPO Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptGRPOTests.md).