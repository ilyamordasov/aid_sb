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

function rewriteHtmlUrlsToProxy(html, baseOrigin) {
  const baseUrl = baseOrigin.endsWith('/') ? baseOrigin : `${baseOrigin}/`
  const resolveUrl = (value) => {
    try {
      const absolute = new URL(value, baseUrl).href
      return `/__proxy?url=${encodeURIComponent(absolute)}`
    } catch {
      return value
    }
  }

  let out = html.replace(
    /\s(href|src|action)\s*=\s*(["'])(https?:\/\/[^"']+)\2/gi,
    (_, attrName, quote, url) => ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  )

  out = out.replace(
    /\s(href|src|action)\s*=\s*(["'])((?:\.\.?\/)[^"']*)\2/gi,
    (_, attrName, quote, url) => ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  )

  out = out.replace(
    /\s(href|src|action)\s*=\s*(["'])((?!https?:|\/\/)[^"']*)\2/gi,
    (full, attrName, quote, url) => {
      if (/^[a-z-]+:/i.test(url) || url.startsWith('//') || url.startsWith('#') || url.startsWith('?')) {
        return full
      }
      return ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
    }
  )

  return out
}

function rewriteScriptUrlsToProxy(scriptContent) {
  const toProxy = (url) => {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
      return `/__proxy?url=${encodeURIComponent(url)}`
    } catch {
      return url
    }
  }

  return scriptContent
    .replace(/"(https?:\/\/[^"]*)"/g, (_, url) => `"${toProxy(url)}"`)
    .replace(/'(https?:\/\/[^']*)'/g, (_, url) => `'${toProxy(url)}'`)
}

function rewriteInlineScriptUrls(html) {
  return html.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi, (tag, attrs, body) => {
    if (attrs && /src\s*=/i.test(attrs)) return tag
    return `<script${attrs || ''}>${rewriteScriptUrlsToProxy(body)}</script>`
  })
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const target = (event.queryStringParameters && event.queryStringParameters.url) || ''
  if (!target) {
    return { statusCode: 400, body: 'Missing url query parameter' }
  }

  let parsedTarget
  try {
    parsedTarget = new URL(target)
    if (parsedTarget.protocol !== 'http:' && parsedTarget.protocol !== 'https:') {
      return { statusCode: 400, body: 'Only http/https protocols are supported' }
    }
  } catch {
    return { statusCode: 400, body: 'Invalid target URL' }
  }

  const pathname = parsedTarget.pathname.toLowerCase()
  const looksLikeCss = /\.(css|less|scss)(\?|$)/i.test(pathname)
  const looksLikeJs = /\.(js|mjs|cjs)(\?|$)/i.test(pathname)
  const requestedResource = looksLikeCss || looksLikeJs

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
        ...(looksLikeCss
          ? { accept: 'text/css,*/*;q=0.9' }
          : looksLikeJs
            ? { accept: 'application/javascript,*/*;q=0.9' }
            : {}),
      },
    })
  } catch {
    return { statusCode: 502, body: 'Failed to fetch target site' }
  }

  const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
  const headers = {}
  upstream.headers.forEach((value, name) => {
    const lower = name.toLowerCase()
    if (HOP_BY_HOP_HEADERS.has(lower)) return
    if (BLOCKED_EMBED_HEADERS.has(lower)) return
    if (ENCODING_HEADERS.has(lower)) return
    if (lower === 'location') return
    headers[name] = value
  })

  if (requestedResource && contentType.includes('text/html')) {
    if (looksLikeCss) {
      return {
        statusCode: upstream.status,
        headers: { ...headers, 'content-type': 'text/css; charset=utf-8' },
        body: '/* resource unavailable */',
      }
    }
    if (looksLikeJs) {
      return {
        statusCode: upstream.status,
        headers: { ...headers, 'content-type': 'application/javascript; charset=utf-8' },
        body: '// resource unavailable',
      }
    }
  }

  if (contentType.includes('text/html')) {
    const html = await upstream.text()
    const baseHref = upstream.url || parsedTarget.toString()
    let rewritten = injectBaseTag(html, baseHref)
    rewritten = injectLightThemeGuard(rewritten)
    rewritten = neutralizeDarkColorScheme(rewritten)
    rewritten = rewriteHtmlUrlsToProxy(rewritten, baseHref)
    rewritten = rewriteInlineScriptUrls(rewritten)
    return {
      statusCode: upstream.status,
      headers: { ...headers, 'content-type': 'text/html; charset=utf-8' },
      body: rewritten,
    }
  }

  if (contentType.includes('javascript') || contentType.includes('ecmascript')) {
    const js = await upstream.text()
    return {
      statusCode: upstream.status,
      headers: { ...headers, 'content-type': contentType },
      body: rewriteScriptUrlsToProxy(js),
    }
  }

  if (contentType.includes('css') || contentType.includes('text/css')) {
    const css = await upstream.text()
    let rewritten = neutralizeDarkColorScheme(css)
    rewritten = rewritten.replace(
      /url\s*\(\s*(["']?)(https?:\/\/[^"')]+)\1\s*\)/gi,
      (full, _quote, url) => `url("/__proxy?url=${encodeURIComponent(url)}")`
    )
    return {
      statusCode: upstream.status,
      headers: { ...headers, 'content-type': contentType },
      body: rewritten,
    }
  }

  const arrayBuffer = await upstream.arrayBuffer()
  return {
    statusCode: upstream.status,
    headers,
    body: Buffer.from(arrayBuffer).toString('base64'),
    isBase64Encoded: true,
  }
}

