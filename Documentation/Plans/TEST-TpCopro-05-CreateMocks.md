# Workplan: Create Mock Implementations for COPRO Optimizer Tests

## Task ID
TEST-TpCopro-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `COPRO` optimizer tests. This includes mock student modules, prompt models, trainsets, metric functions, and LM responses for instruction generation.

## Proposed Implementation
- Review the converted `COPRO` tests from `TEST-TpCopro-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Student Module**: A simple `dspy.Module` (e.g., wrapping a `ChainOfThought` instance) whose signature can be modified.
    - **Mock Prompt Model (LM)**: A `DummyLM` or mock `LM` that returns predefined instructions/prefixes when prompted by `COPRO`'s internal generation modules.
    - **Mock Trainset**: Arrays of `dspy.Example` objects.
    - **Mock Metric Function**: A function `(example: Example, prediction: Prediction) => boolean | number`.
- Place mocks in `tests/utils/mocks/` or alongside `COPRO.test.ts`.

## Components Involved
- `tests/teleprompt/COPRO.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Example`, metric functions, `LM`.

## Dependencies
- `TEST-TpCopro-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `LM` class structures.

## Implementation Checklist
- [ ] Create `MockStudentModuleForCOPRO` class (extends `dspy.Module`, contains a `ChainOfThought`):
    - Allows its `ChainOfThought` predictor's signature to be updated.
- [ ] Create `MockPromptModelForCOPRO` (or enhance `DummyLM`):
    - Configurable to return specific `proposed_instruction` and `proposed_prefix_for_output_field` strings.
- [ ] Create `createMockTrainset(size: number)`: returns an array of simple `Example` objects.
- [ ] Create `mockSimpleMetric(example: Example, prediction: Prediction): boolean`.
- [ ] Integrate these mocks into `COPRO.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `COPRO` test code.
- Tests using mocks correctly isolate the optimizer's logic.
- Mocks accurately simulate the behavior of modules, data, metrics, and LMs.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact interfaces of `Module`, `Example`, and `LM` that the optimizer interacts with.
- The structure of `COPRO`'s internal instruction generation signatures.

### Non-blocking
- Mocks can be refined as the actual optimizer and its dependencies are implemented.

## Acceptable Tradeoffs
- Initial mock modules and metrics can be very simple.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the complex logic of teleprompters like `COPRO`.
For broader context, see [Epic Overview: COPRO Optimizer Tests Conversion (TEST-TelepromptCoproTests)](../../docs/planning/workplans/TEST-TelepromptCoproTests.md).