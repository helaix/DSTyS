# Workplan: Create Mocks for PgVectorRM Integration Tests

## Task ID
TEST-RetPgVecI-05-CreateMocks

## Problem Statement
Develop mock data and a mock embedder for `PgVectorRM` integration tests. While these are integration tests against a real DB, the embeddings themselves can be mocked for predictability.

## Proposed Implementation
- Create:
    - **Mock Text Data**: An array of strings representing sample documents to be inserted into the test database.
    - **Mock Embedder Function**: A function that takes text and returns a predefined `number[]` (vector) for that text. This ensures that similarity scores are predictable in tests.
        - E.g., "text1" -> `[1,0,0]`, "text2" -> `[0,1,0]`, "query_for_text1" -> `[0.9,0.1,0.1]`.
- This mock embedder will be used by `PgVectorRM` during tests to generate embeddings for queries and potentially for data insertion if not pre-calculating.

## Components Involved
- `tests/retrieve/PgVectorRM.integration.test.ts` (where mocks are used).
- `tests/utils/mocks/mockPgVectorData.ts` (or similar).

## Dependencies
- `TEST-RetPgVecI-04-AdaptTests`.

## Implementation Checklist
- [ ] Define `mockTextDataForPgVector: string[]`.
- [ ] Create `mockEmbedderForPgVector(text: string): number[]`:
    - Returns consistent, predefined vectors for texts in `mockTextDataForPgVector` and for test queries.
    - Vectors should be designed to produce predictable similarity orderings.
- [ ] Use this mock embedder when initializing `PgVectorRM` in tests or when preparing data for insertion.

## Verification Steps
- Mock embedder provides consistent vectors.
- Tests using these mock embeddings produce predictable retrieval results.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- Designing vector values that result in clear and testable similarity differences.

## Acceptable Tradeoffs
- Embeddings can be very low-dimensional for simplicity.

## Status
Not Started

## Notes
Mocking embeddings makes integration tests for vector search more deterministic.
For broader context, see [Epic Overview: PgVectorRM Integration Tests Conversion](../../docs/planning/workplans/TEST-RetrievePgvectorRMIntegrationTests.md).