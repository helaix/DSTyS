# Workplan: Adapt LiteLLM Cache Tests for TypeScript & Effect

## Task ID
TEST-CacheLite-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python LiteLLM Caching tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if caching operations become effectful.

## Proposed Implementation
- For each placeholder test in `tests/caching/LiteLLMCache.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock LM calls, configurations) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Handle setup/teardown of temporary cache directories for disk cache tests (e.g., using Node.js `fs` module within `beforeEach`/`afterEach`).
    - If caching operations return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/caching/LiteLLMCache.test.ts`.
- TypeScript, Vitest, Effect.
- Mock implementations for `LM` client.
- Node.js `fs` module for disk cache tests.

## Dependencies
- `TEST-CacheLite-03-CreateTSFiles` (Placeholder test files).
- `TEST-CacheLite-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `LM` client interface/class.

## Implementation Checklist
- [ ] Iterate through each placeholder test in `LiteLLMCache.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `dspy.settings.configure_cache(...)` appropriately for each test.
    - Create mock `LM` instances.
    - Simulate LM calls and check for cache hits/misses by asserting the number of actual LM invocations.
- [ ] Implement tests for in-memory caching.
- [ ] Implement tests for disk caching, including setup/teardown of temporary directories.
- [ ] Test cache key generation logic if it's exposed or testable indirectly.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted LiteLLM Caching tests should initially fail.
- Test logic should be clear and target intended caching behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How the DSTyS caching mechanism will be configured and interact with `LM` clients.

### Non-blocking
- Specific error types for cache-related failures.

## Acceptable Tradeoffs
- Initial tests might focus on in-memory caching, with disk caching tests added once file system interactions are robustly handled in tests.

## Status
Not Started

## Notes
This is the core test conversion for the LiteLLM Caching component.
For broader context, see [Epic Overview: LiteLLM Caching Tests Conversion (TEST-CachingLitellmTests)](../../docs/planning/workplans/TEST-CachingLitellmTests.md).