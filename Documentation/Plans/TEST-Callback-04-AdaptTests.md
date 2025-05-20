# Workplan: Adapt Callback System Tests for TypeScript & Effect

## Task ID
TEST-Callback-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python Callback System tests into the placeholder TypeScript/Vitest test cases. This involves translating Python code to TypeScript, adapting for static typing, and integrating Effect TS patterns if callback operations or the modules they observe are effectful.

## Proposed Implementation
- For each placeholder test in `tests/utils/Callback.test.ts`:
    - Translate the corresponding Python test logic into TypeScript.
    - Define necessary input data (mock Modules, LMs, Tools, callback handlers) and expected outcomes.
    - Use `expect` assertions from Vitest, and `vi.fn()` for spying on callback method calls.
    - If observed operations return `Effect` objects, ensure tests correctly handle asynchronous Effect execution.
    - Ensure type safety in test code.

## Components Involved
- `tests/utils/Callback.test.ts`.
- TypeScript, Vitest, Effect.
- Mock implementations for `Module`, `LM`, `Tool`, and custom callback handlers.

## Dependencies
- `TEST-Callback-03-CreateTSFiles` (Placeholder test files).
- `TEST-Callback-05-CreateMocks` (Mocks for dependencies).
- Core DSTyS interfaces/classes (`Module`, `LM`, `Tool`, `BaseCallback`).

## Implementation Checklist
- [ ] Iterate through each placeholder test in `Callback.test.ts`.
- [ ] Implement the test logic based on the original Python test.
    - Set up `dspy.settings.configure({ callbacks: [...] })` with mock callback handlers.
    - Create mock `Module`, `LM`, or `Tool` instances.
    - Trigger operations that should invoke callbacks (e.g., `module.forward()`, `lm()`, `tool()`).
    - Assert that callback methods were called with expected arguments and in the correct order using `vi.fn()` spies.
- [ ] Test different callback events (on_module_start/end, on_lm_start/end, on_tool_start/end, etc.).
- [ ] Test error handling within callbacks or observed modules.
- [ ] Test `ACTIVE_CALL_ID` propagation if applicable.

## Verification Steps
- All converted Callback System tests should initially fail.
- Test logic should be clear and target intended callback behavior.
- Type errors in test code should be resolved.

## Decision Authority
- Independent: Specific assertion styles, test data generation.
- User Input: Clarification on Python test behavior if ambiguous.

## Questions/Uncertainties
### Blocking
- How the `@with_callbacks` decorator or equivalent mechanism is implemented in DSTyS.
- How `dspy.settings.callbacks` is managed and accessed in a type-safe way.

### Non-blocking
- Specific error types for callback-related failures.

## Acceptable Tradeoffs
- Initial tests might focus on core event triggering, with more complex scenarios (e.g., nested calls, async callbacks) tested iteratively.

## Status
Not Started

## Notes
This is the core test conversion for the Callback System component.
For broader context, see [Epic Overview: Callback System Tests Conversion (TEST-CallbackTests)](../../docs/planning/workplans/TEST-CallbackTests.md).