# Workplan: Create Mock Implementations for Refine Module Tests

## Task ID
TEST-PredRefine-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `Refine` module tests. This includes mock underlying modules, mock reward functions, and mock `Prediction` objects.

## Proposed Implementation
- Review the converted `Refine` module tests from `TEST-PredRefine-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Underlying Module**: A simple `Module` (e.g., a mock `Predict`) that can be configured to return a list of different `Prediction` objects over successive calls, or to simulate failures. Its `forward` method should also accept feedback/previous outputs.
    - **Mock Reward Function**: A function that takes `(example: Example, prediction: Prediction)` and returns a score (number). This should be configurable.
    - **Mock Prediction Objects**: Helper to create `Prediction` instances.
- Place mocks in `tests/utils/mocks/` or alongside `Refine.test.ts`.

## Components Involved
- `tests/predict/Refine.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Prediction`, and reward functions.

## Dependencies
- `TEST-PredRefine-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Prediction`, `Example` class structures.

## Implementation Checklist
- [ ] Create `MockRefinableModule` (or similar):
    - Constructor accepts a list of `Prediction[]` (responses for N calls).
    - `forward` method cycles through these responses, potentially using feedback args, or simulates errors.
- [ ] Create `mockRewardFunction(scoringLogic: (pred: Prediction) => number)`:
    - Takes a function that defines how to score a prediction.
    - Returns a function compatible with `Refine`'s `reward_fn` parameter.
- [ ] Create helper `createMockPredictionWithValue(value: any, fieldName: string = "answer")`.
- [ ] Integrate these mocks into `Refine.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `Refine` module test code.
- Tests using mocks correctly isolate the `Refine` logic.
- Mocks accurately simulate the behavior of underlying modules and reward functions.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Final API of `Module.forward` (especially how feedback is passed) and `Prediction`.

### Non-blocking
- Mocks can be refined as the actual `Refine` module is implemented.

## Acceptable Tradeoffs
- Initial mock modules can have simple, predefined sequences of responses.

## Status
Not Started

## Notes
Well-designed mocks are crucial for testing the iterative refinement logic of `Refine`.
For broader context, see [Epic Overview: Refine Module Tests Conversion (TEST-PredictRefineTests)](../../docs/planning/workplans/TEST-PredictRefineTests.md).