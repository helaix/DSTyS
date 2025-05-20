# Workplan: Create Mock Implementations for KNNFewShot Optimizer Tests

## Task ID
TEST-TpKNNFs-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `KNNFewShot` optimizer tests. This includes mock student/teacher modules, trainsets, `KNN` predictors, `Embedder` (vectorizer), and LM responses.

## Proposed Implementation
- Review the converted `KNNFewShot` tests from `TEST-TpKNNFs-04-AdaptTests`.
- Create helper functions or mock classes for:
    - **Mock Student/Teacher Modules**: Simple `dspy.Module` subclasses.
    - **Mock Trainset**: Arrays of `dspy.Example` objects.
    - **Mock KNN Predictor**: A mock `KNN` class or function that returns predefined nearest neighbors.
    - **Mock Embedder**: A mock `Embedder` that returns predefined vectors.
    - **Mock LM**: A `DummyLM` for any underlying LM calls.
- Place mocks in `tests/utils/mocks/` or alongside `KNNFewShot.test.ts`.

## Components Involved
- `tests/teleprompt/KNNFewShot.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `Module`, `Example`, `KNN`, `Embedder`, `LM`.

## Dependencies
- `TEST-TpKNNFs-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Core DSTyS `Module`, `Example`, `KNN`, `Embedder`, `LM` class structures.

## Implementation Checklist
- [ ] Create `MockSimpleModule` class.
- [ ] Create `createMockTrainset(size: number)`.
- [ ] Create `MockKNNPredictor`:
    - Constructor takes a map of query embeddings to example lists.
    - `__call__` method returns predefined examples based on input.
- [ ] Create `MockEmbedderForKNN`:
    - Returns predefined vectors for specific texts.
- [ ] Create `MockLMForKNNFewShot` (or use `DummyLM`).
- [ ] Integrate these mocks into `KNNFewShot.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `KNNFewShot` test code.
- Tests using mocks correctly isolate the optimizer's logic.
- Mocks accurately simulate the behavior of dependencies.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The exact interfaces of `KNN`, `Embedder`, and how `KNNFewShot` uses them.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Initial mock KNN predictors can return fixed sets of examples.

## Status
Not Started

## Notes
Well-designed mocks are essential for testing `KNNFewShot`.
For broader context, see [Epic Overview: KNNFewShot Optimizer Tests Conversion](../../docs/planning/workplans/TEST-TelepromptKNNFewShotTests.md).