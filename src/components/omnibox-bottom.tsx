interface BottomBarFoundationProps {
  currentHost?: string
  onMoreOptionsClick?: () => void
  isMoreOptionsOpen?: boolean
}

export default function BottomBarFoundation({
  currentHost = 'apple.com',
  onMoreOptionsClick,
  isMoreOptionsOpen = false,
}: BottomBarFoundationProps) {
  return (
    <div className="safari-bottom-wrap" role="navigation" aria-label="Browser controls">
      <div className="safari-bottom-row">
        <button type="button" className="safari-bottom-btn" aria-label="Back">
          <svg
            className="safari-bottom-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g clipPath="url(#clip0_back_60388_3475)">
              <path
                d="M15.5283 4.5293L8.05859 11.999L15.5283 19.4688L14.4678 20.5293L5.9375 11.999L14.4678 3.46875L15.5283 4.5293Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_back_60388_3475">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>

        <div className="safari-address-pill" aria-label="Current website">
          <span className="safari-address-text">{currentHost}</span>
        </div>

        <button
          type="button"
          className="safari-bottom-btn"
          aria-label={isMoreOptionsOpen ? 'Close more options' : 'More options'}
          onClick={(event) => {
            event.stopPropagation()
            onMoreOptionsClick?.()
          }}
        >
          {isMoreOptionsOpen ? (
            <svg
              className="safari-bottom-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_close_60453_94172)">
                <path
                  d="M19.5293 5.5293L13.0596 11.999L19.5293 18.4688L18.4688 19.5293L11.999 13.0596L5.5293 19.5293L4.46875 18.4688L10.9385 11.999L4.46875 5.5293L5.5293 4.46875L11.999 10.9385L18.4688 4.46875L19.5293 5.5293Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_close_60453_94172">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              className="safari-bottom-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_more_60388_105788)">
                <path
                  d="M5.5 10.5C6.32843 10.5 7 11.1716 7 12C7 12.8284 6.32843 13.5 5.5 13.5C4.67157 13.5 4 12.8284 4 12C4 11.1716 4.67157 10.5 5.5 10.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5ZM18.5 10.5C19.3284 10.5 20 11.1716 20 12C20 12.8284 19.3284 13.5 18.5 13.5C17.6716 13.5 17 12.8284 17 12C17 11.1716 17.6716 10.5 18.5 10.5Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_more_60388_105788">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>

      <div className="safari-home-indicator" aria-hidden="true" />
    </div>
  )
}
