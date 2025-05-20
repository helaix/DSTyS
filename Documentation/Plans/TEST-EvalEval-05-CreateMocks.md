# Workplan: Create Mock Implementations for Evaluate Utility Tests

## Task ID
TEST-EvalEval-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `Evaluate` utility tests. This includes mock programs, devsets (collections of `Example`s), and metric functions.

## Proposed Implementation
- Review the converted `Evaluate` utility tests from `TEST-EvalEval-04-AdaptTests`.
- Create:
    - **Mock Programs**: Simple `Module` subclasses or functions that return predefined `Prediction` objects based on input.
    - **Mock Devsets**: Arrays of mock `Example` objects with inputs and expected outputs.
    - **Mock Metric Functions**: Functions that take an `Example` and a `Prediction` and return a score (e.g., boolean for exact match, or a number).
- These mocks should be configurable to simulate different program behaviors and evaluation scenarios.
- Place mocks in `tests/utils/mocks/` or alongside `Evaluate.test.ts`.

## Components Involved
- `tests/evaluate/Evaluate.test.ts`.
- `tests/utils/mocks/` (for shared mocks, e.g., `mockProgram.ts`, `mockMetric.ts`).
- Mock `Module`, `Example`, `Prediction`, and metric functions.

## Dependencies
- `TEST-EvalEval-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `Prediction` class structures.

## Implementation Checklist
- [ ] Create `mockProgram(responses: Record<string, Record<string, any>>)`:
    - Takes a map of input strings to output field objects.
    - Returns a function or `Module` instance that mimics program execution.
- [ ] Create `createMockDevset(data: Array<{ inputs: Record<string, any>, outputs: Record<string, any> }>)`:
    - Returns an array of `Example` instances.
- [ ] Create `mockExactMatchMetric(example: Example, prediction: Prediction): boolean`.
- [ ] Create `mockScoringMetric(example: Example, prediction: Prediction): number`.
- [ ] Integrate these mocks and utilities into `Evaluate.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `Evaluate` utility test code.
- Mock programs, devsets, and metrics behave as configured.
- Tests can simulate various evaluation scenarios effectively.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Mocks can be refined as the actual `Evaluate` utility is implemented.

## Acceptable Tradeoffs
- Initial mock programs and metrics can be very simple.

## Status
Not Started

## Notes
Well-designed mocks are crucial for testing the `Evaluate` utility's logic without depending on complex, real programs or LMs.
For broader context, see [Epic Overview: Evaluate Utility Tests Conversion (TEST-EvaluateEvaluateTests)](../../docs/planning/workplans/TEST-EvaluateEvaluateTests.md).