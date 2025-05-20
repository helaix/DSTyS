# Workplan: Configure Effect TS Integration for Testing

## Task ID
TEST-Frmwk-02-EffectIntegration

## Problem Statement
Integrate Effect TS with the Vitest testing framework to enable idiomatic testing of effectful code. This involves setting up utilities or patterns for running Effects within tests and asserting their outcomes.

## Proposed Implementation
- Install `@effect/vitest` if it provides significant advantages, or establish patterns for using `Effect.runPromiseExit` directly.
- Create helper functions or custom matchers (if feasible with Vitest) for common Effect assertions:
    - Asserting an `Effect` succeeds with a specific value.
    - Asserting an `Effect` fails with a specific tagged error.
    - Asserting an `Effect` fails with any error of a certain type.
- Document these patterns for consistent use across all tests involving Effect.
- Create an example test case that uses these Effect testing patterns.

## Components Involved
- Test utility files (e.g., `tests/utils/effectTestHelpers.ts`).
- `vitest.config.ts` (if any global setup for Effect is needed, e.g., for default runtime).
- Example test files demonstrating Effect testing.

## Dependencies
- `TEST-Frmwk-01-SetupVitest` (Vitest is set up).
- Effect library installed.

## Implementation Checklist
- [ ] Evaluate `@effect/vitest` vs. direct `Effect.runPromiseExit` usage. Decide on primary approach.
- [ ] If using `@effect/vitest`, install it and configure as per its documentation.
- [ ] If using `Effect.runPromiseExit`:
    - Create helper functions, e.g.:
      ```typescript
      // async function expectEffectSucceeds<A, E>(effect: Effect.Effect<A, E, any>, expectedValue: A): Promise<void>
      // async function expectEffectFailsWithTag<A, E extends { _tag: string }>(effect: Effect.Effect<A, E, any>, expectedTag: E["_tag"]): Promise<void>
      ```
- [ ] Create an example test file (e.g., `tests/effectExample.test.ts`) that defines a simple Effect and tests its success and failure paths using the chosen patterns.
- [ ] Document the chosen Effect testing patterns with examples.

## Verification Steps
- The example Effect test runs successfully, correctly asserting success and failure cases.
- Helper functions (if created) work as expected.
- Documentation for Effect testing patterns is clear.

## Decision Authority
- Independent: Implementation details of helper functions.
- User Input: Preferred approach (`@effect/vitest` vs. manual `runPromiseExit` patterns).

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- The exact API of helper functions can be refined.

## Acceptable Tradeoffs
- Start with `Effect.runPromiseExit` and basic helpers; `@effect/vitest` can be integrated later if its benefits become compelling.

## Status
Not Started

## Notes
Proper Effect integration in tests is crucial for verifying the behavior of effectful DSTyS components.
For broader context, see [Epic Overview: Testing Framework Setup (TEST-Framework)](../../docs/planning/workplans/TEST-Framework.md).