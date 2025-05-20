# Epic Overview: Evaluation Metrics Tests Conversion (TEST-EvaluateMetricsTests)

## Task ID
TEST-EvaluateMetricsTests (Epic)

## Problem Statement
To ensure the DSTyS evaluation metrics (like `answer_exact_match`, `answer_passage_match`) function correctly, we need to convert the Python DSPy tests for these metrics (from `dspy/tests/evaluate/test_metrics.py`) to TypeScript.

## Proposed Implementation (High-Level)
The process involves converting Python tests for evaluation metrics to TypeScript.
1.  Analyze Python `test_metrics.py` for scenarios covering different metric calculations with various example/prediction pairs.
2.  Re-implement these tests in TypeScript using Vitest.
3.  Adapt test logic for TypeScript's type system, ensuring `Example` and `Prediction` objects are correctly handled.
4.  Create mock `Example` and `Prediction` data for testing.
The converted tests will guide the implementation of evaluation metrics in DSTyS.

## Components Involved (High-Level)
- Python test file: `dspy/tests/evaluate/test_metrics.py`
- DSTyS component: Metric functions (e.g., `metrics.ts`).
- Vitest testing framework

## Dependencies (Original)
- SETUP-ProjectStructure
- SETUP-DependencyManagement
- TEST-Framework
- TEST-ConversionTemplate
- Core DSTyS `Example` and `Prediction` implementations.

## Granular Workplans
- [TEST-EvalMetr-01-IdentifyPyTests](../../Documentation/Plans/TEST-EvalMetr-01-IdentifyPyTests.md) - Identify Python Metrics tests
- [TEST-EvalMetr-02-AnalyzeStructure](../../Documentation/Plans/TEST-EvalMetr-02-AnalyzeStructure.md) - Analyze test structure
- [TEST-EvalMetr-03-CreateTSFiles](../../Documentation/Plans/TEST-EvalMetr-03-CreateTSFiles.md) - Create TS test files
- [TEST-EvalMetr-04-AdaptTests](../../Documentation/Plans/TEST-EvalMetr-04-AdaptTests.md) - Adapt tests for TS/Effect
- [TEST-EvalMetr-05-CreateMocks](../../Documentation/Plans/TEST-EvalMetr-05-CreateMocks.md) - Create mocks
- [TEST-EvalMetr-06-VerifyCoverage](../../Documentation/Plans/TEST-EvalMetr-06-VerifyCoverage.md) - Verify coverage
- [TEST-EvalMetr-07-DocumentPatterns](../../Documentation/Plans/TEST-EvalMetr-07-DocumentPatterns.md) - Document patterns

## Decision Authority (Original)
- Independent: Design of mock example/prediction data.
- User Input: None anticipated.

## Questions/Uncertainties (Original)
### Blocking
- None anticipated.
### Non-blocking
- None.

## Acceptable Tradeoffs (Original)
- Focus on core metrics initially.

## Status
Not Started

## Notes
Accurate metrics are essential for program optimization.