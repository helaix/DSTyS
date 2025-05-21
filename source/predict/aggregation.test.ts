import { describe, expect, it } from "vitest";
import { Completions, Prediction } from "../primitives/prediction.ts";
import { normalizeText } from "../utils/text.ts";
import { majority } from "./aggregation.ts";

describe("aggregation", () => {
	it("majority", () => {
		// Create test data
		const completions = [
			{ text: "apple" },
			{ text: "banana" },
			{ text: "apple" },
			{ text: "cherry" },
			{ text: "apple" },
		];

		// Create a prediction from completions
		const prediction = new Prediction(completions);

		// Test the majority function
		const result = majority(prediction, "text");
		expect(result).toBe("apple");
	});

	it("handles empty predictions", () => {
		const prediction = new Prediction([]);
		const result = majority(prediction, "text");
		expect(result).toBeUndefined();
	});

	it("handles ties by returning the first most frequent item", () => {
		const completions = [
			{ text: "apple" },
			{ text: "banana" },
			{ text: "apple" },
			{ text: "banana" },
		];
		const prediction = new Prediction(completions);
		const result = majority(prediction, "text");
		expect(result).toBe("apple");
	});

	it("works with Completions instances", () => {
		const completions = new Completions([
			{ text: "apple" },
			{ text: "banana" },
			{ text: "apple" },
		]);
		const result = majority(completions, "text");
		expect(result).toBe("apple");
	});

	it("normalizes text when comparing", () => {
		const completions = [
			{ text: "Apple" },
			{ text: "banana" },
			{ text: "apple" },
			{ text: "APPLE" },
		];
		const prediction = new Prediction(completions);
		const result = majority(prediction, "text", { normalize: true });
		expect(result).toBe("Apple");
		expect(normalizeText(result)).toBe("apple");
	});
});
