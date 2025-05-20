# Workplan: Signature Class Definition

## Task ID
CORE-SigImpl-01-ClassDef

## Problem Statement
Define the core `Signature` class in TypeScript. This class will encapsulate the input and output fields of a DSPy module, along with instructional text (docstring). It needs to manage collections of `Field` objects and provide a way to represent the overall contract of a module.

## Proposed Implementation
- Define a `Signature` class.
- It will internally store:
    - `input_fields: Record<string, Field<any>>`
    - `output_fields: Record<string, Field<any>>`
    - `instructions: string` (derived from the class docstring or explicitly set).
- The constructor (or a factory method) will parse a signature definition (either string-based like "question -> answer" or a more structured format like a Pydantic-style class definition) to populate these fields.
- Provide properties or methods to access `input_fields`, `output_fields`, `instructions`, and all `fields`.
- Implement a `toString()` or `repr()` method that gives a clear representation of the signature (e.g., "Signature(question -> answer)").
- Testing: Unit tests will verify class instantiation from various definition formats, correct storage of fields and instructions, and accurate representation.

## Components Involved
- `source/signatures/Signature.ts` (new or to be modified)
- `source/signatures/Field.ts`
- TypeScript type definitions

## Dependencies
- `SETUP-ProjStruct-02-TSConfig`
- `CORE-FieldImpl-01-TypeDef` (Field class/interface definition)

## Implementation Checklist
- [ ] Define the `Signature` class structure.
- [ ] Implement internal storage for `input_fields`, `output_fields`, and `instructions`.
- [ ] Design and implement constructor(s) or factory method(s) to initialize a `Signature` from:
    - A string definition (e.g., "in1, in2 -> out1"). (Initial parsing might be basic).
    - A Pydantic-like class definition (this is the more robust approach in Python DSPy).
- [ ] Implement getter properties for `input_fields`, `output_fields`, `fields`, and `instructions`.
- [ ] Implement `__repr__` or a similar method for string representation.
- [ ] Add JSDoc comments for all public APIs.
- [ ] Write unit tests for:
    - Instantiation from string.
    - Instantiation from a class-like structure (if pursuing this pattern).
    - Correct parsing and storage of input/output fields.
    - Correct extraction/storage of instructions.

## Verification Steps
- Run unit tests for `Signature.ts`.
- Ensure `Signature` objects are correctly instantiated from different definition styles.
- Verify that fields and instructions are stored and accessible as expected.
- Code review for clarity, type safety, and adherence to TypeScript best practices.

## Decision Authority
- Independent: Internal data structures for storing fields.
- User Input: The primary mechanism for class-based signature definition in TypeScript (e.g., decorators, Pydantic-like base class, builder pattern). Python DSPy uses metaclasses.

## Questions/Uncertainties
### Blocking
- Choosing and implementing the TypeScript equivalent of Python's metaclass-based Signature definition for class-style signatures. This is a significant design decision.

### Non-blocking
- The complexity of parsing type information from string-based signatures (e.g., "text:string -> sentiment:boolean").

## Acceptable Tradeoffs
- Initial string-based signature parsing might only support field names, with type parsing deferred or simplified.
- The class-based definition might initially be less dynamic than Python's, prioritizing explicitness.

## Status
Not Started

## Notes
The `Signature` class is central to DSPy's declarative programming model. Its design will heavily influence developer experience.
For broader context, see [Epic Overview: Signature Implementation (CORE-SignatureImplementation)](../../docs/planning/workplans/CORE-SignatureImplementation.md).