# Workplan: Adapt ReAct Module Tests for TypeScript & Effect

## Task ID
TEST-PredReAct-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `ReAct` module tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing (using Zod for tool args), and integrating Effect TS patterns for LM calls and tool execution.

## Proposed Implementation
- For each placeholder test in `tests/predict/ReAct.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Signatures, Tools with Zod schemas, LM responses for thought/action) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Mock `Tool.execute()` to return predefined observations or simulate errors.
    - If `ReAct.forward` or tool calls return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code, especially for tool arguments.

## Components Involved
- `tests/predict/ReAct.test.ts`.
- TypeScript, Vitest, Effect, Zod.
- Mock `Signature`, `LM`, `Tool`.

## Dependencies
- `TEST-PredReAct-03-CreateTSFiles` (Placeholder test files).
- `TEST-PredReAct-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `ReAct`, `Signature`, `LM`, `Tool` class structures.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `ReAct.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `ReAct` instances with mock Signatures, Tools (with Zod schemas), and LMs.
    - Mock LM responses to simulate thought/action generation.
    - Mock `Tool.execute()` to return specific observations or errors.
    - Call `reactModule.forward(...)`.
    - Assert the final output and the content of `trajectory`.
- [ ] Test scenarios:
    - Successful tool use.
    - Handling of tool execution errors.
    - Trajectory truncation.
    - Tool argument validation (using Zod schemas).
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `ReAct` module tests should initially fail.
- Test logic should be clear and target intended `ReAct` behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or tool interaction if ambiguous.

## Questions/Uncertainties
### Blocking
- The design of the `Tool` class in DSTyS, especially how argument schemas (Zod) are defined and used.
- How `ReAct` manages the iterative thought-action-observation loop with Effect.

### Non-blocking
- Specific error types for tool execution failures within ReAct.

## Acceptable Tradeoffs
- Initial tests might use simpler mock tools and LM responses.

## Status
Not Started

## Notes
This is the core test conversion for the `ReAct` module. Testing agentic loops requires careful mocking of LM and tool interactions.
For broader context, see [Epic Overview: ReAct Module Tests Conversion (TEST-PredictReActTests)](../../docs/planning/workplans/TEST-PredictReActTests.md).