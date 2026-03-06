import { describe, expect, it } from 'vitest'
import { parseAddressInput } from './address'

describe('parseAddressInput', () => {
  it('adds https scheme when missing', () => {
    const result = parseAddressInput('example.com')
    expect(result).toEqual({ ok: true, url: 'https://example.com/' })
  })

  it('keeps https URL unchanged', () => {
    const result = parseAddressInput('https://example.com')
    expect(result).toEqual({ ok: true, url: 'https://example.com/' })
  })

  it('keeps http URL with path and query unchanged', () => {
    const result = parseAddressInput('http://example.com/path?q=1')
    expect(result).toEqual({ ok: true, url: 'http://example.com/path?q=1' })
  })

  it('returns empty for blank input', () => {
    expect(parseAddressInput('')).toEqual({ ok: false, reason: 'empty' })
    expect(parseAddressInput('   ')).toEqual({ ok: false, reason: 'empty' })
  })

  it('returns invalid for malformed URL', () => {
    expect(parseAddressInput('http://:')).toEqual({ ok: false, reason: 'invalid' })
  })

  it('returns invalid for unsupported protocol', () => {
    expect(parseAddressInput('ftp://example.com')).toEqual({ ok: false, reason: 'invalid' })
  })
})
