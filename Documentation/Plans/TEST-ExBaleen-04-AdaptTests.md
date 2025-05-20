# Workplan: Adapt Baleen Example Tests for TypeScript & Effect

## Task ID
TEST-ExBaleen-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python Baleen example tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for LM/RM calls.

## Proposed Implementation
- For each placeholder test in `tests/examples/Baleen.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock questions, mock HotPotQA data) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Mock LM and RM interactions extensively.
    - If Baleen's `forward` method or its sub-modules are Effectful, use `Effect.runPromiseExit` or helpers.
    - Implement TypeScript versions of custom metrics like `validate_context_and_answer_and_hops`.
    - Ensure type safety.

## Components Involved
- `tests/examples/Baleen.test.ts`.
- TypeScript, Vitest, Effect.
- Mock LMs, RMs, datasets, metrics.

## Dependencies
- `TEST-ExBaleen-03-CreateTSFiles`.
- `TEST-ExBaleen-05-CreateMocks`.
- DSTyS `SimplifiedBaleen` implementation and its dependencies.

## Implementation Checklist
- [ ] Iterate through `Baleen.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
    - Set up mock LMs to return predefined queries and answers.
    - Set up mock RMs to return predefined passages.
    - Instantiate `SimplifiedBaleen` (or its TS equivalent).
    - Call `baleenProgram(question=...)`.
    - Assert final answer and context.
- [ ] Implement TS versions of custom evaluation metrics.
- [ ] Test compiled Baleen if `BootstrapFewShot` is also ported and tested.
- [ ] For effectful operations, test success and failure paths.

## Verification Steps
- Converted Baleen tests initially fail.
- Test logic is clear and targets intended program behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- Complexity of mocking multi-hop LM/RM interactions.
- Availability of a `BootstrapFewShot` equivalent for compiled tests.

### Non-blocking
- None.

## Acceptable Tradeoffs
- Initial tests might focus on uncompiled Baleen with heavily mocked dependencies.

## Status
Not Started

## Notes
Testing complex examples like Baleen is crucial for validating the framework's capabilities.
For broader context, see [Epic Overview: Baleen Example Tests Conversion](../../docs/planning/workplans/TEST-ExamplesBaleenTests.md).