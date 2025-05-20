# Workplan: Create Mock Implementations for Predict Module Tests

## Task ID
TEST-PredMod-05-CreateMocks

## Problem Statement
Develop mock implementations for dependencies of `Predict` module tests, such as `Signature`, `LM`, `Adapter`, and `Example` objects.

## Proposed Implementation
- Create mock versions of:
    - `Signature`: With configurable input/output fields (Zod-based) and instructions.
    - `LM`: `DummyLM` or mock that returns predefined `Prediction` objects or raw completions.
    - `Adapter`: Mock `ChatAdapter` or `JSONAdapter` that can format prompts and parse mock LM responses.
    - `Example`: Simple mock `Example` data for demos.
- Place mocks in `tests/utils/mocks/` or alongside `Predict.test.ts`.

## Components Involved
- `tests/utils/mocks/`.
- `tests/predict/Predict.test.ts`.
- Mocks for `Signature`, `LM`, `Adapter`, `Example`.

## Dependencies
- `TEST-PredMod-04-AdaptTests`.
- Interfaces/base classes for dependencies.

## Implementation Checklist
- [ ] Create `mockSignatureForPredict(ioDef: string, instructions?: string)` utility.
- [ ] Enhance `MockLM` or `DummyLM`:
    - To return specific `Prediction` objects or raw strings based on input prompt/messages.
- [ ] Create `MockAdapter`:
    - `format` method returns a simple prompt string.
    - `parse` method converts a string to a `Prediction` object.
- [ ] Create `mockExampleForPredict(inputs: {}, outputs: {})`.
- [ ] Integrate mocks into `Predict.test.ts`.

## Verification Steps
- Mocks simplify `Predict` test setup.
- Mocks accurately simulate dependency behavior.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- Final APIs of `Signature`, `LM`, `Adapter`.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Mocks can start simple.

## Status
Not Started

## Notes
Good mocks are essential for testing `Predict`'s logic.
For broader context, see [Epic Overview: Predict Module Tests Conversion](../../docs/planning/workplans/TEST-PredictModuleTests.md).