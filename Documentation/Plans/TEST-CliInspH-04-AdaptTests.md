# Workplan: Adapt Inspect History Utility Tests for TypeScript

## Task ID
TEST-CliInspH-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `inspect_history` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and finding a way to assert console output or refactor `inspect_history` for testability.

## Proposed Implementation
- For each placeholder test in `tests/utils/InspectHistory.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Populate the global LM history with mock interaction data.
    - Call the DSTyS `inspectHistory` function.
    - Assert the output:
        - Option 1 (Stdout Capture): Use `vi.spyOn(console, 'log')` to capture arguments passed to `console.log` and assert their content.
        - Option 2 (Refactor `inspectHistory`): Modify `inspectHistory` to optionally return a string or structured data instead of printing, making it easier to assert.
    - Ensure type safety in test code.

## Components Involved
- `tests/utils/InspectHistory.test.ts`.
- TypeScript, Vitest.
- Mock LM history data.

## Dependencies
- `TEST-CliInspH-03-CreateTSFiles` (Placeholder test files).
- `TEST-CliInspH-05-CreateMocks` (Mocks for LM history).
- Core DSTyS `inspectHistory` utility and global history mechanism.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `InspectHistory.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Clear and populate the global LM history (e.g., `dspy.settings.history.clear()`, then add mock entries).
    - Call `dspy.inspectHistory(n)`.
    - If using `vi.spyOn(console, 'log')`:
        - Set up the spy before calling `inspectHistory`.
        - Assert `spy.mock.calls` content against expected output.
        - Restore the spy in `afterEach`.
    - If `inspectHistory` is refactored to return data, assert on the returned data.
- [ ] Test scenarios: basic inspection, `n` entries, empty history, `n` larger than history.

## Verification Steps
- All converted `inspect_history` tests should initially fail.
- Test logic should be clear and target intended utility behavior.
- Console output (or returned data) assertions should be accurate.

## Decision Authority
- Independent: Specific assertion styles.
- User Input: Decision on whether to refactor `inspectHistory` for easier testing vs. relying on stdout capture.

## Questions/Uncertainties
### Blocking
- Effective and reliable method for capturing and asserting multi-line console output in Vitest.

### Non-blocking
- Exact formatting of expected console output.

## Acceptable Tradeoffs
- Refactoring `inspectHistory` to return a string/object might be preferable for test robustness over complex stdout spying.

## Status
Not Started

## Notes
This is the core test conversion for the `inspect_history` utility.
For broader context, see [Epic Overview: Inspect History Utility Tests Conversion (TEST-ClientsInspectHistoryTests)](../../docs/planning/workplans/TEST-ClientsInspectHistoryTests.md).