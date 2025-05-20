# Workplan: Signature Creation Utilities (String & Class-based)

## Task ID
CORE-SigImpl-03-CreationUtils

## Problem Statement
Provide flexible and user-friendly ways to create `Signature` instances. This includes robust parsing for string-based definitions (e.g., "context, question -> answer") and a clear pattern for class-based definitions that allow for typed fields and detailed metadata.

## Proposed Implementation
- **String-based Creation**:
    - Enhance the `Signature` constructor or a factory (e.g., `Signature.fromString(str)`) to parse strings like "in1, in2:int -> out1:string, out2".
    - The parser should identify input and output field names.
    - Optionally, parse basic type annotations (e.g., `:string`, `:int`, `:bool`, `:list[str]`) and map them to appropriate Zod schemas for the `Field` objects.
    - Automatically infer prefixes and default descriptions for fields.
- **Class-based Creation (Pydantic-like)**:
    - Define a base `Signature` class that users can extend.
    - Users will declare fields as class attributes, typed and initialized with `InputField(...)` or `OutputField(...)`.
        ```typescript
        class MyQA extends Signature {
          context: string = new InputField({ description: "..." });
          question: string = new InputField();
          answer: string = new OutputField();
          constructor() { super("context, question -> answer", "Instructions..."); } // Or auto-infer from fields
        }
        ```
    - The `Signature` base class constructor (or a metaclass/decorator equivalent in TS) will introspect these attributes to populate `input_fields` and `output_fields`.
    - The class docstring will become the `instructions`.
- Implement utilities for manipulating signatures:
    - `sig.with_instructions(new_instructions)`: Returns a new Signature with updated instructions.
    - `sig.with_updated_fields(fieldName, new_metadata)`: Returns a new Signature with one field's metadata updated.
    - `sig.append(fieldName, fieldType, fieldInstance)` / `prepend(...)` / `insert(...)` / `delete(...)`: For adding/removing fields.
- Testing: Test both creation methods extensively. For string parsing, test various valid and invalid formats. For class-based, test field discovery and instruction extraction. Test all manipulation utilities.

## Components Involved
- `source/signatures/Signature.ts`
- `source/signatures/Field.ts`

## Dependencies
- `CORE-SigImpl-01-ClassDef`
- `CORE-SigImpl-02-FieldMgmt`
- `CORE-FieldImpl-01-TypeDef`

## Implementation Checklist
- [ ] Implement/refine string-based signature parsing in `Signature` constructor/factory:
    - Handle multiple comma-separated input/output field names.
    - Implement basic type annotation parsing (e.g., `fieldName:type`).
    - Map parsed types to default Zod schemas (e.g., `string` -> `z.string()`).
- [ ] Design and implement class-based signature definition:
    - Users extend `Signature`.
    - `Signature` base constructor introspects declared `InputField`/`OutputField` attributes.
    - Class docstring becomes `instructions`.
- [ ] Implement `with_instructions(new_instructions)`.
- [ ] Implement `with_updated_fields(fieldName, new_metadata)`.
- [ ] Implement `append(name, field, type_)`, `prepend(...)`, `insert(...)`, `delete(...)`.
- [ ] Write comprehensive unit tests for all creation and manipulation utilities.

## Verification Steps
- Run unit tests for `Signature.ts`.
- Verify signatures can be created correctly from various string formats, including type annotations.
- Verify class-based signatures correctly initialize fields and instructions.
- Confirm all manipulation utilities produce correct new `Signature` instances without mutating originals.

## Decision Authority
- Independent: Internal parsing logic for strings, introspection logic for classes.
- User Input: The exact syntax and conventions for class-based signature definitions to ensure developer-friendliness.

## Questions/Uncertainties
### Blocking
- The TypeScript mechanism for class-based field introspection (decorators might be an option, or relying on conventions for attributes of type `InputField`/`OutputField`).

### Non-blocking
- Support for very complex nested types in string definitions (e.g., `List[Dict[str, Union[int, string]]]` might be limited initially).

## Acceptable Tradeoffs
- String parsing might initially support a simpler subset of type annotations.
- Class-based definitions are likely the more robust and recommended approach for complex signatures.

## Status
Not Started

## Notes
Providing ergonomic ways to define signatures is key to DSPy's usability.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).