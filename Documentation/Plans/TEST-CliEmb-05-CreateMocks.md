# Workplan: Create Mock Implementations for Embedding Client Tests

## Task ID
TEST-CliEmb-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for Embedding Client (`Embedder`) tests. This primarily involves mocking LiteLLM embedding calls and creating mock callable embedder functions.

## Proposed Implementation
- Review the converted `Embedder` tests from `TEST-CliEmb-04-AdaptTests`.
- Create a `MockEmbeddingResponse` class or factory function that mimics LiteLLM's embedding response structure (containing `data` with embedding arrays, `usage`, `model`, `object`).
- Use `vi.mock` to mock `litellm.embedding` and `litellm.aembedding` to return instances of `MockEmbeddingResponse`.
- Create mock callable embedder functions that return predefined embedding arrays and track call counts.
- Helper functions for setting up and cleaning temporary cache directories if disk caching for embeddings is tested.
- Place mocks in `tests/utils/mocks/` or alongside `Embedder.test.ts`.

## Components Involved
- `tests/clients/Embedder.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock LiteLLM responses and callable embedders.

## Dependencies
- `TEST-CliEmb-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).

## Implementation Checklist
- [ ] Define `MockEmbeddingResponse` structure.
- [ ] Implement mocks for `litellm.embedding` and `litellm.aembedding` using `vi.mock`:
    - These mocks should be configurable to return different `MockEmbeddingResponse` instances based on input.
- [ ] Create `mockCallableEmbedder(expectedEmbeddings: number[][])`:
    - Returns a function that takes `texts: string[]` and returns `expectedEmbeddings`.
    - Has a `callCount` property.
- [ ] If disk caching is tested, reuse or create temporary directory helpers.
- [ ] Integrate these mocks and utilities into `Embedder.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `Embedder` test code.
- Mocked LiteLLM calls behave as configured.
- Mock callable embedders work correctly.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Mocks can be refined as the actual `Embedder` class is implemented.

## Acceptable Tradeoffs
- Initial mocks can be simple, with more sophisticated behavior added if needed.

## Status
Not Started

## Notes
Effective mocking is crucial for testing embedding client logic without actual API calls.
For broader context, see [Epic Overview: Embedding Client Tests Conversion (TEST-ClientsEmbeddingTests)](../../docs/planning/workplans/TEST-ClientsEmbeddingTests.md).