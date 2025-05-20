import { go, where } from '~/quotes/parts.ts'

// Keep the original export for test compatibility
export const quote = `${go} ${where}`

/**
 * DSTyS - DSPy in TypeScript with Effect
 * 
 * A TypeScript + Effect rewrite of DSPy's framework for programming with foundation models
 */

// Re-export core modules
export * from './primitives/prediction';
export * from './predict';
export * from './utils/text';
