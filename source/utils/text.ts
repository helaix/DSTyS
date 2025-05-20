/**
 * Normalize text by trimming and converting to lowercase
 * Analogous to DSPy's normalize_text function
 *
 * @param text - The text to normalize
 * @returns The normalized text
 */
export function normalizeText(text: string): string {
  return text.trim().toLowerCase()
}
