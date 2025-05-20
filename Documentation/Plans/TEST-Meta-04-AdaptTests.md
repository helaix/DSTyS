# Workplan: Adapt Metadata Tests for TypeScript

## Task ID
TEST-Meta-04-AdaptTests

## Problem Statement
Convert the logic and assertions from the Python metadata tests into the placeholder TypeScript/Vitest test cases. This involves accessing metadata from `package.json` or a dedicated `metadata.ts` file.

## Proposed Implementation
- For each placeholder test in `tests/metadata/Metadata.test.ts`:
    - Implement logic to import/read metadata values:
        - Option A: `import pkg from '../../package.json' assert { type: 'json' };` (for Node.js ESM).
        - Option B: Create a `src/metadata.ts` that exports constants, and import from there.
    - Assert the values against expected strings or regex patterns (for version).
    - Use `expect` assertions from Vitest.

## Components Involved
- `tests/metadata/Metadata.test.ts`.
- TypeScript, Vitest.
- `package.json` or `src/metadata.ts`.

## Dependencies
- `TEST-Meta-03-CreateTSFiles`.
- `SETUP-ProjStruct-06-PackageJson` (populated `package.json`).

## Implementation Checklist
- [ ] Decide on the method for accessing metadata in tests (import `package.json` or a `metadata.ts` file).
- [ ] If using `metadata.ts`, create this file and populate it from `package.json` values.
- [ ] Iterate through `Metadata.test.ts` placeholders.
- [ ] Implement test logic:
    - Import/access metadata values.
    - `expect(metadata.version).toMatch(/^\d+\.\d+\.\d+$/);`
    - `expect(metadata.author).toBe("Expected Author");`
    - ...and so on for other fields.

## Verification Steps
- Converted metadata tests pass, verifying values from `package.json` or `metadata.ts`.
- Test logic is clear.

## Decision Authority
- Independent.
- User Input: None.

## Questions/Uncertainties
### Blocking
- Ensuring `package.json` can be imported correctly in the Vitest environment.
### Non-blocking
- None.

## Acceptable Tradeoffs
- If direct `package.json` import is problematic, using a `metadata.ts` file is a good alternative.

## Status
Not Started

## Notes
Ensures package metadata is consistently correct.
For broader context, see [Epic Overview: Package Metadata Tests Conversion](../../docs/planning/workplans/TEST-MetadataTests.md).