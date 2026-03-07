import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

function AttachIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60388_107101)">
        <g clipPath="url(#clip1_60388_107101)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.8861 3.65456C10.1973 1.38067 13.1028 0.602145 15.3753 1.91579L16.0937 2.33107C18.3656 3.6444 19.1446 6.55166 17.8337 8.82501L13.5801 16.1119C12.6105 17.7935 10.5522 18.447 8.87164 17.4755C7.19165 16.5044 6.99605 14.5718 7.96539 12.8908L9.53193 10.2637L11.1871 7.39334L12.4865 8.14264L10.8314 11.013L9.26483 13.6401C8.709 14.604 8.65902 15.62 9.62233 16.1769C10.5851 16.7334 11.7252 16.326 12.2807 15.3626L16.5343 8.0757C17.4317 6.51947 16.8982 4.52875 15.343 3.62971L14.6246 3.21443C13.0699 2.31569 11.0826 2.84818 10.1855 4.40386L5.25864 12.9481C3.80919 15.4617 4.6707 18.6769 7.18277 20.1291L7.2998 20.1967C9.81132 21.6485 13.555 20.7908 15.0041 18.2777L19.1006 11.2355L20.4 11.9848L16.3036 19.027C14.4403 22.2583 9.77838 23.3621 6.54909 21.4953L6.43208 21.4277C3.20333 19.5613 2.09624 15.4295 3.9592 12.1988L8.8861 3.65456Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_60388_107101">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_60388_107101">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60388_107111)">
        <path
          d="M4.64844 12C5.34337 15.4232 8.36985 17.9998 11.998 18C15.6263 17.9998 18.6527 15.4232 19.3477 12H20.8701C20.2049 15.9636 16.9517 19.0476 12.9062 19.4531L12.748 22H11.248L11.0889 19.4531C7.04392 19.047 3.79012 15.9632 3.125 12H4.64844ZM11.998 2C15.0356 2 17.498 4.46243 17.498 7.5V10.5C17.498 13.5376 15.0356 16 11.998 16C8.96048 16 6.49805 13.5376 6.49805 10.5V7.5C6.49805 4.46243 8.96048 2 11.998 2ZM11.998 3.5C9.78891 3.5 7.99805 5.29086 7.99805 7.5V10.5C7.99805 12.7091 9.78891 14.5 11.998 14.5C14.2072 14.5 15.998 12.7091 15.998 10.5V7.5C15.998 5.29086 14.2072 3.5 11.998 3.5Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_60388_107111">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60388_107659)">
        <path
          d="M19.5215 9.14453L18.4844 10.2275L12.7529 4.73828V21.9805H11.2529V4.73828L5.52148 10.2275L4.48438 9.14453L12.0029 1.94141L19.5215 9.14453Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_60388_107659">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

interface OmniboxProps {
  onSubmit: (value: string) => void
  onQueryChange?: (value: string) => void
  autoCompleteSuggestion?: string | null
  focusKey?: number
}

export interface OmniboxHandle {
  focusImmediately: () => void
}

const Omnibox = forwardRef<OmniboxHandle, OmniboxProps>(function Omnibox({
  onSubmit,
  onQueryChange,
  autoCompleteSuggestion = null,
  focusKey = 0,
}: OmniboxProps, ref) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const skipAsyncFocusRef = useRef(false)
  const isTyping = query.length > 0

  const focusAndMoveCaretToEnd = useCallback(() => {
    const target = inputRef.current
    if (!target) {
      return
    }
    try {
      target.focus({ preventScroll: true })
    } catch {
      target.focus()
    }
    const selection = window.getSelection()
    if (!selection) {
      return
    }
    const range = document.createRange()
    range.selectNodeContents(target)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      focusImmediately() {
        skipAsyncFocusRef.current = true
        focusAndMoveCaretToEnd()
      },
    }),
    [focusAndMoveCaretToEnd]
  )

  useEffect(() => {
    const target = inputRef.current
    if (!target) {
      return
    }

    // When focus was triggered inside the user gesture, skip delayed retries.
    if (skipAsyncFocusRef.current) {
      skipAsyncFocusRef.current = false
      return
    }

    // iOS Safari can ignore immediate focus during overlay transitions.
    const timers: number[] = []
    const rafId = window.requestAnimationFrame(() => {
      focusAndMoveCaretToEnd()
      ;[30, 90, 180, 320, 500].forEach((delay) => {
        timers.push(window.setTimeout(focusAndMoveCaretToEnd, delay))
      })
    })

    return () => {
      window.cancelAnimationFrame(rafId)
      timers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [focusAndMoveCaretToEnd, focusKey])

  useEffect(() => {
    if (!query) return
    applyAutocompleteSelection(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCompleteSuggestion])

  const submitQuery = () => {
    const value = (inputRef.current?.textContent ?? query).trim()
    if (!value) {
      return
    }
    onSubmit(value)
  }

  const applyAutocompleteSelection = (typedValue: string) => {
    const target = inputRef.current
    if (!target) return
    const suggestion = autoCompleteSuggestion?.trim() ?? ''

    // Do not rewrite content when autocomplete is inactive/mismatched:
    // rewriting textContent on each keystroke can reset caret position and
    // cause apparent RTL typing (new chars inserted at start).
    if (!typedValue || !suggestion || !suggestion.toLowerCase().startsWith(typedValue.toLowerCase())) {
      return
    }

    target.textContent = suggestion
    const textNode = target.firstChild
    if (!textNode) return
    const selection = window.getSelection()
    if (!selection) return
    const range = document.createRange()
    range.setStart(textNode, typedValue.length)
    range.setEnd(textNode, suggestion.length)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  return (
    <div className="omnibox-input" onClick={(event) => event.stopPropagation()}>
      <div className="omnibox-input-field">
        <div className="omnibox-input-text-wrap">
          <div
            ref={inputRef}
            role="textbox"
            aria-label="Omnibox"
            aria-multiline="false"
            tabIndex={0}
            className="omnibox-input-text"
            dir="ltr"
            lang="ru"
            inputMode="text"
            contentEditable
            suppressContentEditableWarning
            data-placeholder="ask anything or type url"
            onInput={(event) => {
              const value = (event.currentTarget.textContent ?? '').replace(/\n/g, '')
              const inputType = (event.nativeEvent as InputEvent | undefined)?.inputType ?? ''
              const isDeleteInput = inputType.startsWith('delete')
              setQuery(value)
              onQueryChange?.(value)
              if (!isDeleteInput) {
                applyAutocompleteSelection(value)
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                submitQuery()
              }
            }}
            spellCheck={false}
          />
        </div>

        <div className="omnibox-input-actions">
          <button type="button" className="omnibox-input-control" aria-label="Attach">
            <AttachIcon />
          </button>

          <button
            type="button"
            className={`omnibox-input-control ${isTyping ? 'omnibox-input-control-action' : ''}`}
            aria-label={isTyping ? 'Submit query' : 'Start voice input'}
            onClick={() => {
              if (isTyping) {
                submitQuery()
              }
            }}
          >
            {isTyping ? <ArrowUpIcon /> : <MicIcon />}
          </button>
        </div>
      </div>
    </div>
  )
})

export default Omnibox
