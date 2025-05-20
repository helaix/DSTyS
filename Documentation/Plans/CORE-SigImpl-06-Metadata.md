# Workplan: Signature Metadata (Instructions) and Documentation

## Task ID
CORE-SigImpl-06-Metadata

## Problem Statement
Implement mechanisms for `Signature` objects to store and manage overall instructional text (docstrings) and potentially support automated documentation generation based on field metadata.

## Proposed Implementation
- **Instructions (Docstrings)**:
    - For class-based signatures, the class's docstring will serve as the `instructions`. The `Signature` base class (or its construction logic) needs to capture this.
    - For string-based signatures, instructions can be passed as an optional second argument to the constructor/factory (e.g., `Signature("q -> a", "Answer the question.")`).
    - The `instructions` property on a `Signature` instance should provide access to this text.
    - The `with_instructions(new_instructions)` method allows creating a new `Signature` with updated instructions.
- **Field Metadata for Docs**:
    - `Field` objects already store `description` and `prefix`. This information, along with field names and types, can be used to generate a textual representation of the signature's schema.
    - Implement a method like `signature.toString(verbose: boolean = false)` or `signature.document()` that generates a human-readable summary of the signature, including its instructions and a formatted list of input/output fields with their descriptions and types.
- Testing:
    - Test that instructions are correctly captured from class docstrings and string constructor arguments.
    - Test `with_instructions` method.
    - Test the documentation generation method for clarity and completeness.

## Components Involved
- `source/signatures/Signature.ts`
- `source/signatures/Field.ts`

## Dependencies
- `CORE-SigImpl-01-ClassDef`
- `CORE-SigImpl-02-FieldMgmt`
- `CORE-FieldImpl-01-TypeDef`

## Implementation Checklist
- [ ] Ensure `Signature` constructor (for class-based) captures the class docstring as `instructions`.
- [ ] Ensure `Signature` constructor/factory (for string-based) accepts an optional `instructions` argument.
- [ ] Implement `instructions` getter property.
- [ ] Implement `with_instructions(new_instructions)` method.
- [ ] Implement `toString(verbose?: boolean)` or `document()` method:
    - Include overall instructions.
    - Iterate through `input_fields` and `output_fields`.
    - For each field, format its name, type (from Zod schema or annotation), prefix, and description.
- [ ] Write unit tests for:
    - Instruction capture from both definition styles.
    - `with_instructions` method.
    - `toString`/`document` method output for various signatures.

## Verification Steps
- Run unit tests for `Signature.ts` focusing on metadata and documentation.
- Confirm instructions are correctly managed.
- Verify the string representation/documentation of the signature is accurate and readable.

## Decision Authority
- Independent: Formatting details of the `toString`/`document` output.
- User Input: None anticipated.

## Questions/Uncertainties
### Blocking
- For class-based signatures, the TypeScript mechanism to reliably access the class docstring during instance construction (might require conventions or passing it to `super()`).

### Non-blocking
- The level of detail in the auto-generated documentation string.

## Acceptable Tradeoffs
- The `toString`/`document` method might initially have a basic format, improvable later.

## Status
Not Started

## Notes
Good metadata and documentation capabilities are important for developer experience and for how `Predict` modules construct prompts.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).