export interface CloseGestureEventLike {
  preventDefault: () => void
  stopPropagation: () => void
}

export function handleOmniboxCloseGesture(event: CloseGestureEventLike, closeOverlay: () => void): void {
  event.preventDefault()
  event.stopPropagation()
  closeOverlay()
}
