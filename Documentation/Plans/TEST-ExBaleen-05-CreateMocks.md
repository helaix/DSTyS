# Workplan: Create Mock Implementations for Baleen Example Tests

## Task ID
TEST-ExBaleen-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations for Baleen example tests. This includes mock LMs, RMs, datasets (HotPotQA samples), and custom metric functions.

## Proposed Implementation
- Review converted Baleen tests from `TEST-ExBaleen-04-AdaptTests`.
- Create:
    - **Mock LM**: `DummyLM` configured to return specific queries for `GenerateSearchQuery` and answers for `GenerateAnswer` based on inputs.
    - **Mock RM**: A mock `Retrieve` module that returns predefined passages for given queries.
    - **Mock HotPotQA Data**: Small arrays of `dspy.Example` mimicking HotPotQA structure.
    - **Mock Metrics**: TypeScript implementations of metrics like `validate_context_and_answer_and_hops` and `gold_passages_retrieved`.
- Place mocks in `tests/utils/mocks/` or alongside `Baleen.test.ts`.

## Components Involved
- `tests/examples/Baleen.test.ts`.
- `tests/utils/mocks/`.
- Mock LMs, RMs, data, metrics.

## Dependencies
- `TEST-ExBaleen-04-AdaptTests`.
- Core DSTyS `Example`, `LM`, `Retrieve` interfaces.

## Implementation Checklist
- [ ] Create `mockLMForBaleen()`:
    - Takes predefined responses for query generation and answer generation stages.
- [ ] Create `mockRMForBaleen()`:
    - Takes a map of queries to passage lists.
- [ ] Create `mockHotPotQASamples()`: returns a small array of `Example` objects.
- [ ] Implement TS versions of `validate_context_and_answer_and_hops` and `gold_passages_retrieved`.
- [ ] Integrate mocks into `Baleen.test.ts`.

## Verification Steps
- Mocks simplify Baleen test setup.
- Mocks accurately simulate LM, RM, and data behavior.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.
### Non-blocking
- Complexity of custom metric logic.

## Acceptable Tradeoffs
- Mock datasets can be very small.

## Status
Not Started

## Notes
Comprehensive mocks are key to testing the multi-hop logic of Baleen.
For broader context, see [Epic Overview: Baleen Example Tests Conversion](../../docs/planning/workplans/TEST-ExamplesBaleenTests.md).