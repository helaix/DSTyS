# Workplan: Create Mock Implementations for ReAct Module Tests

## Task ID
TEST-PredReAct-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `ReAct` module tests. This includes mock LMs for thought/action generation, mock `Tool` instances, and mock `Signature` objects.

## Proposed Implementation
- Review the converted `ReAct` module tests from `TEST-PredReAct-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock LM**: A `DummyLM` or mock that returns predefined thoughts, tool names, and tool arguments.
    - **Mock Tool**: Instances of the DSTyS `Tool` class wrapping simple mock functions. These tools should have Zod schemas for their arguments. Their `execute` methods should be mockable (e.g., using `vi.spyOn` or by having the wrapped function be a `vi.fn()`) to return predefined observations or simulate errors.
    - **Mock Signature**: Simple `Signature` objects to define the I/O for `ReAct`.
- Place mocks in `tests/utils/mocks/` or alongside `ReAct.test.ts`.

## Components Involved
- `tests/predict/ReAct.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `LM`, `Tool`, `Signature`.
- Zod for defining mock tool argument schemas.

## Dependencies
- `TEST-PredReAct-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Signature`, `LM`, `Tool` class structures.

## Implementation Checklist
- [ ] Create `MockLMForReAct` (or enhance `DummyLM`):
    - Configurable to return a sequence of responses for `next_thought`, `next_tool_name`, `next_tool_args`.
- [ ] Create mock tool functions (e.g., `mockSearchToolFunc`, `mockCalculatorToolFunc`):
    - These functions should be simple (e.g., return a fixed string or number).
    - Define Zod schemas for their arguments.
    - Wrap them in DSTyS `Tool` instances for use in tests.
    - Ensure their `execute` methods can be spied upon or mocked to control observation output.
- [ ] Create helper `createMockReActSignature(inputs: string[], outputs: string[])`.
- [ ] Integrate these mocks into `ReAct.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `ReAct` module test code.
- Tests using mocks correctly isolate the `ReAct` logic from actual LM calls and tool executions.
- Mocks accurately simulate the behavior of LMs and tools within the ReAct loop.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The interface of the DSTyS `Tool` class, especially how argument schemas are defined and how `execute` is called and returns results/errors (Effectfully or not).

### Non-blocking
- Mocks can be refined as the actual `ReAct` module and `Tool` class are implemented.

## Acceptable Tradeoffs
- Mock tools can have very simple logic, focusing on the interaction rather than complex functionality.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing the complex iterative and interactive logic of `ReAct`.
For broader context, see [Epic Overview: ReAct Module Tests Conversion (TEST-PredictReActTests)](../../docs/planning/workplans/TEST-PredictReActTests.md).