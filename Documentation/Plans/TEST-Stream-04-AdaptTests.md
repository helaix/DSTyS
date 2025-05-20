# Workplan: Adapt Streaming Tests for TypeScript & Effect

## Task ID
TEST-Stream-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python streaming tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and using Effect `Stream` or async iterators for handling streamed data.

## Proposed Implementation
- For each placeholder test in `tests/streaming/Streaming.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock programs, LM responses that simulate streaming) and expected outcomes (sequences of chunks, status messages).
    - Use `expect` assertions from Vitest.
    - Mock LM clients to produce async iterators or Effect `Stream`s of response chunks.
    - Collect streamed chunks into an array and assert their content and order.
    - Test `StreamListener` by verifying its accumulated content.
    - Test status message streaming.
    - Ensure type safety in test code.

## Components Involved
- `tests/streaming/Streaming.test.ts`.
- TypeScript, Vitest, Effect (`Stream`).
- Mock programs, LMs, `StreamListener`.

## Dependencies
- `TEST-Stream-03-CreateTSFiles` (Placeholder test files).
- `TEST-Stream-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS streaming utilities (`streamify`, `StreamListener`), `Module`, `LM`.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Streaming.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up programs with `dspy.streamify(...)`.
    - Mock LM responses to yield a sequence of `ModelResponseStream` like chunks.
    - Consume the async iterator (or Effect `Stream`) returned by the streamified program.
    - Collect all yielded chunks (e.g., `StreamResponse`, `StatusMessage`, final `Prediction`).
    - Assert the content, type, and order of collected chunks.
- [ ] Test `streamify` with different modules (`Predict`, `ChainOfThought`, custom modules).
- [ ] Test `StreamListener` by attaching it and asserting its final `value`.
- [ ] Test `StatusMessageProvider` and the sequence of status messages.
- [ ] Test behavior with different adapters (Chat, JSON) if streaming output format differs.

## Verification Steps
- All converted streaming tests should initially fail.
- Test logic should be clear and target intended streaming behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or streaming semantics if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API of `dspy.streamify` and how it integrates with Effect `Stream` or async iterators.
- How `StreamListener` consumes and processes chunks.

### Non-blocking
- Specific content of status messages.

## Acceptable Tradeoffs
- Initial tests might focus on basic `streamify` and `StreamResponse` chunks, with `StreamListener` and status messages tested iteratively.

## Status
Not Started

## Notes
This is the core test conversion for streaming functionalities. Testing async iterators requires careful setup.
For broader context, see [Epic Overview: Streaming Functionality Tests Conversion (TEST-StreamingTests)](../../docs/planning/workplans/TEST-StreamingTests.md).