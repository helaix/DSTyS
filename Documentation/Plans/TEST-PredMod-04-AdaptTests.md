# Workplan: Adapt Predict Module Tests for TypeScript & Effect

## Task ID
TEST-PredMod-04-AdaptTests

## Problem Statement
Convert Python `Predict` module test logic and assertions into the TypeScript/Vitest placeholders, adapting for static typing, Zod for signatures, and Effect TS patterns for LM calls.

## Proposed Implementation
- For each placeholder test in `Predict.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock `Signature` (with Zod fields), `LM`, `Adapter`, `Example` demos.
    - Test `Predict` instantiation.
    - Test `predictInstance(inputs)` or `predictInstance.forward(inputs)`.
        - If Effectful, use `Effect.runPromiseExit` or helpers.
    - Test demo formatting and inclusion in prompts.
    - Test multi-output behavior (`n > 1`).
    - Test `dump_state` and `load_state`.
- Ensure type safety.

## Components Involved
- `tests/predict/Predict.test.ts`.
- TypeScript, Vitest, Effect, Zod.
- Mocks for `Signature`, `LM`, `Adapter`, `Example`.

## Dependencies
- `TEST-PredMod-03-CreateTSFiles`.
- `TEST-PredMod-05-CreateMocks`.
- Core DSTyS `Predict`, `Signature`, `LM`, `Adapter`, `Example` implementations.

## Implementation Checklist
- [ ] Iterate through `Predict.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up `Predict` instances with mock Signatures, LMs, Adapters.
    - Test `__call__` / `forward` with various inputs and demo configurations.
    - Assert `Prediction` outputs.
    - Test `dump_state`/`load_state` for signature, demos, LM config.
    - Test `n > 1` for multiple completions.
- [ ] For effectful operations, test success/failure paths.

## Verification Steps
- Converted `Predict` tests initially fail.
- Test logic is clear and targets intended `Predict` behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How `Predict` uses Adapters and LMs in an Effectful way.
- How typed signatures (Zod-based) are handled.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Some dynamic Python signature manipulations might be tested differently.

## Status
Not Started

## Notes
This is the core test conversion for `Predict`.
For broader context, see [Epic Overview: Predict Module Tests Conversion](../../docs/planning/workplans/TEST-PredictModuleTests.md).