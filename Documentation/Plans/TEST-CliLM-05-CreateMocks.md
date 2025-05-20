# Workplan: Create Mock Implementations for LM Client Tests

## Task ID
TEST-CliLM-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for `LM` client tests. This primarily involves mocking LiteLLM API calls or creating a `DummyLM` equivalent in TypeScript.

## Proposed Implementation
- Review the converted `LM` client tests from `TEST-CliLM-04-AdaptTests`.
- **Option 1: Mock LiteLLM directly**:
    - Use `vi.mock('litellm', ...)` to mock `litellm.completion` and `litellm.acompletion`.
    - These mocks should be configurable to return predefined `ModelResponse` objects (or simulate errors like `RateLimitError`).
- **Option 2: TypeScript `DummyLM`**:
    - Create a `DummyLM.ts` utility that mimics Python's `dspy.utils.DummyLM`.
    - It would take a list of predefined responses and cycle through them or match based on input.
    - This `DummyLM` would be used when configuring `dspy.settings` in tests.
- Helper functions for setting up and cleaning temporary cache directories if disk caching for LMs is tested.
- Place mocks in `tests/utils/mocks/` or alongside `LM.test.ts`.

## Components Involved
- `tests/clients/LM.test.ts`.
- `tests/utils/mocks/` (for shared mocks, e.g., `mockLiteLLM.ts` or `DummyLM.ts`).
- Mock LiteLLM responses or `DummyLM` implementation.

## Dependencies
- `TEST-CliLM-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).

## Implementation Checklist
- [ ] Decide on primary mocking strategy (direct LiteLLM mock vs. `DummyLM.ts`).
- [ ] If direct LiteLLM mock:
    - Implement `vi.mock('litellm', ...)` setup.
    - Create helper to configure mock responses for `litellm.completion`/`acompletion`.
- [ ] If `DummyLM.ts`:
    - Implement `DummyLM` class with constructor accepting predefined responses.
    - Implement `request` (or `__call__`) method to return these responses.
- [ ] Define `MockModelResponse` structure (similar to LiteLLM's `ModelResponse`).
- [ ] Create mock error instances (e.g., `RateLimitError` from LiteLLM or a mock equivalent).
- [ ] If disk caching is tested, reuse or create temporary directory helpers.
- [ ] Integrate these mocks and utilities into `LM.test.ts`.

## Verification Steps
- Mocks and test utilities simplify `LM` client test code.
- Mocked LiteLLM calls or `DummyLM` behave as configured.
- Tests can simulate various LM responses and error conditions.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: Preference for direct LiteLLM mocking vs. a `DummyLM` utility.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Mocks can be refined as the actual `LM` client is implemented.

## Acceptable Tradeoffs
- `DummyLM.ts` might be simpler to start with than full LiteLLM mocking.

## Status
Not Started

## Notes
Effective mocking is crucial for testing LM client logic without actual API calls.
For broader context, see [Epic Overview: LM Client Tests Conversion (TEST-ClientsLmTests)](../../docs/planning/workplans/TEST-ClientsLmTests.md).