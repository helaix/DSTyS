# Workplan: Create Mock Implementations for Embeddings Retriever Tests

## Task ID
TEST-RetEmb-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `Embeddings` retriever tests. This primarily involves creating a mock corpus and a mock embedder function.

## Proposed Implementation
- Review the converted `Embeddings` retriever tests from `TEST-RetEmb-04-AdaptTests`.
- Create:
    - **Mock Corpus**: An array of strings representing sample documents.
    - **Mock Embedder Function**: A function that takes an array of texts and returns mock embeddings (e.g., simple numerical arrays like `number[][]`). This function should mimic the behavior of a real embedder by returning consistent embeddings for specific texts.
- These mocks will be used to initialize the `EmbeddingsRetriever` in tests.
- Place mocks in `tests/utils/mocks/` or alongside `EmbeddingsRetriever.test.ts`.

## Components Involved
- `tests/retrievers/EmbeddingsRetriever.test.ts`.
- `tests/utils/mocks/mockEmbeddingsData.ts` (or similar).
- Mock corpus and embedder function.

## Dependencies
- `TEST-RetEmb-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).

## Implementation Checklist
- [ ] Define `mockCorpus: string[]` with sample texts.
- [ ] Create `mockEmbedder(texts: string[]): number[][]`:
    - Implement logic to return predefined embeddings for specific texts in `mockCorpus`.
    - For example, if `text` contains "cat", return `[1, 0, 0]`; if "dog", return `[0, 1, 0]`.
- [ ] Integrate these mocks into `EmbeddingsRetriever.test.ts` when creating `EmbeddingsRetriever` instances.

## Verification Steps
- Mocks and test utilities simplify `Embeddings` retriever test code.
- `mockEmbedder` provides consistent, predictable embeddings for test texts.
- Tests using these mocks can effectively test the retriever's search logic.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Mocks can be refined as the actual `EmbeddingsRetriever` is implemented.

## Acceptable Tradeoffs
- Mock embeddings can be very simple (e.g., low-dimensional unit vectors).

## Status
Not Started

## Notes
Well-defined mock corpus and embedder are crucial for testing the in-memory search logic of the `Embeddings` retriever.
For broader context, see [Epic Overview: Embeddings Retriever Tests Conversion (TEST-RetrieversEmbeddingsTests)](../../docs/planning/workplans/TEST-RetrieversEmbeddingsTests.md).