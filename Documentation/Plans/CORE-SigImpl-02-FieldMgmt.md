# Workplan: Signature Input and Output Field Management

## Task ID
CORE-SigImpl-02-FieldMgmt

## Problem Statement
Implement the mechanisms within the `Signature` class for managing its collections of input and output `Field` objects. This includes how fields are added during signature definition and how they are accessed.

## Proposed Implementation
- Based on the chosen definition style (string-based or class-based from `CORE-SigImpl-01-ClassDef`):
    - **String-based**: The parser will populate `input_fields` and `output_fields` dictionaries.
    - **Class-based (Pydantic-like)**: Fields declared as class attributes (e.g., `question: Field<string> = new InputField(...)`) will be collected into `input_fields` and `output_fields` during class construction (possibly via a base class constructor or decorators).
- Ensure `input_fields` and `output_fields` store `Field` instances, keyed by field name.
- The `fields` property should return a combined dictionary of input and output fields, maintaining a defined order (e.g., inputs first, then outputs, preserving declaration order within each).
- Testing: Verify that fields are correctly parsed/collected and stored based on the definition style. Test access to `input_fields`, `output_fields`, and `fields`.

## Components Involved
- `source/signatures/Signature.ts`
- `source/signatures/Field.ts`

## Dependencies
- `CORE-SigImpl-01-ClassDef` (Signature class definition)
- `CORE-FieldImpl-01-TypeDef` (Field class/interface definition)
- `CORE-FieldImpl-02-InputOutput` (InputField/OutputField differentiation)

## Implementation Checklist
- [ ] Implement logic in `Signature` constructor/factory to populate `this.input_fields` and `this.output_fields` based on the signature definition (string or class-based).
    - For string parsing: split by "->", then parse field names (and types, if supported).
    - For class-based: iterate through class properties, identify `Field` instances, and categorize them as input/output based on their type (`InputField` vs. `OutputField`).
- [ ] Ensure `Field` instances are correctly created with their metadata (prefix, description) if not explicitly provided in the definition (e.g., infer prefix from field name).
- [ ] Implement the `fields` getter to return a combined, ordered collection of all fields.
- [ ] Write unit tests:
    - Test population of `input_fields` and `output_fields` from string definitions.
    - Test population from class-based definitions (once that pattern is chosen).
    - Verify correct order in `fields` property.
    - Test handling of fields with and without explicit prefixes/descriptions.

## Verification Steps
- Run unit tests for `Signature.ts` focusing on field management.
- Confirm that `input_fields`, `output_fields`, and `fields` are correctly populated and accessible.
- Ensure field metadata (prefix, description) is correctly initialized or inferred.

## Decision Authority
- Independent: Internal parsing logic for string signatures. Mechanism for collecting fields in class-based signatures.
- User Input: None, assuming alignment with Python DSPy's field categorization.

## Questions/Uncertainties
### Blocking
- If using a class-based definition, the mechanism for introspecting class attributes to find `Field` declarations (e.g., decorators, static initialization block, base class constructor logic).

### Non-blocking
- Handling of duplicate field names (should likely error).

## Acceptable Tradeoffs
- String-based signature parsing might initially not support inline type definitions (e.g., "query:string") and only parse names, relying on later type inference or explicit `Field` objects for types.

## Status
Not Started

## Notes
Accurate field management is crucial for modules to understand their expected inputs and outputs.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).