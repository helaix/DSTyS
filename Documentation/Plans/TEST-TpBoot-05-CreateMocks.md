# Workplan: Create Mock Implementations for BootstrapFewShot Tests

## Task ID
TEST-TpBoot-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `BootstrapFewShot` optimizer tests. This includes mock student/teacher modules, trainsets, metric functions, and LM responses.

## Proposed Implementation
- Review the converted `BootstrapFewShot` tests from `TEST-TpBoot-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Student/Teacher Modules**: Simple `dspy.Module` subclasses (e.g., wrapping a `Predict` instance) whose behavior can be controlled.
    - **Mock Trainset/Valset**: Arrays of `dspy.Example` objects.
    - **Mock Metric Function**: A function `(example: Example, prediction: Prediction) => boolean | number` that returns predefined scores.
    - **Mock LM**: A `DummyLM` or mock `LM` that returns predefined responses for the teacher module during demo generation.
- Place mocks in `tests/utils/mocks/` or alongside `BootstrapFewShot.test.ts`.

## Components Involved
- `tests/teleprompt/BootstrapFewShot.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpBoot-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Create `MockSimpleModule` class (extends `dspy.Module`, contains a `Predict`):
    - `forward` method calls its `Predict` instance.
- [ ] Create `createMockTrainset(size: number)`: returns an array of simple `Example` objects.
- [ ] Create `mockSimpleMetric(example: Example, prediction: Prediction): boolean`:
    - Returns `example.output === prediction.output`.
- [ ] Create `MockLMForBootstrap` (or enhance `DummyLM`):
    - Configurable to return specific outputs for teacher module predictions.
- [ ] Integrate these mocks into `BootstrapFewShot.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `BootstrapFewShot` test code.
- Tests using mocks correctly isolate the optimizer's logic.
- Mocks accurately simulate the behavior of modules, data, metrics, and LMs.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact interfaces of `Module`, `Example`, and `LM` that the optimizer interacts with.

### Non-blocking
- Mocks can be refined as the actual optimizer and its dependencies are implemented.

## Acceptable Tradeoffs
- Initial mock modules and metrics can be very simple.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the complex logic of teleprompters like `BootstrapFewShot`.
For broader context, see [Epic Overview: BootstrapFewShot Optimizer Tests Conversion (TEST-TelepromptBootstrapTests)](../../docs/planning/workplans/TEST-TelepromptBootstrapTests.md).