import { Completion, Completions, Prediction } from '../primitives/prediction.js'

type NormalizeFunction = (text: string) => string

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
    field?: string
    normalize?: NormalizeFunction
  } = {}
): Prediction {
  // Extract completions array from input
  let completions: Completion[]
  if (Array.isArray(input)) {
    completions = input
  } else {
    completions = input.completions
  }

  // Default to 'answer' if no field is specified
  const field = options.field || 'answer'
  const normalize = options.normalize

  // Count occurrences of each value
  const valueCounts = new Map<string, number>()

  for (const completion of completions) {
    const value = completion[field]
    // Apply normalization if provided
    const normalizedValue = normalize ? normalize(value) : value

    valueCounts.set(normalizedValue, (valueCounts.get(normalizedValue) || 0) + 1)
  }

  // Find the value with the highest count
  let majorityValue: string | undefined
  let maxCount = 0

  for (const [value, count] of valueCounts.entries()) {
    if (count > maxCount) {
      maxCount = count
      majorityValue = value
    }
  }

  // In case of a tie, we return the value that appears first in the completions
  if (majorityValue === undefined) {
    return new Prediction([completions[0]])
  }

  // Find the first completion with the majority value
  for (const completion of completions) {
    const value = completion[field]
    const normalizedValue = normalize ? normalize(value) : value

    if (normalizedValue === majorityValue) {
      return new Prediction([completion])
    }
  }

  // Fallback (should never reach here)
  return new Prediction([completions[0]])
}
