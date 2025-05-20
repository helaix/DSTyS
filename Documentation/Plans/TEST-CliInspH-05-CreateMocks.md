# Workplan: Create Mock Implementations for Inspect History Tests

## Task ID
TEST-CliInspH-05-CreateMocks

## Problem Statement
Identify and create necessary mock data or utilities for `inspect_history` tests. This primarily involves creating mock LM interaction entries to populate the global history.

## Proposed Implementation
- Review the converted `inspect_history` tests from `TEST-CliInspH-04-AdaptTests`.
- Create helper functions or sample data structures representing LM history entries. A history entry typically includes:
    - `prompt` or `messages`
    - `response` (completions)
    - `kwargs` (LM configuration)
    - `timestamp` (optional)
- These mock entries will be added to `dspy.settings.history` (or its DSTyS equivalent) before `inspectHistory` is called in tests.
- Place mock data generators or static mock data in `tests/utils/mocks/` or alongside `InspectHistory.test.ts`.

## Components Involved
- `tests/utils/InspectHistory.test.ts`.
- `tests/utils/mocks/mockHistory.ts` (or similar).
- Mock LM history entry data.

## Dependencies
- `TEST-CliInspH-04-AdaptTests` (Converted tests will drive the need for specific mock history structures).
- Understanding of the structure of LM history entries in DSTyS.

## Implementation Checklist
- [ ] Define a TypeScript interface for a mock LM history entry, matching what `inspectHistory` expects.
- [ ] Create a helper function `createMockHistoryEntry(prompt: string, responseContent: string, model: string = "test-model")` that returns a valid history entry object.
- [ ] Create an array of several mock history entries to be used in tests.
- [ ] Ensure tests can easily clear and populate the global history with these mocks in `beforeEach` blocks.

## Verification Steps
- Mock history entries are correctly structured.
- Tests using these mocks can effectively simulate different history states for `inspectHistory`.

## Decision Authority
- Independent: Implementation details of mock history data.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact structure of history entries stored by DSTyS LM clients.

### Non-blocking
- Mocks can be refined as the history mechanism is finalized.

## Acceptable Tradeoffs
- Initial mock history entries can be simple, with more complex structures (e.g., multiple completions, errors) added if needed by tests.

## Status
Not Started

## Notes
Realistic mock history data is key for testing `inspectHistory` thoroughly.
For broader context, see [Epic Overview: Inspect History Utility Tests Conversion (TEST-ClientsInspectHistoryTests)](../../docs/planning/workplans/TEST-ClientsInspectHistoryTests.md).