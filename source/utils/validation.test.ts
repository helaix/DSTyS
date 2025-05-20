import type { describe, expect, it } from 'vitest'
import type { ensureNonEmptyString, isNonEmptyString, isPositiveNumber, isValidEmail } from './validation.js'

describe('Validation Utils', () => {
  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true)
      expect(isNonEmptyString('a')).toBe(true)
      expect(isNonEmptyString(' hello ')).toBe(true)
    })

    it('should return false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false)
      expect(isNonEmptyString(' ')).toBe(false)
      expect(isNonEmptyString('\t\n')).toBe(false)
    })

    it('should return false for non-string values', () => {
      expect(isNonEmptyString(null)).toBe(false)
      expect(isNonEmptyString(undefined)).toBe(false)
      expect(isNonEmptyString(123)).toBe(false)
      expect(isNonEmptyString({})).toBe(false)
      expect(isNonEmptyString([])).toBe(false)
    })
  })

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true)
      expect(isPositiveNumber(0.1)).toBe(true)
      expect(isPositiveNumber(Number.MAX_VALUE)).toBe(true)
    })

    it('should return false for zero or negative numbers', () => {
      expect(isPositiveNumber(0)).toBe(false)
      expect(isPositiveNumber(-1)).toBe(false)
      expect(isPositiveNumber(-0.1)).toBe(false)
    })

    it('should return false for Number.NaN and non-number values', () => {
      expect(isPositiveNumber(Number.NaN)).toBe(false)
      expect(isPositiveNumber('123')).toBe(false)
      expect(isPositiveNumber(null)).toBe(false)
      expect(isPositiveNumber(undefined)).toBe(false)
      expect(isPositiveNumber({})).toBe(false)
    })
  })

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
      expect(isValidEmail('a@b.c')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('test')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test@example')).toBe(false)
      expect(isValidEmail('test@.com')).toBe(false)
    })

    it('should return false for non-string values', () => {
      expect(isValidEmail(null)).toBe(false)
      expect(isValidEmail(undefined)).toBe(false)
      expect(isValidEmail(123)).toBe(false)
      expect(isValidEmail({})).toBe(false)
    })
  })

  describe('ensureNonEmptyString', () => {
    it('should return the string for valid inputs', () => {
      expect(ensureNonEmptyString('hello')).toBe('hello')
      expect(ensureNonEmptyString('a')).toBe('a')
      expect(ensureNonEmptyString(' hello ')).toBe(' hello ')
    })

    it('should throw an error for empty strings', () => {
      expect(() => ensureNonEmptyString('')).toThrow('Value must be a non-empty string')
      expect(() => ensureNonEmptyString(' ')).toThrow('Value must be a non-empty string')
      expect(() => ensureNonEmptyString('\t\n')).toThrow('Value must be a non-empty string')
    })

    it('should throw an error for non-string values', () => {
      expect(() => ensureNonEmptyString(null)).toThrow('Value must be a non-empty string')
      expect(() => ensureNonEmptyString(undefined)).toThrow('Value must be a non-empty string')
      expect(() => ensureNonEmptyString(123)).toThrow('Value must be a non-empty string')
    })

    it('should use custom error message when provided', () => {
      const customMessage = 'Custom error message'
      expect(() => ensureNonEmptyString('', customMessage)).toThrow(customMessage)
      expect(() => ensureNonEmptyString(null, customMessage)).toThrow(customMessage)
    })
  })
})
