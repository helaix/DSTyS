/**
 * @fileoverview Module exports for DSTyS modules
 *
 * This file exports all the concrete module implementations
 * that extend the base Module class.
 */

// Chain of Thought module
export * from './chain-of-thought.js'

// Predict module
export * from './predict.js'

// Re-export base Module for convenience
export { Module, ModuleError, ModuleNotImplementedError } from '../primitives/module.js'
