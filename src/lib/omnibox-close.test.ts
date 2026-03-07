import { describe, expect, it, vi } from 'vitest'
import { handleOmniboxCloseGesture } from './omnibox-close'

describe('handleOmniboxCloseGesture', () => {
  it('prevents default behavior, stops propagation and closes overlay', () => {
    const preventDefault = vi.fn()
    const stopPropagation = vi.fn()
    const closeOverlay = vi.fn()

    handleOmniboxCloseGesture({ preventDefault, stopPropagation }, closeOverlay)

    expect(preventDefault).toHaveBeenCalledOnce()
    expect(stopPropagation).toHaveBeenCalledOnce()
    expect(closeOverlay).toHaveBeenCalledOnce()
  })
})
