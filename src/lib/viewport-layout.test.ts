import { describe, expect, it } from 'vitest'
import { buildOverlayBottom, computeViewportMetrics } from './viewport-layout'

describe('viewport layout helpers', () => {
  it('builds bottom expression that follows keyboard height', () => {
    expect(buildOverlayBottom(16)).toBe('calc(env(safe-area-inset-bottom) + 16px + var(--keyboard-height))')
    expect(buildOverlayBottom(187)).toBe('calc(env(safe-area-inset-bottom) + 187px + var(--keyboard-height))')
  })

  it('keeps layout anchored to stable viewport while reporting keyboard height', () => {
    const result = computeViewportMetrics({
      innerHeight: 844,
      visibleHeight: 544,
      offsetTop: 36,
    })

    expect(result.viewportOffsetTop).toBe(0)
    expect(result.keyboardHeight).toBe(300)
    expect(result.appVisibleHeight).toBe(844)
  })

  it('ignores visual viewport offset to prevent first-focus auto-pan layout shifts', () => {
    const result = computeViewportMetrics({
      innerHeight: 844,
      visibleHeight: 600,
      offsetTop: 44,
    })

    expect(result.keyboardHeight).toBe(244)
    expect(result.viewportOffsetTop).toBe(0)
    expect(result.appVisibleHeight).toBe(844)
  })
})
