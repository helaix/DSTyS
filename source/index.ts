import { go, where } from '~/quotes/parts.ts'
// Import specific modules instead of using barrel exports
import { Completion, Completions, Prediction } from './primitives/prediction.ts'
import { majority } from './predict/index.ts'
import { normalizeText } from './utils/text.ts'

// Keep the original export for test compatibility
export const quote = `${go} ${where}`

/**
 * DSTyS - DSPy in TypeScript with Effect
 *
 * A TypeScript + Effect rewrite of DSPy's framework for programming with foundation models
 */

// Export specific modules
// Primitives
export { Completion, Completions, Prediction }

// Export Module system
export * from './primitives/module.js'

// Export trace system
export * from './primitives/trace.js'

// Export concrete modules
export * from './modules/index.js'

// Export teleprompt (optimizers)
export * from './teleprompt/index.js'

// Export clients (LM interfaces)
export * from './clients/index.js'

// Predict
export { majority }

// Utils
export { normalizeText }

// Export new Effect Schema types
// biome-ignore lint/performance/noBarrelFile: This is the main package export
export * from './schemas/index.js'
