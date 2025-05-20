/**
 * Normalize text by trimming and converting to lowercase
 * Analogous to DSPy's normalize_text function
 */
export function normalizeText(text: string): string {
  return text.trim().toLowerCase()
}
