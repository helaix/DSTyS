// Basic completion type definition
export type Completion = Record<string, unknown>

/**
 * Completions class to hold a list of completion objects
 * Analogous to DSPy's Completions class
 */
export class Completions {
  public completions: Completion[]

  public constructor(completions: Completion[]) {
    this.completions = completions
  }

  /**
   * Get the first completion
   */
  public get first(): Completion | undefined {
    return this.completions[0]
  }

  /**
   * Convert completions to a simple array
   */
  public toArray(): Completion[] {
    return this.completions
  }
}

/**
 * Prediction class that extends Completions with additional functionality
 * Analogous to DSPy's Prediction class
 */
export class Prediction extends Completions {
  /**
   * Create a Prediction from a list of completions
   * @param completions - Array of completions or Completions instance
   */
  public static fromCompletions(completions: Completion[] | Completions): Prediction {
    if (completions instanceof Completions) {
      return new Prediction(completions.completions)
    }
    return new Prediction(completions)
  }
}
