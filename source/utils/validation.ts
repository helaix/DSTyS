/**
 * Validates if a value is a non-empty string
 * @param value - The value to validate
 * @returns True if the value is a non-empty string, false otherwise
 */
export const isNonEmptyString = (value: unknown): boolean => {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates if a value is a positive number
 * @param value - The value to validate
 * @returns True if the value is a positive number, false otherwise
 */
export const isPositiveNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !Number.isNaN(value) && value > 0
}

/**
 * Validates if a value is a valid email address
 * @param value - The value to validate
 * @returns True if the value is a valid email address, false otherwise
 */
export const isValidEmail = (value: unknown): boolean => {
  if (typeof value !== 'string') return false

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * Ensures a value is a non-empty string or throws an error
 * @param value - The value to validate
 * @param errorMessage - Optional custom error message
 * @returns The validated string
 * @throws Error if validation fails
 */
export const ensureNonEmptyString = (value: unknown, errorMessage = 'Value must be a non-empty string'): string => {
  if (!isNonEmptyString(value)) {
    throw new Error(errorMessage)
  }
  return value as string
}
