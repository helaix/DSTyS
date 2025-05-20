# Workplan: Adapt Embeddings Retriever Tests for TypeScript & Effect

## Task ID
TEST-RetEmb-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `Embeddings` retriever tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and handling vector operations and concurrency.

## Proposed Implementation
- For each placeholder test in `tests/retrievers/EmbeddingsRetriever.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock corpus, mock embedder function, queries) and expected outcomes (retrieved passages and indices).
    - Use `expect` assertions from Vitest.
    - Replicate vector operations (like similarity search) using TypeScript array methods or a lightweight vector math library if needed.
    - For multi-threaded tests, use Node.js `worker_threads` or Effect TS concurrency primitives if the retriever itself is designed to be concurrent.
    - Ensure type safety in test code.

## Components Involved
- `tests/retrievers/EmbeddingsRetriever.test.ts`.
- TypeScript, Vitest, Effect (if applicable).
- Mock corpus and embedder.

## Dependencies
- `TEST-RetEmb-03-CreateTSFiles` (Placeholder test files).
- `TEST-RetEmb-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `EmbeddingsRetriever` class structure.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `EmbeddingsRetriever.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `EmbeddingsRetriever` instances with mock corpus and embedder.
    - Call `retriever(query)` or `retriever.forward(query)`.
    - Assert the `passages` and `indices` of the result.
- [ ] Test basic search functionality.
- [ ] Test multi-threaded/concurrent search if applicable:
    - Use `Promise.all` with async calls or Effect TS concurrency.
    - Verify results from concurrent searches are correct.
- [ ] Ensure vector comparisons are correctly implemented or mocked.

## Verification Steps
- All converted `Embeddings` retriever tests should initially fail.
- Test logic should be clear and target intended retriever behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or vector math if ambiguous.

## Questions/Uncertainties
### Blocking
- How vector embeddings (likely `number[]`) are handled and compared in TypeScript.
- The concurrency model for the DSTyS `EmbeddingsRetriever`.

### Non-blocking
- Specific error types for retrieval failures.

## Acceptable Tradeoffs
- Initial tests might use simple array-based vector math.
- Concurrency tests might be simplified if full multi-threading is complex to replicate in tests.

## Status
Not Started

## Notes
This is the core test conversion for the `Embeddings` retriever component.
For broader context, see [Epic Overview: Embeddings Retriever Tests Conversion (TEST-RetrieversEmbeddingsTests)](../../docs/planning/workplans/TEST-RetrieversEmbeddingsTests.md).