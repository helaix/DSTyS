# Workplan: Implement Field Constraints

## Task ID
CORE-FieldImpl-05-Constraints

## Problem Statement
Implement support for defining and validating constraints on `Field` values, beyond basic type checking. This includes constraints like min/max length for strings, min/max values for numbers, patterns (regex), etc. These constraints should be specifiable when defining a `Field` and automatically checked during validation.

## Proposed Implementation
- Leverage Zod's built-in constraint capabilities. When a Zod schema is provided to a `Field` (as per `CORE-FieldImpl-03-ZodIntegration`), it can already include constraints (e.g., `z.string().min(5)`, `z.number().positive()`).
- The primary work here is to ensure that:
    1. The `Field` definition and its factory/constructor make it easy and idiomatic to pass Zod schemas with constraints.
    2. The `validate` method (using the Zod schema) correctly enforces these constraints, and `FieldValidationError` reports constraint violations clearly.
    3. Documentation and examples clearly show how to define Fields with various constraints using Zod.
- No new constraint logic needs to be implemented in `Field.ts` itself if Zod handles it. The task is about seamless integration and clear error reporting.
- Testing: Write unit tests with Fields defined using Zod schemas that include various constraints. Test with values that meet and violate these constraints, verifying correct validation outcomes and error messages.

## Components Involved
- `source/signatures/Field.ts`
- Zod library

## Dependencies
- `CORE-FieldImpl-03-ZodIntegration` (Zod schema integration in Field)
- `CORE-FieldImpl-04-EffectIntegration` (for reporting constraint violations via `FieldValidationError`)

## Implementation Checklist
- [ ] Review `Field` factory/constructor: ensure it's straightforward to pass Zod schemas with constraints (e.g., `createField(z.string().min(5).max(100), ...)`).
- [ ] Review `validate` method: ensure Zod errors arising from constraint violations are correctly translated into `FieldValidationError`. The error message should ideally indicate the nature of the constraint violation.
- [ ] Add JSDoc examples for defining Fields with common constraints (min/max length, numerical ranges, regex patterns).
- [ ] Write unit tests for constraint validation:
    - String length constraints (`min`, `max`).
    - Numerical range constraints (`gt`, `lt`, `gte`, `lte`, `positive`, `negative`).
    - Regex pattern matching for strings.
    - Enum constraints (if using `z.enum`).
    - Array constraints (e.g., `min`, `max` length for arrays).
    - Verify clear error messages for each type of constraint violation.

## Verification Steps
- Run unit tests for `Field.ts` focusing on constraint validation.
- Confirm that various Zod constraints are correctly enforced by the `Field`'s validation mechanism.
- Ensure that error messages for constraint violations are informative.

## Decision Authority
- Independent: How Zod error details for constraints are mapped to `FieldValidationError` messages.
- User Input: If any constraints not directly supported by Zod are required (unlikely and out of scope for this core task).

## Questions/Uncertainties
### Blocking
- None, as this largely relies on existing Zod functionality.

### Non-blocking
- Ensuring a consistent level of detail in error messages across different types of Zod constraints.

## Acceptable Tradeoffs
- Focus on common constraints initially; highly esoteric Zod refinements can be documented as advanced usage.

## Status
Not Started

## Notes
This task makes `Field` definitions more expressive and powerful by leveraging Zod's rich constraint system.
For broader context, see [Epic Overview: Field Implementation (CORE-FieldImplementation)](../../docs/planning/workplans/CORE-FieldImplementation.md).