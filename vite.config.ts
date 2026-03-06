import { defineConfig } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

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

/** Headers we must not forward because we send decompressed body (fetch() decodes for us). */
const ENCODING_HEADERS = new Set(['content-encoding', 'content-length'])

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function injectBaseTag(html: string, baseHref: string): string {
  const baseTag = `<base href="${escapeHtmlAttribute(baseHref)}">`
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (match) => `${match}\n${baseTag}`)
  }
  return `${baseTag}\n${html}`
}

function injectLightThemeGuard(html: string): string {
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

function neutralizeDarkColorScheme(content: string): string {
  return content.replace(/prefers-color-scheme\s*:\s*dark/gi, 'prefers-color-scheme: __proxy_never_dark')
}

/** Rewrite all URLs (absolute and relative) in href, src, action to go through proxy. */
function rewriteHtmlUrlsToProxy(html: string, baseOrigin: string, proxyPath: string): string {
  const baseUrl = baseOrigin.endsWith('/') ? baseOrigin : baseOrigin + '/'
  const resolveUrl = (value: string) => {
    try {
      const absolute = new URL(value, baseUrl).href
      return `${proxyPath}?url=${encodeURIComponent(absolute)}`
    } catch {
      return value
    }
  }
  // Absolute http(s) URLs
  let out = html.replace(
    /\s(href|src|action)\s*=\s*(["'])(https?:\/\/[^"']+)\2/gi,
    (_, attrName, quote, url: string) =>
      ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  )
  // Relative URLs (start with / or ./ or ../) so they don't go cross-origin
  out = out.replace(
    /\s(href|src|action)\s*=\s*(["'])((?:\.\.?\/)[^"']*)\2/gi,
    (_, attrName, quote, url: string) =>
      ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
  )
  out = out.replace(
    /\s(href|src|action)\s*=\s*(["'])((?!https?:|\/\/)[^"']*)\2/gi,
    (_, attrName, quote, url: string) => {
      if (/^[a-z-]+:/i.test(url) || url.startsWith('//') || url.startsWith('#') || url.startsWith('?')) {
        return _
      }
      return ` ${attrName}=${quote}${resolveUrl(url)}${quote}`
    }
  )
  return out
}

/** Rewrite all https? URL string literals in script content so fetch/XHR go through proxy. */
function rewriteScriptUrlsToProxy(scriptContent: string, proxyPath: string): string {
  const doubleQuoted = /"(https?:\/\/[^"]*)"/g
  const singleQuoted = /'(https?:\/\/[^']*)'/g
  const toProxy = (url: string) => {
    try {
      new URL(url)
      return `${proxyPath}?url=${encodeURIComponent(url)}`
    } catch {
      return url
    }
  }
  return scriptContent
    .replace(doubleQuoted, (_, url) => `"${toProxy(url)}"`)
    .replace(singleQuoted, (_, url) => `'${toProxy(url)}'`)
}

function rewriteInlineScriptUrls(html: string, proxyPath: string): string {
  return html.replace(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi, (tag, attrs, body) => {
    if (attrs && /src\s*=/i.test(attrs)) return tag
    return `<script${attrs ?? ''}>${rewriteScriptUrlsToProxy(body, proxyPath)}</script>`
  })
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function writeHtmlError(res: ServerResponse, status: number, message: string): void {
  res.statusCode = status
  res.setHeader('content-type', 'text/html; charset=utf-8')
  res.end(`<!doctype html><html><body><h1>${message}</h1></body></html>`)
}

async function proxyHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== 'GET') {
    writeHtmlError(res, 405, 'Method not allowed')
    return
  }

  const requestUrl = new URL(req.url ?? '/', 'http://localhost')
  const target = requestUrl.searchParams.get('url')?.trim()
  if (!target) {
    writeHtmlError(res, 400, 'Missing url query parameter')
    return
  }

  let parsedTarget: URL
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

  const pathnameForAccept = parsedTarget.pathname.toLowerCase()
  const acceptHeader =
    /\.(css|less|scss)(\?|$)/i.test(pathnameForAccept)
      ? 'text/css,*/*;q=0.9'
      : /\.(js|mjs|cjs)(\?|$)/i.test(pathnameForAccept)
        ? 'application/javascript,*/*;q=0.9'
        : undefined

  let upstream: Response
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
  const pathname = parsedTarget.pathname.toLowerCase()
  const looksLikeCss = /\.(css|less|scss)(\?|$)/i.test(pathname)
  const looksLikeJs = /\.(js|mjs|cjs)(\?|$)/i.test(pathname)
  const requestedResource = looksLikeCss || looksLikeJs

  res.statusCode = upstream.status

  upstream.headers.forEach((value, name) => {
    const lowerName = name.toLowerCase()
    if (HOP_BY_HOP_HEADERS.has(lowerName)) {
      return
    }
    if (BLOCKED_EMBED_HEADERS.has(lowerName)) {
      return
    }
    if (ENCODING_HEADERS.has(lowerName)) {
      return // body is already decompressed by fetch(); do not forward encoding/length
    }
    if (lowerName === 'location') {
      return
    }
    res.setHeader(name, value)
  })

  // If client asked for CSS/JS but server returned HTML (404/error page), don't send HTML as stylesheet/script
  if (requestedResource && contentType.includes('text/html')) {
    if (looksLikeCss) {
      res.setHeader('content-type', 'text/css; charset=utf-8')
      res.end('/* resource unavailable */')
      return
    }
    if (looksLikeJs) {
      res.setHeader('content-type', 'application/javascript; charset=utf-8')
      res.end('// resource unavailable')
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
    res.end(rewritten)
    return
  }

  if (contentType.includes('javascript') || contentType.includes('ecmascript')) {
    const js = await upstream.text()
    const rewritten = rewriteScriptUrlsToProxy(js, '/__proxy')
    res.setHeader('content-type', contentType)
    res.end(rewritten)
    return
  }

  if (contentType.includes('css') || contentType.includes('text/css')) {
    const css = await upstream.text()
    let rewritten = neutralizeDarkColorScheme(css)
    rewritten = rewritten.replace(
      /url\s*\(\s*(["']?)(https?:\/\/[^"')]+)\1\s*\)/gi,
      (_, quote, url: string) => {
        try {
          new URL(url)
          return `url("${'/__proxy?url=' + encodeURIComponent(url)}")`
        } catch {
          return _
        }
      }
    )
    res.setHeader('content-type', contentType)
    res.end(rewritten)
    return
  }

  const payload = Buffer.from(await upstream.arrayBuffer())
  res.end(payload)
}

function iframeProxyPlugin(): Plugin {
  return {
    name: 'iframe-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/__proxy', (req, res, next) => {
        void proxyHandler(req, res).catch(() => {
          if (!res.headersSent) {
            writeHtmlError(res, 500, 'Unexpected proxy error')
            return
          }
          next()
        })
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/__proxy', (req, res, next) => {
        void proxyHandler(req, res).catch(() => {
          if (!res.headersSent) {
            writeHtmlError(res, 500, 'Unexpected proxy error')
            return
          }
          next()
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), iframeProxyPlugin()],
})
