# Workplan: Configure package.json

## Task ID
SETUP-ProjStruct-06-PackageJson

## Problem Statement
Initialize and configure the `package.json` file for the DSTyS project. This file is central to managing project metadata, dependencies, and scripts.

## Proposed Implementation
- Initialize `package.json` using `npm init` (or equivalent for chosen package manager), potentially with `-y` for defaults and then edit.
- Populate essential metadata fields:
    - `name`: (e.g., `dstys` or `@org/dstys`)
    - `version`: (e.g., `0.1.0`)
    - `description`: A brief description of the library.
    - `author`: Author information.
    - `license`: (e.g., `MIT` or `Apache-2.0`)
    - `repository`: URL to the GitHub repository.
    - `bugs`: URL to the issue tracker.
    - `homepage`: URL to the project homepage/documentation.
    - `keywords`: Relevant keywords for discoverability.
- Specify `type: "module"` for ESM.
- Define `main`, `module`, and `types` fields for package entry points:
    - `main`: (Optional, for CommonJS compatibility if generated) e.g., `./build/cjs/index.js`
    - `module`: Primary ESM entry point, e.g., `./build/esm/index.js`
    - `types`: Path to the main declaration file, e.g., `./build/esm/index.d.ts`
- Configure `exports` map for fine-grained control over exposed modules (recommended for modern libraries).
    ```json
    "exports": {
      ".": {
        "import": "./build/esm/index.js",
        "require": "./build/cjs/index.js", // if CJS is supported
        "types": "./build/esm/index.d.ts"
      },
      "./utils": { /* ... */ } // if exposing submodules
    }
    ```
- List `files` to be included when publishing (e.g., `["build", "README.md", "LICENSE"]`).
- Add `scripts` for common tasks (build, test, lint, format, typecheck, clean, pre-publish hooks). These will be implemented/refined in other tasks.
- Add core `dependencies` (e.g., `zod`, `effect`) and `devDependencies` (e.g., `typescript`, `eslint`, `prettier`, `vitest`, build tools like `tsup` or `swc`).
- Specify `engines` (Node.js version) and `packageManager` (if using a specific version of npm/yarn/pnpm).
- Testing: Run `npm install` (or equivalent) to ensure dependencies are resolved. Check basic script execution.

## Components Involved
- `package.json` (root file)

## Dependencies
- Decision on package name, initial version, license.
- Choice of package manager.

## Implementation Checklist
- [ ] Initialize `package.json` (e.g., `npm init -y`).
- [ ] Fill in `name`, `version`, `description`, `author`, `license`, `repository`, `bugs`, `homepage`, `keywords`.
- [ ] Set `type: "module"`.
- [ ] Define `main`, `module`, `types` fields (adjust paths based on build output).
- [ ] Configure `exports` map.
- [ ] Define `files` array.
- [ ] Add placeholder `scripts` (actual commands to be filled by other tasks):
    - `build`, `prebuild`, `postbuild`
    - `test`, `test:watch`, `test:coverage`
    - `lint`, `format`
    - `typecheck`
    - `clean`
    - `prepublishOnly`
- [ ] Add core `dependencies`: `zod`, `effect`.
- [ ] Add core `devDependencies`: `typescript`, `eslint`, `prettier` (or `biome`), `vitest`, `@vitest/coverage-v8`, `npm-run-all2` (or `concurrently`), `rimraf`. Also build tools like `@swc/core`, `@swc/cli` or `tsup`.
- [ ] Specify `engines` (e.g., `"node": ">=20.0.0"`) and `packageManager`.
- [ ] Run `npm install` (or equivalent) to generate `package-lock.json` and verify.

## Verification Steps
- `package.json` is valid JSON and parsable by the package manager.
- `npm install` (or equivalent) successfully installs specified dependencies into `node_modules`.
- `package-lock.json` (or equivalent) is generated.
- Basic scripts (even if empty initially) are recognized by `npm run <script_name>`.

## Decision Authority
- Independent: Specific versions for initial dependencies (can use latest stable).
- User Input: Package name, organization scope, license, initial version number.

## Questions/Uncertainties
### Blocking
- Final package name and if it will be scoped (e.g., `@my-org/dstys`).

### Non-blocking
- Exact versions of devDependencies can be updated.
- `exports` map can be refined as the library structure solidifies.

## Acceptable Tradeoffs
- Start with a minimal set of scripts and dependencies, adding more as other setup tasks are completed.
- CommonJS support via `main` and `exports.require` can be deferred if ESM-only is the initial target.

## Status
Not Started

## Notes
`package.json` is the heart of a Node.js/TypeScript project. Getting it right early is important.
For broader context, see [Epic Overview: Project Structure Setup (SETUP-ProjectStructure)](../../docs/planning/workplans/SETUP-ProjectStructure.md).