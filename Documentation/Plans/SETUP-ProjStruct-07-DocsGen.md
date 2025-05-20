# Workplan: Set up Documentation Generation

## Task ID
SETUP-ProjStruct-07-DocsGen

## Problem Statement
Set up an automated documentation generation system for the DSTyS project, primarily for generating API reference from TypeScript source code and TSDoc/JSDoc comments.

## Proposed Implementation
- Choose a documentation generator:
    - **TypeDoc** is a popular choice for TypeScript projects, generating HTML documentation from TSDoc comments.
    - Other options include Docusaurus (if more extensive static site generation is needed, can integrate TypeDoc) or Compodoc (for Angular, less relevant here). Assume TypeDoc.
- Install TypeDoc as a dev dependency.
- Create a TypeDoc configuration file (e.g., `typedoc.json`).
- Configure TypeDoc:
    - `entryPoints`: Specify `src/index.ts` or relevant entry points.
    - `out`: Specify output directory (e.g., `docs/api`).
    - Theme: Choose a theme (default or custom).
    - Options for handling exports, private members, etc.
- Add a script to `package.json` for generating documentation (e.g., `npm run docs`).
- Ensure TSDoc/JSDoc comments in source code are correctly parsed and included in the generated documentation.
- Testing: Generate documentation for a sample module with TSDoc comments and verify the output.

## Components Involved
- TypeDoc (or chosen generator)
- TypeDoc configuration file (e.g., `typedoc.json`)
- `package.json` (for docs script)
- TSDoc/JSDoc comments in source code.

## Dependencies
- `SETUP-ProjStruct-01-DirStructure` (`docs/api` directory)
- `SETUP-ProjStruct-06-PackageJson` (for installing TypeDoc)
- TypeScript source files with TSDoc comments.

## Implementation Checklist
- [ ] Research and select a documentation generator (default to TypeDoc).
- [ ] Install TypeDoc as a devDependency.
- [ ] Create `typedoc.json` configuration file.
- [ ] Configure `entryPoints` to `["src/index.ts"]` (or `src/`).
- [ ] Configure `out` to `docs/api`.
- [ ] Set other relevant TypeDoc options (e.g., `excludePrivate: true`, `readme: "none"` if API only).
- [ ] Add `docs` script to `package.json` (e.g., `typedoc --options typedoc.json`).
- [ ] Add TSDoc comments to a sample `src/` file (e.g., the minimal `index.ts` or a utility function).
- [ ] Run `npm run docs` and verify HTML documentation is generated in `docs/api`.
- [ ] Inspect the generated documentation for correctness and inclusion of TSDoc comments.

## Verification Steps
- `npm run docs` successfully generates documentation into the `docs/api` directory.
- The generated HTML documentation is viewable and correctly reflects the TSDoc comments from the sample source file.
- Links within the generated documentation work correctly.

## Decision Authority
- Independent: Specific TypeDoc theme and detailed configuration options.
- User Input: Choice of documentation generator if not TypeDoc. Overall structure of the `docs` site if more than just API reference is planned early on.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Integrating API documentation with a larger static site (e.g., using Docusaurus with a TypeDoc plugin) can be an enhancement.

## Acceptable Tradeoffs
- Start with basic TypeDoc setup and default theme. Custom themes or more complex site generation can be added later.

## Status
Not Started

## Notes
Good API documentation is crucial for a library's usability. Automating its generation from source comments ensures it stays up-to-date.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).