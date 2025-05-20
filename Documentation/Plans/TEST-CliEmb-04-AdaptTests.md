# Workplan: Adapt Embedding Client Tests for TypeScript & Effect

## Task ID
TEST-CliEmb-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `Embedder` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns for asynchronous embedding calls.

## Proposed Implementation
- For each placeholder test in `tests/clients/Embedder.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (text arrays) and expected outcomes (embedding arrays).
    - Use `expect` assertions from Vitest, potentially with helpers for comparing numerical arrays (embeddings).
    - Mock LiteLLM calls (`litellm.embedding`, `litellm.aembedding`) using `vi.mock`.
    - Test callable embedders by providing mock functions.
    - If `Embedder.acall` returns an `Effect` object, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/clients/Embedder.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for LiteLLM and callable embedders.

## Dependencies
- `TEST-CliEmb-03-CreateTSFiles` (Placeholder test files).
- `TEST-CliEmb-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `Embedder` class structure.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Embedder.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `Embedder` instances with mock models or callable functions.
    - Mock `litellm.embedding` and `litellm.aembedding` to return controlled `MockEmbeddingResponse` objects.
    - Call `embedder(inputs)` or `embedder.acall(inputs)`.
    - Assert the shape and values of the returned embedding arrays (e.g., using `expect(...).toEqual(expect.arrayContaining(...))` or custom array comparison).
- [ ] Test caching behavior by checking call counts of mocked functions.
- [ ] Test batching logic if applicable and testable.
- [ ] For async calls, test success and failure paths using Effect patterns if `acall` is Effectful.

## Verification Steps
- All converted `Embedder` tests should initially fail.
- Test logic should be clear and target intended embedding client behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock response structures.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How the DSTyS `Embedder` class makes calls (direct LiteLLM vs. via a base `LM` client).
- How caching is integrated with `Embedder`.

### Non-blocking
- Specific error types for embedding failures.

## Acceptable Tradeoffs
- Initial tests might focus on core embedding generation, with batching/caching tests refined as those features solidify.

## Status
Not Started

## Notes
This is the core test conversion for the Embedding Client component.
For broader context, see [Epic Overview: Embedding Client Tests Conversion (TEST-ClientsEmbeddingTests)](../../docs/planning/workplans/TEST-ClientsEmbeddingTests.md).