import { go, where } from "~/quotes/parts.ts";
import { majority } from "./predict/index.ts";
// Import specific modules instead of using barrel exports
import { Completions, Prediction } from "./primitives/prediction.ts";
import { normalizeText } from "./utils/text.ts";

// Sample quote for testing
export const quote = `${go} ${where}`;

// Re-export key components
export { Completions, Prediction, majority, normalizeText };
