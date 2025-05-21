import { Completions } from "../primitives/prediction.ts";
import { normalizeText } from "../utils/text.ts";

/**
 * Options for the majority function
 */
export interface MajorityOptions {
	/**
	 * Whether to normalize text before comparing
	 * This is useful for case-insensitive comparison
	 */
	normalize?: boolean;
}

/**
 * Find the most common value for a given field in a set of completions
 *
 * @param completions - The completions to analyze
 * @param field - The field to extract from each completion
 * @param options - Options for the majority function
 * @returns The most common value, or undefined if no completions
 */
export function majority(
	completions: Completions,
	field: string,
	options: MajorityOptions = {},
): string | undefined {
	const items = completions.toArray();
	if (items.length === 0) {
		return undefined;
	}

	// Extract the field from each completion
	const values = items.map((item) => {
		const value = item[field];
		if (typeof value !== "string") {
			return String(value);
		}
		return options.normalize ? normalizeText(value) : value;
	});

	// Count occurrences of each value
	const counts = new Map<string, { count: number; original: string }>();
	values.forEach((value, index) => {
		const original = items[index][field] as string;
		if (counts.has(value)) {
			// We know this exists because we just checked with counts.has()
			const entry = counts.get(value);
			if (entry) {
				entry.count += 1;
			}
		} else {
			counts.set(value, { count: 1, original });
		}
	});

	// Find the most common value
	let maxCount = 0;
	let maxValue: string | undefined;

	for (const [_, { count, original }] of counts.entries()) {
		if (count > maxCount) {
			maxCount = count;
			maxValue = original;
		}
	}

	return maxValue;
}

