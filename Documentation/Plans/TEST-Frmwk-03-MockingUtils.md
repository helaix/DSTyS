# Workplan: Set up Mocking Utilities

## Task ID
TEST-Frmwk-03-MockingUtils

## Problem Statement
Establish mocking capabilities within the Vitest framework to allow for isolated unit testing. This includes mocking external dependencies, internal modules, and specific functions.

## Proposed Implementation
- Leverage Vitest's built-in mocking features (`vi.mock`, `vi.fn`, `vi.spyOn`).
- Create guidelines or examples for:
    - Mocking entire modules (e.g., an LM client).
    - Mocking specific functions within a module.
    - Spying on function calls.
    - Providing mock implementations for Effect Layers (e.g., `Layer.succeed(ServiceTag, mockService)`).
- Document patterns for resetting mocks between tests (e.g., using `beforeEach(() => { vi.resetAllMocks(); })`).
- Create an example test that demonstrates various mocking techniques.

## Components Involved
- Test utility files or documentation sections.
- Example test files showcasing mocking.

## Dependencies
- `TEST-Frmwk-01-SetupVitest` (Vitest is set up).

## Implementation Checklist
- [ ] Document how to use `vi.mock` for module-level mocking.
    - Provide an example of mocking an external library.
- [ ] Document how to use `vi.fn` to create mock functions and assert calls.
- [ ] Document how to use `vi.spyOn` to spy on or partially mock object methods.
- [ ] Document how to mock Effect Layers for dependency injection in tests.
    - Example: `Effect.provide(Layer.succeed(MyServiceTag, { mockMethod: () => Effect.succeed("mocked") }))`
- [ ] Document best practices for resetting mocks (e.g., in `beforeEach` or `afterEach`).
- [ ] Create an example test file demonstrating these mocking techniques.

## Verification Steps
- The example test using mocks runs successfully.
- Mocks behave as expected (e.g., calls are tracked, mock implementations are used).
- Documentation on mocking is clear and provides useful examples.

## Decision Authority
- Independent: Specific examples chosen for documentation.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Advanced mocking scenarios (e.g., mocking time, complex class mocks) can be documented later.

## Acceptable Tradeoffs
- Focus on common mocking patterns initially.

## Status
Not Started

## Notes
Effective mocking is essential for writing focused and reliable unit tests.
For broader context, see [Epic Overview: Testing Framework Setup (TEST-Framework)](../../docs/planning/workplans/TEST-Framework.md).