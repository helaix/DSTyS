# Workplan: Create Mock Implementations for Callback System Tests

## Task ID
TEST-Callback-05-CreateMocks

## Problem Statement
Identify and create necessary mock implementations or test utilities for Callback System tests. This includes mock callback handlers and mock DSPy components (`Module`, `LM`, `Tool`) that can trigger callback events.

## Proposed Implementation
- Review the converted Callback System tests from `TEST-Callback-04-AdaptTests`.
- Create a `MockCallbackHandler` class extending `BaseCallback`:
    - Each `on_*` method will be a `vi.fn()` spy to track calls and arguments.
    - Allows easy assertion of which callback methods were invoked and with what data.
- Create simple mock versions of `Module`, `LM`, and `Tool` if the standard `DummyLM` or basic mocks are insufficient:
    - These mocks need to correctly implement the `@with_callbacks` decorator logic (or its TS equivalent) to trigger callback events.
    - Their `forward` or `__call__` methods should be simple, focusing on triggering callbacks rather than complex logic.
- Place mocks in `tests/utils/mocks/` or alongside `Callback.test.ts`.

## Components Involved
- `tests/utils/Callback.test.ts`.
- `tests/utils/mocks/` (for shared mocks).
- Mock implementations for `BaseCallback`, `Module`, `LM`, `Tool`.

## Dependencies
- `TEST-Callback-04-AdaptTests` (Converted tests will drive the need for specific mock behaviors).
- Interfaces/base classes for `BaseCallback`, `Module`, `LM`, `Tool`.
- Understanding of how `@with_callbacks` will be implemented in TypeScript.

## Implementation Checklist
- [ ] Create `MockCallbackHandler` class:
    - Extends `BaseCallback`.
    - Initializes `vi.fn()` for each `on_*` method (e.g., `this.on_module_start = vi.fn();`).
- [ ] Create `MockObservableModule` (or similar name):
    - Extends `dspy.Module`.
    - Implements a simple `forward` method decorated with `@with_callbacks` (or TS equivalent).
- [ ] Create `MockObservableLM` (or similar):
    - Extends `dspy.LM`.
    - Implements a simple `__call__` method decorated with `@with_callbacks`.
- [ ] Create `MockObservableTool` (or similar):
    - Extends `dspy.Tool`.
    - Implements a simple `__call__` method decorated with `@with_callbacks`.
- [ ] Integrate these mocks into `Callback.test.ts`.

## Verification Steps
- Mocks and test utilities simplify Callback System test code.
- `MockCallbackHandler` correctly spies on callback invocations.
- Mock observable components correctly trigger callback events.

## Decision Authority
- Independent: Implementation details of mocks.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- The TypeScript equivalent of the `@with_callbacks` decorator and how it integrates with class methods.

### Non-blocking
- Mocks can be refined as actual components are implemented.

## Acceptable Tradeoffs
- Initial mock components can have very simple internal logic, focusing only on triggering callbacks.

## Status
Not Started

## Notes
Effective mocking is crucial for testing the intricate event flow of the callback system.
For broader context, see [Epic Overview: Callback System Tests Conversion (TEST-CallbackTests)](../../docs/planning/workplans/TEST-CallbackTests.md).