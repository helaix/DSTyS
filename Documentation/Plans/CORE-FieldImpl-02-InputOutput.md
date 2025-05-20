# Workplan: Implement InputField and OutputField

## Task ID
CORE-FieldImpl-02-InputOutput

## Problem Statement
Differentiate between input and output fields within DSPy Signatures. While Python DSPy uses `InputField` and `OutputField` classes that inherit from `Field`, TypeScript might achieve this differentiation differently, possibly through dedicated types, interfaces, or by using the base `Field` type with a discriminator.

## Proposed Implementation
- Based on the `CORE-FieldImpl-01-TypeDef` task, decide on the mechanism for differentiating InputFields and OutputFields.
    - Option A: Create `InputField<T>` and `OutputField<T>` types/classes that extend or use the base `Field<T>`.
    - Option B: Add a discriminator property (e.g., `kind: 'input' | 'output'`) to the base `Field<T>` type.
    - Option C: Use separate factory functions (e.g., `createInputField<T>(...)`, `createOutputField<T>(...)`) that return `Field<T>` instances with appropriate internal flags or metadata.
- Implement the chosen mechanism.
- Ensure that `Signature` definitions can clearly specify whether a field is an input or an output.
- Testing: Write unit tests to verify that InputFields and OutputFields can be created and correctly identified. Test any specific properties or behaviors unique to input or output fields if they exist.

## Components Involved
- `source/signatures/Field.ts`
- `source/signatures/Signature.ts` (for how it consumes these field types)

## Dependencies
- `CORE-FieldImpl-01-TypeDef` (base Field definition)

## Implementation Checklist
- [ ] Evaluate options for differentiating Input/Output fields and select one.
- [ ] Implement `InputField` and `OutputField` concepts (as distinct types/classes or via discriminators/factories).
- [ ] If distinct types/classes, ensure they correctly utilize or extend the base `Field` definition.
- [ ] Update factory functions or constructors as needed.
- [ ] Write unit tests to:
    - Create `InputField` instances.
    - Create `OutputField` instances.
    - Verify that they can be distinguished (e.g., by type, by a `kind` property).
    - Test any specific logic tied to a field being an input vs. output (if any at this stage).

## Verification Steps
- Run unit tests for `Field.ts`.
- Confirm that InputFields and OutputFields can be created and are correctly typed or identifiable.
- Ensure the chosen differentiation mechanism is clear and easy to use when defining Signatures.

## Decision Authority
- Independent: The specific TypeScript mechanism chosen for differentiation (types, interfaces, discriminators).
- User Input: If there are functional differences required between InputFields and OutputFields beyond their role in a Signature (unlikely for core Field definition).

## Questions/Uncertainties
### Blocking
- Deciding on the most idiomatic and maintainable TypeScript approach for this differentiation.

### Non-blocking
- None.

## Acceptable Tradeoffs
- A simpler discriminator property might be preferred over complex type hierarchies if it achieves the same functional goal for Signatures.

## Status
Not Started

## Notes
This differentiation is crucial for how Signatures are processed and how prompts are constructed by `Predict` modules.
For broader context, see [Epic Overview: Field Implementation (CORE-FieldImplementation)](../../docs/planning/workplans/CORE-FieldImplementation.md).