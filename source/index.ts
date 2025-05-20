import { go, where } from '~/quotes/parts.js'

// Keep the original export for test compatibility
export const quote = `${go} ${where}`

/**
 * DSTyS - DSPy in TypeScript with Effect
 *
 * A TypeScript + Effect rewrite of DSPy's framework for programming with foundation models
 */

// Re-export core modules
export * from './primitives/prediction.js'
export * from './predict/index.js'
export * from './utils/text.js'
