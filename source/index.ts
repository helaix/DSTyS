/**
 * DSTyS - TypeScript + Effect rewrite of DSPy
 *
 * A framework for working with foundation models.
 */

// Re-export specific exports instead of using barrel files
import { Example } from './primitives/example.js'
import { aggregateResults } from './predict/aggregation.js'

export {
  // Primitives
  Example,
  // Predict
  aggregateResults
}

// These will be implemented as the project progresses
// export * from './signatures/index.js';
// export * from './retrieve/index.js';
// export * from './teleprompt/index.js';
// export * from './clients/index.js';
// export * from './evaluate/index.js';
// export * from './utils/index.js';
// export * from './quotes/index.js';
