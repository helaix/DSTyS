# Workplan: Adapt LM Client Tests for TypeScript & Effect

## Task ID
TEST-CliLM-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `dspy.LM` client tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for asynchronous LM calls and error handling.

## Proposed Implementation
- For each placeholder test in `tests/clients/LM.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (prompts, messages, configurations) and expected outcomes (LM responses).
    - Use `expect` assertions from Vitest.
    - Mock LiteLLM calls (`litellm.completion`, `litellm.acompletion`) using `vi.mock` or use a `DummyLM` equivalent in TypeScript.
    - Test different `LM` configurations (model type, caching, retries, logprobs).
    - If `LM.forward` or `LM.acall` return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/clients/LM.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for LiteLLM or `DummyLM` equivalent.

## Dependencies
- `TEST-CliLM-03-CreateTSFiles` (Placeholder test files).
- `TEST-CliLM-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `LM` class structure.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `LM.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `LM` instances with various configurations.
    - Mock underlying LiteLLM calls to return controlled responses or simulate errors.
    - Call `lm(prompt)` or `lm.acall(prompt)`.
    - Assert the structure and content of the returned `Prediction` or completions.
- [ ] Test chat vs. text model types.
- [ ] Test caching behavior (memory and disk if applicable).
- [ ] Test retry logic by simulating API errors.
- [ ] Test `dump_state` and `load_state` for `LM` configurations.
- [ ] Test `logprobs` parameter handling.
- [ ] For async calls, test success and failure paths using Effect patterns if `acall` is Effectful.

## Verification Steps
- All converted `LM` client tests should initially fail.
- Test logic should be clear and target intended `LM` client behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock response structures.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How the DSTyS `LM` class makes calls (direct LiteLLM vs. internal abstraction).
- How caching and retries are integrated into the `LM` client.

### Non-blocking
- Specific error types for LM call failures.

## Acceptable Tradeoffs
- Initial tests might use a simpler `DummyLM` equivalent, with more complex LiteLLM mocking added iteratively.

## Status
Not Started

## Notes
This is the core test conversion for the `LM` client component.
For broader context, see [Epic Overview: LM Client Tests Conversion (TEST-ClientsLmTests)](../../docs/planning/workplans/TEST-ClientsLmTests.md).