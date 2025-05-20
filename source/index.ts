import type { go, where } from '~/quotes/parts.js'

// Keep the original export for test compatibility
export const quote = `${go} ${where}`

/**
 * DSTyS - DSPy in TypeScript with Effect
 *
 * A TypeScript + Effect rewrite of DSPy's framework for programming with foundation models
 */

// biome-ignore lint/performance/noBarrelFile: This is the main entry point, re-exports are needed
export * from './primitives/prediction.js'
// biome-ignore lint/performance/noBarrelFile: This is the main entry point, re-exports are needed
export * from './predict/index.js'
// biome-ignore lint/performance/noBarrelFile: This is the main entry point, re-exports are needed
export * from './utils/text.js'
