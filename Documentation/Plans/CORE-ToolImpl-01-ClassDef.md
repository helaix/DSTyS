# Workplan: Tool Class Definition

## Task ID
CORE-ToolImpl-01-ClassDef

## Problem Statement
Define the `Tool` class in TypeScript. This class will wrap user-provided functions, making them usable by DSPy modules like `ReAct`. It needs to store metadata about the tool (name, description, argument schema) and provide an execution interface.

## Proposed Implementation
- Define a `Tool` class.
- Constructor will take:
    - `name: string`
    - `description: string`
    - `func: (...args: any[]) => any` (the actual function to execute)
    - `inputSchema: Zod.ZodObject<any>` (or a similar schema representation for input arguments).
- Store these properties internally.
- The `inputSchema` will define the names, types, and descriptions of the arguments the tool's function expects. This schema is crucial for LMs to generate correct arguments for the tool.
- Implement methods to access the tool's metadata (name, description, input schema).
- Testing: Unit tests will verify class instantiation and correct storage/retrieval of metadata.

## Components Involved
- `source/primitives/Tool.ts` (new or to be modified)
- Zod library (for `inputSchema`)

## Dependencies
- `SETUP-ProjStruct-02-TSConfig`
- Zod library installed

## Implementation Checklist
- [ ] Define the `Tool` class structure with properties for `name`, `description`, `func`, and `inputSchema`.
- [ ] Implement the constructor to initialize these properties.
- [ ] Add getter methods or public accessors for `name`, `description`, and `inputSchema`.
- [ ] Add JSDoc comments for the class and its public members.
- [ ] Write unit tests for:
    - `Tool` instantiation with valid inputs.
    - Correct storage and retrieval of `name`, `description`, and `inputSchema`.
    - Handling of different types of functions (sync, async - though execution is separate).

## Verification Steps
- Run unit tests for `Tool.ts` focusing on class definition and metadata.
- Ensure `Tool` objects are correctly instantiated and metadata is accessible.
- Code review for clarity, type safety, and adherence to TypeScript best practices.

## Decision Authority
- Independent: Internal storage of metadata.
- User Input: The exact format/type for `inputSchema` (e.g., raw Zod schema, or a custom interface that can generate a Zod schema). Using Zod directly is probably best.

## Questions/Uncertainties
### Blocking
- How `inputSchema` will be derived from user functions if not explicitly provided. Python DSPy uses `inspect` and docstring parsing. TypeScript will likely need more explicit schema definition or a Pydantic-like approach for function arguments. (This is partly covered in `CORE-ToolImpl-03-ArgParsing`). For this task, assume `inputSchema` is provided.

### Non-blocking
- None.

## Acceptable Tradeoffs
- The constructor might initially require an explicit `inputSchema`, with schema inference from function signatures being a more advanced feature.

## Status
Not Started

## Notes
The `Tool` class definition is the first step towards enabling external function calls in DSPy programs.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).