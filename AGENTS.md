# Notes for Codex Agents

This repository uses **Vitest** for its TypeScript tests.  Run all checks with:

```
npm test
```

This environment has no network access after setup so all dependencies must
already be installed or vendored.  If tests fail because packages are missing,
a setup script should install them before network access is disabled.

## Post‑mortem

During the task to add comprehensive tests we created additional unit test files
for various utilities and modules (`source/index.test.ts`,
`source/modules/index.test.ts`, `source/primitives/prediction.test.ts`,
`source/quotes/parts.test.ts`, and `source/utils/text.test.ts`).  A `bun.lock`
file appeared untracked; we ignored it via `.gitignore`.

Optimal context before starting would have been a map of the existing test
coverage and which Python tests correspond to implemented TypeScript modules.
Additional tooling to automatically translate Python tests to TypeScript would
have reduced manual effort.
