# Workplan: Create Mock Implementations for Evaluation Metrics Tests

## Task ID
TEST-EvalMetr-05-CreateMocks

## Problem Statement
Identify and create necessary mock data or test utilities for evaluation metrics tests. This primarily involves creating mock `Example` and `Prediction` objects with various field values.

## Proposed Implementation
- Review the converted evaluation metrics tests from `TEST-EvalMetr-04-AdaptTests`.
- Create helper functions or sample data structures for:
    - `Example` objects: With fields like `question`, `answer`, `context`.
    - `Prediction` objects: With fields corresponding to what a module might output (e.g., `answer`, `rationale`).
- These mocks should be easily configurable to represent different scenarios for metric calculation (e.g., matching answers, differing answers, lists of answers).
- Place mock data generators or static mock data in `tests/utils/mocks/` or alongside `Metrics.test.ts`.

## Components Involved
- `tests/evaluate/Metrics.test.ts`.
- `tests/utils/mocks/mockEvalData.ts` (or similar).
- Mock `Example` and `Prediction` data.

## Dependencies
- `TEST-EvalMetr-04-AdaptTests` (Converted tests will drive the need for specific mock data structures).
- Core DSTyS `Example` and `Prediction` class structures.

## Implementation Checklist
- [ ] Define helper function `createMockExample(data: Record<string, any>, inputKeys: string[])` that returns an `Example` instance.
- [ ] Define helper function `createMockPrediction(data: Record<string, any>)` that returns a `Prediction` instance.
- [ ] Create sets of mock data for common metric testing scenarios:
    - Exact match cases (true/false).
    - Partial match cases (if metrics support this).
    - Cases with lists of answers/predictions.
- [ ] Integrate these mocks and utilities into `Metrics.test.ts`.

## Verification Steps
- Mock data is correctly structured for `Example` and `Prediction` types.
- Tests using this mock data can effectively test various metric calculations.

## Decision Authority
- Independent: Implementation details of mock data.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The final structure of `Example` and `Prediction` objects in DSTyS.

### Non-blocking
- Mocks can be refined as actual metric functions are implemented.

## Acceptable Tradeoffs
- Initial mock data can be simple, with more complex structures added as needed by tests.

## Status
Not Started

## Notes
Realistic and varied mock data is key for testing evaluation metrics thoroughly.
For broader context, see [Epic Overview: Evaluation Metrics Tests Conversion (TEST-EvaluateMetricsTests)](../../docs/planning/workplans/TEST-EvaluateMetricsTests.md).