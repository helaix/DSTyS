import { go, where } from "~/quotes/parts.ts";
// Import specific modules instead of using barrel exports
import {
	Completion,
	Completions,
	Prediction,
} from "./primitives/prediction.ts";
import { majority } from "./predict/index.ts";
import { normalizeText } from "./utils/text.ts";

// Keep the original export for test compatibility
export const quote = `${go} ${where}`;

/**
 * DSTyS - DSPy in TypeScript with Effect
 *
 * A TypeScript + Effect rewrite of DSPy's framework for programming with foundation models
 */

// Export specific modules
// Primitives
export { Completion, Completions, Prediction };

// Predict
export { majority };

// Utils
export { normalizeText };
