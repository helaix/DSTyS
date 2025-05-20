# Workplan: Configure TypeScript

## Task ID
SETUP-ProjStruct-02-TSConfig

## Problem Statement
Configure TypeScript for the DSTyS project with optimal settings for a modern library, including strict type checking, ESM module support, and appropriate compilation targets.

## Proposed Implementation
- Create a root `tsconfig.json` file.
- Key compiler options to set:
    - `target: "ES2022"` (or newer, balancing modern features with compatibility).
    - `module: "NodeNext"` (for modern Node.js ESM compatibility).
    - `moduleResolution: "NodeNext"`.
    - `strict: true` (enables all strict type-checking options).
    - `esModuleInterop: true` (for better compatibility with CommonJS modules).
    - `skipLibCheck: true` (speeds up compilation by not checking declaration files of dependencies).
    - `resolveJsonModule: true` (allows importing JSON files).
    - `declaration: true` (generates `.d.ts` files).
    - `sourceMap: true` (generates source maps for debugging).
    - `outDir: "./build"` (or `./dist`, specifies output directory for compiled files).
    - `rootDir: "./src"` (specifies root directory of source files).
    - `baseUrl: "./src"` (allows for non-relative imports from `src`).
    - `paths: { "~/*": ["./*"] }` (example path alias for cleaner imports within `src`).
    - `allowImportingTsExtensions: true` (if using `.ts` extensions in imports, though typically not needed with NodeNext).
    - `noEmit: false` (ensure files are emitted, or use a separate `tsconfig.build.json`).
- Create a `tsconfig.build.json` that extends the root `tsconfig.json`, specifically for production builds. This might override `noEmit` or include/exclude different files.
    - `include: ["src/**/*"]`
    - `exclude: ["node_modules", "**/*.test.ts", "**/*.spec.ts"]`
- Testing: Verify TypeScript compiles successfully with these settings. Check that declaration files are generated.

## Components Involved
- `tsconfig.json` (root file)
- `tsconfig.build.json` (for build process)

## Dependencies
- `SETUP-ProjStruct-01-DirStructure` (project directory structure in place)
- TypeScript installed as a dev dependency (`SETUP-ProjStruct-06-PackageJson`)

## Implementation Checklist
- [ ] Create `tsconfig.json` with core compiler options (target, module, strict, esModuleInterop, etc.).
- [ ] Configure `outDir`, `rootDir`, `baseUrl`, and `paths`.
- [ ] Set `declaration: true` and `sourceMap: true`.
- [ ] Create `tsconfig.build.json` extending `tsconfig.json`.
- [ ] Define `include` and `exclude` patterns in `tsconfig.build.json`.
- [ ] Add a `typecheck` script to `package.json` (e.g., `tsc --noEmit`).
- [ ] Add a build script to `package.json` using `tsc -p tsconfig.build.json`.
- [ ] Write a minimal `src/index.ts` and verify it compiles without errors using both scripts.
- [ ] Verify `.d.ts` and `.js.map` files are generated in `outDir` after build.

## Verification Steps
- Run `npm run typecheck` (or equivalent) and ensure it passes.
- Run `npm run build` (or equivalent) and ensure it completes successfully.
- Inspect the `build/` (or `dist/`) directory to confirm JavaScript files, declaration files (`.d.ts`), and source maps (`.js.map`) are generated.
- Attempt a simple import using a path alias (e.g., `import {} from '~/utils/somefile';`) in a test file to ensure `paths` are working.

## Decision Authority
- Independent: Specific ES target (e.g., ES2022 vs. ESNext), minor compiler option tweaks.
- User Input: If a different module system (other than NodeNext ESM) is required for specific compatibility reasons.

## Questions/Uncertainties
### Blocking
- None.

### Non-blocking
- Fine-tuning specific strictness flags (e.g., `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) can be done iteratively.

## Acceptable Tradeoffs
- Start with a widely compatible ES target like `ES2022` and consider newer targets later if specific features are needed and compatibility allows.

## Status
Not Started

## Notes
A solid `tsconfig.json` is crucial for a healthy TypeScript project. These settings aim for modern ESM, strictness, and good DX.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).