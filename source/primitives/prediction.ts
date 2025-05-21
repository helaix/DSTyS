// Basic completion type definition
export type Completion = Record<string, unknown>;

/**
 * Base class for completions
 *
 * Provides a simple wrapper around an array of completions
 * with utility methods for accessing and manipulating them
 */
export class Completions {
	completions: Completion[];

	constructor(completions: Completion[]) {
		this.completions = completions;
	}

	/**
	 * Get the first completion
	 */
	get first(): Completion | undefined {
		return this.completions[0];
	}

	/**
	 * Convert completions to a simple array
	 */
	toArray(): Completion[] {
		return this.completions;
	}
}

/**
 * Utility functions for working with predictions
 *
 * Analogous to DSPy's Prediction class
 */
export function createPrediction(
	completions: Completion[] | Completions,
): Prediction {
	if (completions instanceof Completions) {
		return new Prediction(completions.completions);
	}
	return new Prediction(completions);
}

// Keep the Prediction class for backward compatibility
export class Prediction extends Completions {
	// No static methods, just inherits from Completions
}
