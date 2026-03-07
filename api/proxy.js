const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

const BLOCKED_EMBED_HEADERS = new Set([
  'x-frame-options',
  'content-security-policy',
  'content-security-policy-report-only',
  'cross-origin-opener-policy',
  'cross-origin-embedder-policy',
  'cross-origin-resource-policy',
])

const ENCODING_HEADERS = new Set(['content-encoding', 'content-length'])

function escapeHtmlAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function injectBaseTag(html, baseHref) {
  const baseTag = `<base href="${escapeHtmlAttribute(baseHref)}">`
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (match) => `${match}\n${baseTag}`)
  }
  return `${baseTag}\n${html}`
}

function injectLightThemeGuard(html) {
  const lightThemeGuard = `
<meta name="color-scheme" content="light">
<style id="proxy-force-light-theme">
  :root { color-scheme: light !important; }
</style>
<script>
  (() => {
    const nativeMatchMedia = window.matchMedia?.bind(window)
    if (!nativeMatchMedia) return

    window.matchMedia = (query) => {
      if (/prefers-color-scheme\\s*:\\s*dark/i.test(query)) {
        const result = nativeMatchMedia('(prefers-color-scheme: light)')
        return {
          ...result,
          matches: false,
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          onchange: null,
          dispatchEvent: () => false,
        }
      }
      if (/prefers-color-scheme\\s*:\\s*light/i.test(query)) {
        const result = nativeMatchMedia('(prefers-color-scheme: light)')
        return {
          ...result,
          matches: true,
          media: query,
        }
      }
      return nativeMatchMedia(query)
    }
  })()
</script>`.trim()

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (match) => `${match}\n${lightThemeGuard}`)
  }
  return `${lightThemeGuard}\n${html}`
}

function neutralizeDarkColorScheme(content) {
  return content.replace(/prefers-color-scheme\s*:\s*dark/gi, 'prefers-color-scheme: __proxy_never_dark')
}

function rewriteHtmlUrlsToProxy(html, baseOrigin, proxyPath) {
  const baseUrl = baseOrigin.endsWith('/') ? baseOrigin : `${baseOrigin}/`
  const resolveUrl = (value) => {
    try {
      const absolute = new URL(value, baseUrl).href
      return `${proxyPath}?url=${encodeURIComponent(absolute)}`
    } catch {
      return value
    }
  }

  let out = html.replace(/\s(href|src|action)\s*=\s*(["'])(https?:\/\/[^"']+)\2/gi, (_, attrName, quote, url) => {
    return ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  })

  out = out.replace(/\s(href|src|action)\s*=\s*(["'])((?:\.\.?\/)[^"']*)\2/gi, (_, attrName, quote, url) => {
    return ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  })

  out = out.replace(/\s(href|src|action)\s*=\s*(["'])((?!https?:|\/\/)[^"']*)\2/gi, (match, attrName, quote, url) => {
    if (/^[a-z-]+:/i.test(url) || url.startsWith('//') || url.startsWith('#') || url.startsWith('?')) {
      return match
    }
    return ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  })

  return out
}

function rewriteScriptUrlsToProxy(scriptContent, proxyPath) {
  const doubleQuoted = /"(https?:\/\/[^"]*)"/g
  const singleQuoted = /'(https?:\/\/[^']*)'/g
  const toProxy = (url) => `${proxyPath}?url=${encodeURIComponent(url)}`
  return scriptContent
    .replace(doubleQuoted, (_, url) => `"${toProxy(url)}"`)
    .replace(singleQuoted, (_, url) => `'${toProxy(url)}'`)
}

function rewriteInlineScriptUrls(html, proxyPath) {
  return html.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi, (tag, attrs, body) => {
    if (attrs && /src\s*=/i.test(attrs)) return tag
    return `<script${attrs ?? ''}>${rewriteScriptUrlsToProxy(body, proxyPath)}</script>`
  })
}

