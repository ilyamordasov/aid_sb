import { describe, expect, it } from 'vitest'
import { resolveSuggestedHostToUrl } from './suggest-url'

describe('resolveSuggestedHostToUrl', () => {
  it('normalizes bare host to https url', () => {
    expect(resolveSuggestedHostToUrl('youtube.com')).toBe('https://youtube.com/')
  })

  it('preserves already absolute https url', () => {
    expect(resolveSuggestedHostToUrl('https://www.youtube.com')).toBe('https://www.youtube.com/')
  })
})
