/**
 * Normalize text by trimming and converting to lowercase
 * @param text - The input text to normalize
 * Analogous to DSPy's normalize_text function
 * @param text - The input text to normalize
 */
export function normalizeText(text: string): string {
  return text.trim().toLowerCase()
}
