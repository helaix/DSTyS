# Workplan: Adapt Evaluation Metrics Tests for TypeScript

## Task ID
TEST-EvalMetr-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python evaluation metrics tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript and adapting for static typing.

## Proposed Implementation
- For each placeholder test in `tests/evaluate/Metrics.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock `Example` and `Prediction` objects) and expected outcomes (metric scores).
    - Use `expect` assertions from Vitest.
    - Ensure type safety in test code, especially for the structure of `Example` and `Prediction` objects passed to metrics.

## Components Involved
- `tests/evaluate/Metrics.test.ts`.
- TypeScript, Vitest.
- Mock `Example` and `Prediction` data.

## Dependencies
- `TEST-EvalMetr-03-CreateTSFiles` (Placeholder test files).
- `TEST-EvalMetr-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `Example`, `Prediction`, and metric function structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Metrics.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Create mock `Example` instances with relevant input and gold label fields.
    - Create mock `Prediction` instances with relevant output fields.
    - Call the specific metric function (e.g., `answerExactMatch(example, prediction)`).
    - Assert the returned metric score (e.g., `expect(score).toBe(true)` or `expect(score).toBe(0.75)`).
- [ ] Test different scenarios for each metric (e.g., exact match, partial match, no match, case differences if normalization is involved).

## Verification Steps
- All converted evaluation metrics tests should initially fail.
- Test logic should be clear and target intended metric calculation behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or metric calculation if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact structure of `Example` and `Prediction` objects in DSTyS.

### Non-blocking
- How text normalization is handled and tested within metrics.

## Acceptable Tradeoffs
- Initial tests might use simplified `Example` and `Prediction` structures.

## Status
Not Started

## Notes
This is the core test conversion for evaluation metrics.
For broader context, see [Epic Overview: Evaluation Metrics Tests Conversion (TEST-EvaluateMetricsTests)](../../docs/planning/workplans/TEST-EvaluateMetricsTests.md).