function writeHtmlError(res, status, message) {
  res.status(status).setHeader('content-type', 'text/html; charset=utf-8')
  res.send(`<!doctype html><html><body><h1>${message}</h1></body></html>`)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    writeHtmlError(res, 405, 'Method not allowed')
    return
  }

  const target = (req.query?.url ?? '').toString().trim()
  if (!target) {
    writeHtmlError(res, 400, 'Missing url query parameter')
    return
  }

  let parsedTarget
  try {
    parsedTarget = new URL(target)
    if (parsedTarget.protocol !== 'http:' && parsedTarget.protocol !== 'https:') {
      writeHtmlError(res, 400, 'Only http/https protocols are supported')
      return
    }
  } catch {
    writeHtmlError(res, 400, 'Invalid target URL')
    return
  }

  const pathname = parsedTarget.pathname.toLowerCase()
  const acceptHeader = /\.(css|less|scss)(\?|$)/i.test(pathname)
    ? 'text/css,*/*;q=0.9'
    : /\.(js|mjs|cjs)(\?|$)/i.test(pathname)
      ? 'application/javascript,*/*;q=0.9'
      : undefined

  let upstream
  try {
    upstream = await fetch(parsedTarget.toString(), {
      redirect: 'follow',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
        'accept-language': 'ru-RU,ru;q=0.9,en;q=0.8',
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-prefers-contrast': 'no-preference',
        ...(acceptHeader && { accept: acceptHeader }),
      },
    })
  } catch {
    writeHtmlError(res, 502, 'Failed to fetch target site')
    return
  }

  const contentType = upstream.headers.get('content-type') ?? 'application/octet-stream'
  const looksLikeCss = /\.(css|less|scss)(\?|$)/i.test(pathname)
  const looksLikeJs = /\.(js|mjs|cjs)(\?|$)/i.test(pathname)
  const requestedResource = looksLikeCss || looksLikeJs

  res.status(upstream.status)
  upstream.headers.forEach((value, name) => {
    const lowerName = name.toLowerCase()
    if (HOP_BY_HOP_HEADERS.has(lowerName)) return
    if (BLOCKED_EMBED_HEADERS.has(lowerName)) return
    if (ENCODING_HEADERS.has(lowerName)) return
    if (lowerName === 'location') return
    res.setHeader(name, value)
  })

  if (requestedResource && contentType.includes('text/html')) {
    if (looksLikeCss) {
      res.setHeader('content-type', 'text/css; charset=utf-8')
      res.send('/* resource unavailable */')
      return
    }
    if (looksLikeJs) {
      res.setHeader('content-type', 'application/javascript; charset=utf-8')
      res.send('// resource unavailable')
      return
    }
  }

  if (contentType.includes('text/html')) {
    const html = await upstream.text()
    const baseHref = upstream.url ?? parsedTarget.toString()
    let rewritten = injectBaseTag(html, baseHref)
    rewritten = injectLightThemeGuard(rewritten)
    rewritten = neutralizeDarkColorScheme(rewritten)
    rewritten = rewriteHtmlUrlsToProxy(rewritten, baseHref, '/__proxy')
    rewritten = rewriteInlineScriptUrls(rewritten, '/__proxy')
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.send(rewritten)
    return
  }

  if (contentType.includes('javascript') || contentType.includes('ecmascript')) {
    const js = await upstream.text()
    const rewritten = rewriteScriptUrlsToProxy(js, '/__proxy')
    res.setHeader('content-type', contentType)
    res.send(rewritten)
    return
  }

  if (contentType.includes('css') || contentType.includes('text/css')) {
    const css = await upstream.text()
    let rewritten = neutralizeDarkColorScheme(css)
    rewritten = rewritten.replace(/url\s*\(\s*(["']?)(https?:\/\/[^"')]+)\1\s*\)/gi, (_, _quote, url) => {
      return `url("${'/__proxy?url=' + encodeURIComponent(url)}")`
    })
    res.setHeader('content-type', contentType)
    res.send(rewritten)
    return
  }

  const payload = Buffer.from(await upstream.arrayBuffer())
  res.send(payload)
}
