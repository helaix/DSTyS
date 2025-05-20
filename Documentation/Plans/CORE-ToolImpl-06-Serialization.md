# Workplan: Tool Definition Serialization

## Task ID
CORE-ToolImpl-06-Serialization

## Problem Statement
Implement a way to serialize the *definition* of a `Tool` (name, description, input schema) into a JSON-compatible format. This is primarily for LMs to understand what tools are available and how to use them, not for saving/loading executable tool state.

## Proposed Implementation
- Add a method to the `Tool` class, e.g., `getDefinition(): SerializedToolDef`.
    - `SerializedToolDef` would be an interface like:
      ```typescript
      interface SerializedToolDef {
        name: string;
        description: string;
        inputSchema: JsonSchema; // Standard JSON Schema representation of the Zod input schema
      }
      ```
- This method will:
    1. Return the tool's `name` and `description`.
    2. Convert the tool's Zod `inputSchema` into a standard JSON Schema object. Libraries like `zod-to-json-schema` can be used for this.
- This serialized definition can then be provided to LMs (e.g., by `ReAct`) as part of the prompt or function-calling API.
- Note: This is *not* about serializing the `func` itself, which is generally not feasible or safe. It's about serializing the tool's *interface*.
- Testing: Test that `getDefinition()` produces a correct and valid JSON Schema for various tool input schemas.

## Components Involved
- `source/primitives/Tool.ts`
- `zod-to-json-schema` library (or similar)

## Dependencies
- `CORE-ToolImpl-01-ClassDef` (Tool class definition, including `inputSchema`)
- `zod-to-json-schema` library installed

## Implementation Checklist
- [ ] Add `zod-to-json-schema` as a project dependency.
- [ ] Define the `SerializedToolDef` interface.
- [ ] Implement the `getDefinition(): SerializedToolDef` method in the `Tool` class.
    - Use `zodToJsonSchema(this.inputSchema)` to convert the Zod schema.
- [ ] Write unit tests for `getDefinition()`:
    - Test with tools having simple primitive arguments.
    - Test with tools having object arguments.
    - Test with tools having optional arguments and arguments with descriptions.
    - Verify the output conforms to the `SerializedToolDef` interface and that `inputSchema` is valid JSON Schema.

## Verification Steps
- Run unit tests for `Tool.ts` focusing on `getDefinition()`.
- Confirm that the generated JSON schema accurately represents the tool's Zod input schema.
- Ensure the output is suitable for consumption by LMs (e.g., for function calling).

## Decision Authority
- Independent: Choice of library for Zod to JSON Schema conversion.
- User Input: None.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Ensuring the JSON Schema output is compatible with various LM providers' function calling APIs if that's a target.

## Acceptable Tradeoffs
- The generated JSON Schema might initially not include all possible Zod refinements if the conversion library has limitations, but should cover common cases.

## Status
Not Started

## Notes
This serialization of the tool's interface is key for enabling LMs to correctly understand and invoke tools.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).