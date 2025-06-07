import { describe, it, expect } from 'vitest'
import * as modules from './index.js'

describe('modules index', () => {
  it('exports ChainOfThought', () => {
    expect(modules.ChainOfThought).toBeDefined()
  })

  it('re-exports Module', () => {
    expect(modules.Module).toBeDefined()
  })
})
