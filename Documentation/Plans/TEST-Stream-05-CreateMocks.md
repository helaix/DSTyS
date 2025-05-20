# Workplan: Create Mock Implementations for Streaming Tests

## Task ID
TEST-Stream-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for streaming tests. This includes mock LMs that can produce streaming output, mock programs, and mock `StreamListener` configurations.

## Proposed Implementation
- Review the converted streaming tests from `TEST-Stream-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Streaming LM**: A `DummyLM` or mock `LM` whose `request` or `__call__` method returns an async iterator (or Effect `Stream`) that yields predefined chunks (simulating `ModelResponseStream` from LiteLLM).
    - **Mock Program**: Simple `dspy.Module` instances to be wrapped by `dspy.streamify`.
    - **Mock `StreamListener`**: If needed, a spy version of `StreamListener` to track received chunks.
    - **Mock `StatusMessageProvider`**: To test custom status message generation.
- Place mocks in `tests/utils/mocks/` or alongside `Streaming.test.ts`.

## Components Involved
- `tests/streaming/Streaming.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `LM`, `Module`, `StreamListener`, `StatusMessageProvider`.

## Dependencies
- `TEST-Stream-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `LM`, `Module`, `StreamListener`, `StatusMessageProvider` interfaces.

## Implementation Checklist
- [ ] Create `MockStreamingLM` (or enhance `DummyLM`):
    - `request` method returns an `async function*` (generator) or `Effect.Stream.fromIterable`.
    - Yields a sequence of mock `ModelResponseStream` like objects (e.g., `{ choices: [{ delta: { content: "chunk" } }] }`).
- [ ] Create simple mock `dspy.Module` subclasses for testing `streamify`.
- [ ] Create `SpyStreamListener` (if needed):
    - Extends `StreamListener`.
    - Records all chunks received in its `receive` method.
- [ ] Create `MockStatusMessageProvider` for testing custom status messages.
- [ ] Integrate these mocks into `Streaming.test.ts`.

## Verification Steps
- Mocks and test utilities simplify streaming test code.
- `MockStreamingLM` correctly simulates streaming LM behavior.
- Tests using mocks can effectively test `streamify`, `StreamListener`, and status message logic.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact structure of streamed chunks (e.g., `ModelResponseStream` equivalent in DSTyS).

### Non-blocking
- Mocks can be refined as actual streaming components are implemented.

## Acceptable Tradeoffs
- Initial mock streams can be simple and yield predefined string chunks.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the asynchronous and chunk-based nature of streaming.
For broader context, see [Epic Overview: Streaming Functionality Tests Conversion (TEST-StreamingTests)](../../docs/planning/workplans/TEST-StreamingTests.md).