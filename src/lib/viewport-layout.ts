export interface ViewportMetricsInput {
  innerHeight: number
  visibleHeight: number
  offsetTop: number
}

export interface ViewportMetricsResult {
  viewportOffsetTop: number
  keyboardHeight: number
  appVisibleHeight: number
}

export function computeViewportMetrics({
  innerHeight,
  visibleHeight,
  offsetTop,
}: ViewportMetricsInput): ViewportMetricsResult {
  const safeVisibleHeight = Math.max(0, visibleHeight)
  const safeOffsetTop = Math.max(0, offsetTop)
  const safeInnerHeight = Math.max(0, innerHeight)
  const keyboardHeight = Math.max(0, safeInnerHeight - safeVisibleHeight)

  return {
    viewportOffsetTop: safeOffsetTop,
    keyboardHeight,
    appVisibleHeight: safeVisibleHeight || safeInnerHeight,
  }
}

export function buildOverlayBottom(basePx: number): string {
  return `calc(env(safe-area-inset-bottom) + ${basePx}px + var(--keyboard-height))`
}
