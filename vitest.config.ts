/* eslint-disable import-x/no-default-export */
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: allow default export for vitest config
export default defineConfig({
  test: {
    exclude: ['build', 'node_modules'],
    coverage: {
      exclude: ['build', ...coverageConfigDefaults.exclude],
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // For v8 coverage provider, thresholds need to be in the 'thresholds' property
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    environment: 'node',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 30000
  },
  plugins: [tsconfigPaths()]
})
