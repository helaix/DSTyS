# Workplan: Adapt Retry Logic Tests for TypeScript & Effect

## Task ID
TEST-PredRetry-04-AdaptTests

## Problem Statement
Convert Python retry logic test assertions into TypeScript/Vitest placeholders, adapting for static typing and Effect TS patterns (e.g., `Effect.retry` with `Schedule`).

## Proposed Implementation
- For each placeholder test for retry logic:
    - Translate Python test logic to TypeScript.
    - Define mock LMs or functions that simulate a sequence of failures followed by success, or persistent failures.
    - Test the retry mechanism (e.g., `Effect.retry(effectfulOperation, schedule)`).
    - Assert the number of attempts made (e.g., by checking mock call counts).
    - Assert the final outcome (success value or propagated error after max retries).
- Ensure type safety.

## Components Involved
- Retry logic test files.
- TypeScript, Vitest, Effect.
- Mocks for LMs or failing operations.

## Dependencies
- `TEST-PredRetry-03-CreateTSFiles`.
- `TEST-PredRetry-05-CreateMocks`.
- DSTyS retry mechanism implementation.

## Implementation Checklist
- [ ] Iterate through retry logic test placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up mock LMs/functions to fail a specific number of times.
    - Configure retry schedules (e.g., `Schedule.recurs(N)`).
    - Execute the operation with retry logic.
    - Assert call counts on mocks.
    - Assert final `Exit` state (success or failure).
- [ ] Test different retry schedules and error conditions.

## Verification Steps
- Converted retry tests initially fail.
- Test logic is clear and targets intended retry behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How retry schedules are defined and applied in DSTyS.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might use simple fixed retry counts.

## Status
Not Started

## Notes
This is the core test conversion for retry logic.
For broader context, see [Epic Overview: Predict Retry Logic Tests Conversion](../../docs/planning/workplans/TEST-PredictRetryTests.md).