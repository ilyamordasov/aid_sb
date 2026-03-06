export type AddressParseResult =
  | { ok: true; url: string }
  | { ok: false; reason: 'empty' | 'invalid' }

const SCHEME_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//

export function parseAddressInput(raw: string): AddressParseResult {
  const trimmed = raw.trim()

  if (!trimmed) {
    return { ok: false, reason: 'empty' }
  }

  const normalized = SCHEME_RE.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const parsed = new URL(normalized)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { ok: false, reason: 'invalid' }
    }
    return { ok: true, url: parsed.toString() }
  } catch {
    return { ok: false, reason: 'invalid' }
  }
}
