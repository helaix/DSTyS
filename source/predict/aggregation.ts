import {
	type Completion,
	type Completions,
	Prediction,
} from "../primitives/prediction.ts";

type NormalizeFunction = (text: string) => string;

/**
 * Find the most common value in a list of completions
 * Analogous to DSPy's majority function
 *
 * @param input - Completions, Prediction, or array of completions
 * @param options - Configuration options
 * @returns A Prediction containing the majority value
 */
export function majority(
	input: Completions | Prediction | Completion[],
	options: {
		field?: string;
		normalize?: NormalizeFunction;
	} = {},
): Prediction {
	// Extract completions array from input
	let completions: Completion[];
	if (Array.isArray(input)) {
		completions = input;
	} else {
		completions = input.completions;
	}

	// If completions array is empty, return an empty prediction
	if (completions.length === 0) {
		return new Prediction([]);
	}

	// Create a default completion as fallback
	const defaultCompletion: Completion = completions[0] || { answer: "" };

	// Default to 'answer' if no field is specified
	const field = options.field || "answer";
	const normalize = options.normalize;

	// Count occurrences of each value
	const valueCounts = new Map<string, number>();

	for (const completion of completions) {
		// Skip completions that don't have the specified field
		if (!(field in completion)) {
			continue;
		}

		const value = completion[field] as string;
		// Apply normalization if provided
		const normalizedValue = normalize ? normalize(value) : value;

		valueCounts.set(
			normalizedValue,
			(valueCounts.get(normalizedValue) || 0) + 1,
		);
	}

	// Find the value with the highest count
	let majorityValue: string | undefined;
	let maxCount = 0;

	for (const [value, count] of valueCounts.entries()) {
		if (count > maxCount) {
			maxCount = count;
			majorityValue = value;
		}
	}

	// In case of a tie or no majority, we return the default completion
	if (majorityValue === undefined) {
		return new Prediction([defaultCompletion]);
	}

	// Find the first completion with the majority value
	for (const completion of completions) {
		// Skip completions that don't have the specified field
		if (!(field in completion)) {
			continue;
		}

		const value = completion[field] as string;
		const normalizedValue = normalize ? normalize(value) : value;

		if (normalizedValue === majorityValue) {
			return new Prediction([completion]);
		}
	}

	// Fallback (should never reach here if completions array is not empty)
	return new Prediction([defaultCompletion]);
}
