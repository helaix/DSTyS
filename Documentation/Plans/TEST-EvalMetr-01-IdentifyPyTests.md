# Workplan: Identify Python Evaluation Metrics Tests

## Task ID
TEST-EvalMetr-01-IdentifyPyTests

## Problem Statement
To initiate the test conversion for evaluation metrics, we must first comprehensively identify all relevant Python test cases for these metrics from `dspy/tests/evaluate/test_metrics.py`.

## Proposed Implementation
- Access the Python DSPy repository.
- Navigate to `dspy/tests/evaluate/test_metrics.py`.
- List all test functions (e.g., methods starting with `test_`).
- For each test function, write a one-sentence summary of what it tests regarding specific metrics (e.g., `answer_exact_match`, `answer_passage_match`).
- Compile the final list of Python test cases to be ported for evaluation metrics.

## Components Involved
- Python DSPy codebase (`dspy/tests/evaluate/test_metrics.py`)
- Analysis documentation (this workplan and its outputs)
- Future TypeScript test file: `tests/evaluate/Metrics.test.ts`

## Dependencies
- Parent Epic: `../../docs/planning/workplans/TEST-EvaluateMetricsTests.md`
- `TEST-Framework` (for understanding test environment)
- `TEST-ConversionTemplate` (for general conversion guidelines)

## Implementation Checklist
- [ ] Clone or access the Python DSPy repository.
- [ ] Navigate to `dspy/tests/evaluate/test_metrics.py`.
- [ ] List all test functions in this file.
- [ ] For each test function, write a one-sentence summary of what it tests.
- [ ] Compile the final list of Python test cases to be ported.

## Verification Steps
- Review the generated list of Python tests against `dspy/tests/evaluate/test_metrics.py` to ensure completeness.
- Confirm that the purpose of each identified Python test is understood.

## Decision Authority
- Independent: How to organize the list of identified tests.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None anticipated.
### Non-blocking
- Understanding how `Example` and `Prediction` objects are used as inputs to metric functions.

## Acceptable Tradeoffs
- Focus primarily on `test_metrics.py`.

## Status
Not Started

## Notes
This task is the first step in the TDD process for evaluation metrics.
For broader context, see [Epic Overview: Evaluation Metrics Tests Conversion (TEST-EvaluateMetricsTests)](../../docs/planning/workplans/TEST-EvaluateMetricsTests.md).