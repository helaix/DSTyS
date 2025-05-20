# Workplan: Adapt Module Tests for TypeScript & Effect

## Task ID
TEST-ModTests-04-AdaptTests

## Problem Statement
Convert Python `Module` test logic and assertions into the TypeScript/Vitest placeholders, adapting for static typing and Effect TS patterns, especially for the `forward` method.

## Proposed Implementation
- For each placeholder test in `Module.test.ts`:
    - Translate Python test logic to TypeScript.
    - Define mock `Signature`, `Example`, `LM` instances as needed.
    - Test `forward` / `__call__` methods:
        - If `forward` returns an `Effect`, use `Effect.runPromiseExit` or helpers to assert success/failure.
    - Test parameter management (`named_parameters`, `demos`, `lm`).
    - Test state management (`dump_state`, `load_state`, `deepcopy`).
    - Test composition by creating nested module structures.
- Ensure type safety.

## Components Involved
- `tests/primitives/Module.test.ts`.
- TypeScript, Vitest, Effect.

## Dependencies
- `TEST-ModTests-03-CreateTSFiles`.
- `CORE-ModImpl-01-ClassDef` (Initial `Module` definition).
- Mock implementations for `Signature`, `Example`, `LM`.

## Implementation Checklist
- [ ] Iterate through `Module.test.ts` placeholders.
- [ ] Implement test logic based on Python tests.
- [ ] For `forward` method tests:
    - Mock the `forward` implementation of a test `Module` subclass.
    - If it returns `Effect`, test `__call__` by checking the `Exit` state.
- [ ] Test `named_parameters` and `predictors` (may require mock `Predict` instances).
- [ ] Test `setLm`, `setDemos`, `getLm`.
- [ ] Test `dump_state`, `load_state`, `deepcopy`, `reset_copy`.
- [ ] Test module composition scenarios.

## Verification Steps
- Converted `Module` tests initially fail against an incomplete `Module` implementation.
- Test logic is clear and targets intended `Module` behavior.

## Decision Authority
- Independent.
- User Input: Clarification on Python test behavior.

## Questions/Uncertainties
### Blocking
- How `named_parameters` will discover sub-modules/predictors in TypeScript (affects test setup).
- How `Module.forward` signature and `__call__` interaction with Effect are defined.

### Non-blocking
- Specific mock data for demos/LMs.

## Acceptable Tradeoffs
- Some tests might be skipped if they depend on highly dynamic Python features not yet addressed in `CORE-ModImpl`.

## Status
Not Started

## Notes
This is the core test conversion for `Module`.
For broader context, see [Epic Overview: Module Tests Conversion (TEST-ModuleTests)](../../docs/planning/workplans/TEST-ModuleTests.md).