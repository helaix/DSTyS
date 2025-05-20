# Workplan: Adapt Evaluate Utility Tests for TypeScript

## Task ID
TEST-EvalEval-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `Evaluate` utility tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and handling differences in how results might be structured or displayed.

## Proposed Implementation
- For each placeholder test in `tests/evaluate/Evaluate.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock programs, devsets, metric functions) and expected outcomes (scores, result structures).
    - Use `expect` assertions from Vitest.
    - If `Evaluate` involves Effectful program execution, ensure tests handle this.
    - Adapt tests for display options (e.g., if result tables are generated as objects/arrays instead of printed DataFrames).
    - Ensure type safety in test code.

## Components Involved
- `tests/evaluate/Evaluate.test.ts`.
- TypeScript, Vitest, Effect (if programs are Effectful).
- Mock programs, devsets, metrics.

## Dependencies
- `TEST-EvalEval-03-CreateTSFiles` (Placeholder test files).
- `TEST-EvalEval-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `Evaluate` utility, `Module`, `Example`, and metric function structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Evaluate.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `Evaluate` instances with mock programs, devsets, and metrics.
    - Call `evaluate(program, ...)` or `evaluate.call(program, ...)`.
    - Assert the returned score or detailed results object.
- [ ] Test different configurations: `num_threads`, `display_progress`, `display_table`.
- [ ] Test error handling (e.g., if a program fails during evaluation).
- [ ] If `display_table` is tested, assert the structure of the returned result data (e.g., array of result objects) or captured console output if applicable.

## Verification Steps
- All converted `Evaluate` utility tests should initially fail.
- Test logic should be clear and target intended evaluation behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How multi-threading/parallelism is implemented in DSTyS `Evaluate`.
- The structure of the detailed results returned by `Evaluate` (if not just a score).

### Non-blocking
- Specific error types for evaluation failures.

## Acceptable Tradeoffs
- Tests for `display_table` might need significant adaptation if not using pandas-like tables. Focus on asserting the data rather than exact console format.
- Multi-threading tests might be simplified or deferred if the TS implementation uses a different concurrency model.

## Status
Not Started

## Notes
This is the core test conversion for the `Evaluate` utility.
For broader context, see [Epic Overview: Evaluate Utility Tests Conversion (TEST-EvaluateEvaluateTests)](../../docs/planning/workplans/TEST-EvaluateEvaluateTests.md).