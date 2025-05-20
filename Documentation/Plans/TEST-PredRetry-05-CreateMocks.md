# Workplan: Create Mock Implementations for Retry Logic Tests

## Task ID
TEST-PredRetry-05-CreateMocks

## Problem Statement
Develop mock LMs or functions that can simulate failures to test retry logic effectively.

## Proposed Implementation
- Create a mock LM or a generic mock function wrapper:
    - Takes a list of outcomes (e.g., [Error1, Error2, SuccessValue]).
    - On each call, it returns the next outcome in the sequence.
    - Tracks call counts.
- This allows precise control over when an operation fails and when it succeeds during retry attempts.
- Place mocks in `tests/utils/mocks/`.

## Components Involved
- `tests/utils/mocks/mockFailingOperation.ts` (or similar).
- Retry logic test files.

## Dependencies
- `TEST-PredRetry-04-AdaptTests`.

## Implementation Checklist
- [ ] Create `createMockFailingOperation(outcomes: Array<() => Effect.Effect<any, any> | Effect.Effect<any, never>>)`:
    - Returns a function that, when called, invokes and returns the next outcome function from the `outcomes` array.
    - Tracks call count.
- [ ] Integrate this into retry logic tests.

## Verification Steps
- Mock operation correctly simulates sequences of failures and successes.
- Call counts are tracked accurately.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- None.

## Acceptable Tradeoffs
- Mocks can be tailored to specific test needs.

## Status
Not Started

## Notes
Controllable failing mocks are essential for testing retry mechanisms.
For broader context, see [Epic Overview: Predict Retry Logic Tests Conversion](../../docs/planning/workplans/TEST-PredictRetryTests.md).