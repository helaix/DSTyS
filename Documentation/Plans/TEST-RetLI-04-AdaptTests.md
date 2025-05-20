# Workplan: Adapt LlamaIndexRM Tests for TypeScript & Effect

## Task ID
TEST-RetLI-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `LlamaIndexRM` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if retrieval operations are effectful.

## Proposed Implementation
- For each placeholder test in `tests/retrieve/LlamaIndexRM.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock queries, mock LlamaIndex retriever instances) and expected outcomes (retrieved documents).
    - Use `expect` assertions from Vitest.
    - Mock the LlamaIndex.js retriever's `retrieve` method to return controlled results.
    - If `LlamaIndexRM.forward` returns an `Effect` object, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/retrieve/LlamaIndexRM.test.ts`.
- TypeScript, Vitest, Effect.
- Mocks for LlamaIndex.js retriever.

## Dependencies
- `TEST-RetLI-03-CreateTSFiles` (Placeholder test files).
- `TEST-RetLI-05-CreateMocks` (Mocks for LlamaIndex.js).
- Core DSTyS `LlamaIndexRM` class structure and LlamaIndex.js library.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `LlamaIndexRM.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `LlamaIndexRM` instances with mock LlamaIndex.js retrievers.
    - Mock the `retrieve` method of the LlamaIndex.js retriever to return predefined `NodeWithScore` arrays.
    - Call `llamaIndexRM.forward(query, k)`.
    - Assert the structure and content of the returned `dspy.Example` list.
- [ ] Test `k` parameter handling.
- [ ] Test integration with `dspy.Module.save/load` if `LlamaIndexRM` is part of a saved module (this might be more about ensuring the RM's configuration is serializable, not the LlamaIndex instance itself).
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `LlamaIndexRM` tests should initially fail.
- Test logic should be clear and target intended retriever behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, mock data generation.
- User Input: Clarification on Python test behavior or LlamaIndex interaction if ambiguous.

## Questions/Uncertainties
### Blocking
- The API of LlamaIndex.js and how its `BaseRetriever` equivalent works.
- How `LlamaIndexRM` handles asynchronous retrieval if LlamaIndex.js is async.

### Non-blocking
- Specific error types for retrieval failures.

## Acceptable Tradeoffs
- Initial tests might use very simple mock LlamaIndex.js retrievers.

## Status
Not Started

## Notes
This is the core test conversion for the `LlamaIndexRM` component.
For broader context, see [Epic Overview: LlamaIndexRM Tests Conversion (TEST-RetrieveLlamaIndexRMTests)](../../docs/planning/workplans/TEST-RetrieveLlamaIndexRMTests.md).