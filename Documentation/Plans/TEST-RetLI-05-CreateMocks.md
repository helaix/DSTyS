# Workplan: Create Mock Implementations for LlamaIndexRM Tests

## Task ID
TEST-RetLI-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `LlamaIndexRM` tests. This primarily involves mocking the LlamaIndex.js `BaseRetriever` interface and its `retrieve` method.

## Proposed Implementation
- Review the converted `LlamaIndexRM` tests from `TEST-RetLI-04-AdaptTests`.
- Create a `MockLlamaIndexRetriever` class or factory function:
    - It should implement the LlamaIndex.js `BaseRetriever` interface (or its core methods like `retrieve`).
    - Its `retrieve` method should be a `vi.fn()` spy that can be configured to return a predefined array of `NodeWithScore` (or LlamaIndex.js equivalent) objects.
- Create helper functions to generate mock `NodeWithScore` objects with varying text content and scores.
- Place mocks in `tests/utils/mocks/` or alongside `LlamaIndexRM.test.ts`.

## Components Involved
- `tests/retrieve/LlamaIndexRM.test.ts`.
- `tests/utils/mocks/mockLlamaIndex.ts` (or similar).
- Mock LlamaIndex.js retriever and node data.

## Dependencies
- `TEST-RetLI-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- The LlamaIndex.js library's `BaseRetriever` and `NodeWithScore` type definitions.

## Implementation Checklist
- [ ] Define TypeScript interfaces for LlamaIndex.js `NodeWithScore` (if not directly importable or if a simplified version is needed for mocks).
- [ ] Create `MockLlamaIndexRetriever` class:
    - Implement a `retrieve: vi.fn(async (query: string) => Promise<NodeWithScore[]>)` method.
    - Allow configuration of responses for `retrieve`.
- [ ] Create helper `createMockNodeWithScore(text: string, score: number)` function.
- [ ] Integrate these mocks into `LlamaIndexRM.test.ts` when creating `LlamaIndexRM` instances.

## Verification Steps
- Mocks and test utilities simplify `LlamaIndexRM` test code.
- Tests using `MockLlamaIndexRetriever` correctly isolate the `LlamaIndexRM` logic from actual LlamaIndex.js calls.
- Mocks accurately simulate the necessary parts of the LlamaIndex.js retriever interface.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact API of LlamaIndex.js `BaseRetriever` and `NodeWithScore`.

### Non-blocking
- Mocks can be refined as the actual `LlamaIndexRM` and LlamaIndex.js integration are implemented.

## Acceptable Tradeoffs
- Initial mock retrievers can return simple, fixed lists of nodes.

## Status
Not Started

## Notes
Effective mocking of the LlamaIndex.js retriever is crucial for testing the `LlamaIndexRM` integration.
For broader context, see [Epic Overview: LlamaIndexRM Tests Conversion (TEST-RetrieveLlamaIndexRMTests)](../../docs/planning/workplans/TEST-RetrieveLlamaIndexRMTests.md).