import { parseAddressInput } from './address'

export function resolveSuggestedHostToUrl(host: string): string {
  const trimmedHost = host.trim()
  if (!trimmedHost) {
    return 'https://'
  }

  const parsedDirect = parseAddressInput(trimmedHost)
  if (parsedDirect.ok) {
    return parsedDirect.url
  }

  const withProtocol = /^https?:\/\//i.test(trimmedHost) ? trimmedHost : `https://${trimmedHost}`
  const parsedWithProtocol = parseAddressInput(withProtocol)
  if (parsedWithProtocol.ok) {
    return parsedWithProtocol.url
  }

  return withProtocol
}
