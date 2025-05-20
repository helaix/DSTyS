# Workplan: Create Mock Implementations for LiteLLM Cache Tests

## Task ID
TEST-CacheLite-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for LiteLLM Caching tests. This primarily involves mocking `LM` client calls to control when actual LM interactions occur versus cache hits.

## Proposed Implementation
- Review the converted LiteLLM Caching tests from `TEST-CacheLite-04-AdaptTests`.
- Create a `MockLM` or enhance `DummyLM` to:
    - Track the number of times its `__call__` or `request` method is invoked.
    - Return predefined responses.
- This allows tests to verify if a cache hit occurred by checking if the LM's call count increased.
- Helper functions for setting up and cleaning temporary disk cache directories might also be useful.
- Place mocks in `tests/utils/mocks/` or alongside `LiteLLMCache.test.ts`.

## Components Involved
- `tests/caching/LiteLLMCache.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementation for `LM`.

## Dependencies
- `TEST-CacheLite-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interface/base class for `LM`.

## Implementation Checklist
- [ ] Create or enhance `MockLM` (or `DummyLM` equivalent):
    - Add a `callCount` property.
    - Increment `callCount` within its `__call__` (or `request`) method.
    - Allow it to return configurable responses.
- [ ] Create helper utilities for managing temporary directories for disk cache tests:
    - `setupTempCacheDir(): string` (creates a temp dir and returns path).
    - `cleanupTempCacheDir(path: string)` (removes the temp dir).
- [ ] Integrate these mocks and utilities into `LiteLLMCache.test.ts`.

## Verification Steps
- Mocks and test utilities simplify LiteLLM Caching test code.
- Tests using `MockLM` can accurately determine cache hits/misses.
- Temporary directory utilities work correctly for disk cache tests.

## Decision Authority
- Independent: Implementation details of mocks and utilities.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- Final API of `LM` client.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Initial `MockLM` can be simple, with more sophisticated behavior (e.g., simulating different LM errors) added if needed.

## Status
Not Started

## Notes
Careful mocking of LM calls is essential for testing caching logic effectively.
For broader context, see [Epic Overview: LiteLLM Caching Tests Conversion (TEST-CachingLitellmTests)](../../docs/planning/workplans/TEST-CachingLitellmTests.md).