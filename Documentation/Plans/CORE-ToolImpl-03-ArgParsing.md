# Workplan: Tool Argument Parsing and Schema Generation

## Task ID
CORE-ToolImpl-03-ArgParsing

## Problem Statement
Develop a mechanism for `Tool` objects to define and use an input argument schema. This schema is vital for (a) LMs to know what arguments a tool expects and their format, and (b) runtime validation of arguments passed to the tool's `execute` method. Python DSPy infers this from function signatures and docstrings. TypeScript requires a more explicit approach.

## Proposed Implementation
- **Schema Definition**:
    - When a `Tool` is created, its `inputSchema` (e.g., a `Zod.ZodObject<any>`) must be provided or inferred.
    - Option 1 (Explicit): User provides a Zod schema directly to the `Tool` constructor. This is the most robust.
        ```typescript
        const mySchema = z.object({ query: z.string().describe("Search query"), k: z.number().optional() });
        const myTool = new Tool("search", "Performs search", searchFunc, mySchema);
        ```
    - Option 2 (Pydantic-like class for args): User defines a Pydantic-like class for arguments, and `Tool` infers the Zod schema from it. This requires a library or utility to convert Pydantic-style classes to Zod schemas.
    - Option 3 (Limited Inference): Attempt basic inference from TypeScript function signature if types are simple primitives and parameter names are available (runtime reflection is limited). This is likely too fragile.
- **Schema Storage**: The `Tool` class will store this `inputSchema`.
- **Argument Validation**: The `Tool.execute(args: Record<string, any>)` method will use `this.inputSchema.safeParse(args)` to validate and parse the incoming arguments before calling the wrapped function.
- **Metadata for LMs**: The `Tool` class should expose its `inputSchema` (or a JSON schema representation of it) so that agentic modules like `ReAct` can inform the LM about the tool's expected arguments.
- Testing:
    - Test `Tool` creation with explicit Zod schemas.
    - Test argument validation in `execute()`: success with valid args, failure (specific `ArgumentValidationError`) with invalid args (missing required, wrong type).
    - Test schema exposure for LMs.

## Components Involved
- `source/primitives/Tool.ts`
- Zod library
- Effect library (for validation error handling)

## Dependencies
- `CORE-ToolImpl-01-ClassDef` (Tool class definition)
- `CORE-ToolImpl-04-ErrorHandling` (for `ArgumentValidationError`)

## Implementation Checklist
- [ ] Decide on the primary mechanism for defining `inputSchema` (explicit Zod schema is recommended for robustness).
- [ ] Update `Tool` constructor to accept and store the `inputSchema`.
- [ ] Implement argument validation logic within the `Tool.execute()` method using the stored `inputSchema.safeParse()`.
    - If validation fails, return `Effect.fail(new ArgumentValidationError(...))`.
- [ ] Add a method to `Tool` (e.g., `getInputJsonSchema()`) that returns a standard JSON schema representation of its `inputSchema` for LM consumption.
- [ ] Write unit tests:
    - Tool creation with various explicit Zod schemas (objects with different field types, optional fields).
    - `execute()` with valid arguments that match the schema.
    - `execute()` with invalid arguments (missing required, wrong type, extra fields if schema is strict) and verify correct `ArgumentValidationError`.
    - `getInputJsonSchema()` returns a correct JSON schema.

## Verification Steps
- Run unit tests for `Tool.ts` focusing on argument schema and validation.
- Confirm tools correctly validate input arguments against their schemas.
- Ensure validation errors are specific and helpful.
- Verify that the exposed JSON schema is accurate for LM use.

## Decision Authority
- Independent: Internal implementation of validation within `execute`.
- User Input: The preferred method for users to define tool argument schemas (explicit Zod vs. Pydantic-like class). Explicit Zod is safer.

## Questions/Uncertainties
### Blocking
- If pursuing schema inference from TS function signatures: the limitations of runtime type reflection in TypeScript. This is why explicit Zod schemas are preferred.

### Non-blocking
- How to best represent argument descriptions within the Zod schema so they can be extracted for the JSON schema for LMs (Zod's `.describe()` method).

## Acceptable Tradeoffs
- Prioritize explicit Zod schema definition for reliability, even if it's slightly more verbose for users than full inference. Schema inference can be an enhancement later.

## Status
Not Started

## Notes
A well-defined argument schema and robust validation are critical for reliable tool use by LMs.
For broader context, see [Epic Overview: Tool Implementation (CORE-ToolImplementation)](../../docs/planning/workplans/CORE-ToolImplementation.md).