/**
 * @fileoverview Tests for the ChainOfThought module
 * 
 * These tests verify the ChainOfThought module's ability to augment signatures
 * with reasoning capabilities and generate step-by-step predictions.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { Effect } from "effect";
import { ChainOfThought, chainOfThought, CoT } from "./chain-of-thought.js";
import type { Signature } from "../schemas/signature.js";
import type { LM } from "../primitives/module.js";
import type { Prediction } from "../schemas/prediction.js";

// Mock LM implementation for testing
class MockLM implements LM {
  readonly _tag = "LM" as const;
  
  constructor(public name: string = "mock-lm") {}
  
  // Mock method to simulate LM generation
  generate(prompt: string): Effect.Effect<string, Error> {
    return Effect.succeed(`Mock response for: ${prompt}`);
  }
}

// Mock signature for testing
const mockSignature: Signature = {
  instructions: "Answer the question clearly and concisely",
  fields: {
    question: {
      name: "question",
      description: "The question to answer",
      type: "string",
      required: true
    },
    answer: {
      name: "answer", 
      description: "The answer to the question",
      type: "string",
      required: true
    }
  },
  inputFields: [{
    name: "question",
    description: "The question to answer", 
    type: "string",
    required: true
  }],
  outputFields: [{
    name: "answer",
    description: "The answer to the question",
    type: "string", 
    required: true
  }]
};

describe("ChainOfThought", () => {
  let cot: ChainOfThought;
  let mockLM: MockLM;

  beforeEach(() => {
    cot = new ChainOfThought();
    mockLM = new MockLM("test-lm");
  });

  describe("Constructor and Initialization", () => {
    it("should initialize with default values", () => {
      expect(cot.lm).toBeNull();
      expect(cot.signature).toBeNull();
      expect(cot.getMaxRetries()).toBe(3);
      expect(cot.hasRationale()).toBe(false);
    });

    it("should initialize with string signature", () => {
      const cotWithSig = new ChainOfThought("question -> answer");
      expect(cotWithSig.signature).not.toBeNull();
      expect(cotWithSig.hasRationale()).toBe(true);
    });

    it("should initialize with Signature object", () => {
      const cotWithSig = new ChainOfThought(mockSignature);
      expect(cotWithSig.signature).not.toBeNull();
      expect(cotWithSig.hasRationale()).toBe(true);
    });

    it("should initialize with custom max retries", () => {
      const cotWithRetries = new ChainOfThought("question -> answer", 5);
      expect(cotWithRetries.getMaxRetries()).toBe(5);
    });
  });

  describe("Signature Management", () => {
    it("should set signature from string", () => {
      const result = cot.setSignature("question -> answer");
      expect(result).toBe(cot); // Should return this for chaining
      expect(cot.signature).not.toBeNull();
      expect(cot.hasRationale()).toBe(true);
    });

    it("should set signature from Signature object", () => {
      const result = cot.setSignature(mockSignature);
      expect(result).toBe(cot);
      expect(cot.signature).not.toBeNull();
      expect(cot.hasRationale()).toBe(true);
    });

    it("should augment signature with rationale field", () => {
      cot.setSignature(mockSignature);
      const augmented = cot.getAugmentedSignature();
      
      expect(augmented).not.toBeNull();
      expect(augmented!.fields.rationale).toBeDefined();
      expect(augmented!.fields.rationale.name).toBe("rationale");
      expect(augmented!.fields.rationale.description).toContain("step by step");
    });

    it("should preserve original signature", () => {
      cot.setSignature(mockSignature);
      const original = cot.getOriginalSignature();
      
      expect(original).toEqual(mockSignature);
      expect(original!.fields.rationale).toBeUndefined();
    });

    it("should add rationale as first output field", () => {
      cot.setSignature(mockSignature);
      const augmented = cot.getAugmentedSignature();
      
      expect(augmented!.outputFields[0].name).toBe("rationale");
      expect(augmented!.outputFields[1].name).toBe("answer");
    });

    it("should enhance instructions with reasoning prompt", () => {
      cot.setSignature(mockSignature);
      const augmented = cot.getAugmentedSignature();
      
      expect(augmented!.instructions).toContain("step by step");
      expect(augmented!.instructions).toContain("rationale");
      expect(augmented!.instructions).toContain(mockSignature.instructions);
    });
  });

  describe("Forward Pass", () => {
    beforeEach(() => {
      cot.setSignature(mockSignature).setLm(mockLM);
    });

    it("should fail without language model", async () => {
      cot.setLm(null);
      const inputs = { question: "What is 2+2?" };
      
      const result = Effect.runSync(Effect.either(cot.forward(inputs)));
      expect(result._tag).toBe("Left");
      if (result._tag === "Left") {
        expect(result.left.message).toContain("Language model not set");
      }
    });

    it("should fail without signature", async () => {
      const cotNoSig = new ChainOfThought().setLm(mockLM);
      const inputs = { question: "What is 2+2?" };
      
      const result = Effect.runSync(Effect.either(cotNoSig.forward(inputs)));
      expect(result._tag).toBe("Left");
      if (result._tag === "Left") {
        expect(result.left.message).toContain("Signature not set");
      }
    });

    it("should generate prediction with reasoning", async () => {
      const inputs = { question: "What is 2+2?" };
      
      const prediction = await Effect.runPromise(cot.forward(inputs));
      
      expect(prediction).toBeDefined();
      expect(prediction.completions).toBeDefined();
      expect(prediction.reasoning).toBeDefined();
      expect(prediction.confidence).toBeDefined();
    });

    it("should include ChainOfThought metadata", async () => {
      const inputs = { question: "What is 2+2?" };
      
      const prediction = await Effect.runPromise(cot.forward(inputs));
      
      expect(prediction.metadata).toBeDefined();
      expect(prediction.metadata!.module).toBe("ChainOfThought");
      expect(prediction.metadata!.hasRationale).toBe(true);
    });

    it("should handle empty inputs", async () => {
      const inputs = {};
      
      const prediction = await Effect.runPromise(cot.forward(inputs));
      expect(prediction).toBeDefined();
    });
  });

  describe("Retry Logic", () => {
    it("should set max retries", () => {
      const result = cot.setMaxRetries(5);
      expect(result).toBe(cot); // Should return this for chaining
      expect(cot.getMaxRetries()).toBe(5);
    });

    it("should not allow negative retries", () => {
      cot.setMaxRetries(-1);
      expect(cot.getMaxRetries()).toBe(0);
    });

    it("should use default retries", () => {
      expect(cot.getMaxRetries()).toBe(3);
    });
  });

  describe("Method Chaining", () => {
    it("should support fluent interface", () => {
      const result = cot
        .setSignature(mockSignature)
        .setLm(mockLM)
        .setMaxRetries(5);
      
      expect(result).toBe(cot);
      expect(cot.signature).not.toBeNull();
      expect(cot.lm).toBe(mockLM);
      expect(cot.getMaxRetries()).toBe(5);
    });
  });

  describe("Factory Functions", () => {
    it("should create instance with chainOfThought factory", () => {
      const instance = chainOfThought("question -> answer");
      expect(instance).toBeInstanceOf(ChainOfThought);
      expect(instance.hasRationale()).toBe(true);
    });

    it("should create instance with chainOfThought factory and retries", () => {
      const instance = chainOfThought("question -> answer", 10);
      expect(instance).toBeInstanceOf(ChainOfThought);
      expect(instance.getMaxRetries()).toBe(10);
    });

    it("should create instance with CoT alias", () => {
      const instance = new CoT("question -> answer");
      expect(instance).toBeInstanceOf(ChainOfThought);
      expect(instance.hasRationale()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle signature with empty instructions", () => {
      const emptyInstructionsSig: Signature = {
        ...mockSignature,
        instructions: ""
      };
      
      cot.setSignature(emptyInstructionsSig);
      const augmented = cot.getAugmentedSignature();
      
      expect(augmented!.instructions).toContain("step by step");
    });

    it("should handle signature with no output fields", () => {
      const noOutputSig: Signature = {
        ...mockSignature,
        outputFields: []
      };
      
      cot.setSignature(noOutputSig);
      const augmented = cot.getAugmentedSignature();
      
      expect(augmented!.outputFields).toHaveLength(1);
      expect(augmented!.outputFields[0].name).toBe("rationale");
    });

    it("should handle signature with existing rationale field", () => {
      const rationaleExistsSig: Signature = {
        ...mockSignature,
        fields: {
          ...mockSignature.fields,
          rationale: {
            name: "rationale",
            description: "Existing rationale",
            type: "string",
            required: true
          }
        },
        outputFields: [
          {
            name: "rationale",
            description: "Existing rationale",
            type: "string",
            required: true
          },
          ...mockSignature.outputFields
        ]
      };
      
      cot.setSignature(rationaleExistsSig);
      const augmented = cot.getAugmentedSignature();
      
      // Should still work, might have duplicate rationale fields
      expect(augmented!.fields.rationale).toBeDefined();
    });
  });

  describe("Integration with Module Base Class", () => {
    it("should inherit Module properties", () => {
      expect(cot._tag).toBe("Module");
      expect(cot.demos).toEqual([]);
      expect(cot._compiled).toBe(false);
    });

    it("should support Module methods", () => {
      const examples = [
        { input: { question: "What is 1+1?" }, output: { answer: "2" } }
      ];
      
      const result = cot.setDemos(examples);
      expect(result).toBe(cot);
      expect(cot.demos).toEqual(examples);
    });

    it("should find parameters correctly", () => {
      const params = cot.parameters();
      expect(Array.isArray(params)).toBe(true);
    });

    it("should support deep copy", async () => {
      cot.setSignature(mockSignature).setLm(mockLM);
      
      const copy = await Effect.runPromise(cot.deepcopy());
      expect(copy).not.toBe(cot);
      expect(copy).toBeInstanceOf(ChainOfThought);
    });
  });
});

