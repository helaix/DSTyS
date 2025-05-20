# Workplan: Adapt dspy.cache Tests for TypeScript & Effect

## Task ID
TEST-CliCache-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python `dspy.cache` tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if cache operations become effectful.

## Proposed Implementation
- For each placeholder test in `tests/clients/Cache.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock functions to be cached, request objects) and expected outcomes.
    - Use `expect` assertions from Vitest.
    - Handle setup/teardown of temporary cache directories for disk cache tests.
    - Test the TypeScript equivalent of the `@request_cache` decorator.
    - If caching operations return `Effect` objects, use `Effect.runPromiseExit` or helpers to test.
    - Ensure type safety in test code.

## Components Involved
- `tests/clients/Cache.test.ts`.
- TypeScript, Vitest, Effect.
- Mock functions for testing caching.
- Node.js `fs` module for disk cache tests.

## Dependencies
- `TEST-CliCache-03-CreateTSFiles` (Placeholder test files).
- `TEST-CliCache-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS `Cache` class and `@requestCache` decorator (or equivalents).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Cache.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `Cache` instances with different configurations (memory, disk, both, none).
    - Test `cache.put()` and `cache.get()`.
    - Test cache key generation logic (indirectly or directly if exposed).
    - Test error handling for unserializable objects.
    - Test `cache.reset_memory_cache()`, `cache.save_memory_cache()`, `cache.load_memory_cache()`.
    - Test the `@requestCache` decorator (or its TS equivalent) with sync and async functions.
- [ ] Implement tests for disk caching, including temporary directory management.
- [ ] For effectful operations, test success and failure paths using Effect patterns.

## Verification Steps
- All converted `dspy.cache` tests should initially fail.
- Test logic should be clear and target intended caching behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- The exact API and implementation details of the DSTyS `Cache` class and `@requestCache` decorator.

### Non-blocking
- Specific error types for cache-related failures.

## Acceptable Tradeoffs
- Initial tests might focus on core `put`/`get` and decorator behavior, with more complex scenarios (like cache eviction policies if implemented) tested iteratively.

## Status
Not Started

## Notes
This is the core test conversion for the `dspy.cache` component.
For broader context, see [Epic Overview: dspy.cache Tests Conversion (TEST-ClientsCacheTests)](../../docs/planning/workplans/TEST-ClientsCacheTests.md).