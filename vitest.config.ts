/* eslint-disable import-x/no-default-export */
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: allow default export for vitest config
export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    coverage: {
      exclude: [
        'build',
        ...coverageConfigDefaults.exclude,
        // Temporarily exclude dspy directory until coverage is improved
        'dspy/**',
        // Exclude test files themselves
        '**/*.test.ts',
        '**/*.spec.ts'
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // For v8 coverage provider, thresholds need to be in the 'thresholds' property
      // Lower thresholds during initial setup phase (will increase later)
      thresholds: {
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10
      }
    },
    environment: 'node',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 30000
  },
  plugins: [tsconfigPaths()]
})
