import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { parseAddressInput } from './lib/address'
import { SITE_SUGGESTIONS } from './lib/site-suggestions'
import OmniboxBottom from './components/omnibox-bottom'
import Omnibox from './components/omnibox'
import Header from './components/header'
import IncognitoHeader from './components/incognito-header'
import SuggestSite from './components/suggest-site'
import './App.css'

type FrameState = 'idle' | 'loading' | 'ready' | 'blocked'

function SuggestIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.97572 1.91025C7.73631 1.92672 5.64723 4.03978 3.79776 7.11384C1.94104 10.2 1.17748 13.1139 2.38109 14.9748C3.58467 16.8357 6.47032 17.7508 10.0018 17.7508C10.0019 17.7508 10.002 17.7508 10.0021 17.7508L10.0847 17.7506C13.5511 17.7365 16.3837 16.8355 17.5943 15.0183L17.6228 14.9748C18.817 13.1284 18.0747 10.2454 16.2495 7.18615L16.2061 7.11384C14.3495 4.02785 12.2514 1.91016 10.0021 1.91016L9.97572 1.91025ZM10.0019 15.8124C8.38814 15.8124 7.01306 15.6014 5.96097 15.2318C4.89936 14.8589 4.30198 14.3756 4.00871 13.9221C3.77877 13.5666 3.62751 12.9466 3.84167 11.8882C4.05502 10.8338 4.59669 9.5459 5.4587 8.11312C6.33374 6.6587 7.20327 5.54175 8.03471 4.80858C8.86667 4.07495 9.51542 3.84855 10.0021 3.84855C10.4887 3.84855 11.1374 4.07493 11.9693 4.80858C12.8007 5.54176 13.6702 6.65873 14.5452 8.11312C15.4072 9.5459 15.9489 10.8338 16.1622 11.8882C16.3764 12.9466 16.2251 13.5666 15.9952 13.9221C15.7019 14.3756 15.1045 14.8589 14.0429 15.2318C12.9908 15.6014 11.6158 15.8124 10.002 15.8124H10.0019Z"
        fill="url(#paint0_radial_60196_584962)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_60196_584962"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17.0842 28.9483 34.2881 -56.1595 -0.4322 -7.9997)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2A2D" />
          <stop offset="0.468553" stopColor="#FF2A2D" />
          <stop offset="0.76716" stopColor="#FF62EA" />
          <stop offset="0.961294" stopColor="#C9FF25" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function HistoryClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60388_61536)">
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM12.7998 11.666L16.0654 14.9316L14.9346 16.0625L11.2002 12.3281V5H12.7998V11.666Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_60388_61536">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function FavoriteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33201 2.60585C1.15345 4.0401 0.19672 7.08654 1.80084 10.4281C3.07036 13.0727 4.63424 14.5613 6.29557 15.978C7.31241 16.845 9.66821 18.3044 10 18.5006C10.3318 18.3044 12.6876 16.845 13.7045 15.978C15.3658 14.5613 16.9297 13.0727 18.1992 10.4281C19.8033 7.08654 18.8466 4.0401 16.668 2.60585C15.7417 1.99601 13.8656 1.68686 12.291 2.4565C11.1551 3.01178 10.182 3.94265 10.0228 4.09888C10.0078 4.11361 10 4.12146 10 4.12146C10 4.12146 9.99225 4.11361 9.97725 4.09888C9.81805 3.94265 8.84497 3.01178 7.709 2.4565C6.13447 1.68686 4.25831 1.99601 3.33201 2.60585ZM10 5.96816C9.51078 5.47458 9.03877 4.96433 8.49918 4.5244C8.12131 4.21633 7.6352 3.86743 7.13809 3.62444C6.59306 3.35802 5.96762 3.26675 5.37248 3.31039C4.76208 3.35514 4.28701 3.53355 4.04686 3.69166C2.49677 4.71216 1.60374 7.0136 2.97279 9.86551C4.12736 12.2706 5.53276 13.619 7.13908 14.9888C7.80271 15.5547 9.16489 16.4446 10 16.972C10.8351 16.4446 12.1973 15.5547 12.861 14.9888C14.4673 13.619 15.8727 12.2706 17.0272 9.86551C18.3963 7.0136 17.5033 4.71216 15.9532 3.69166C15.713 3.53356 15.238 3.35514 14.6276 3.31039C14.0324 3.26675 13.407 3.35802 12.8619 3.62444C12.3648 3.86743 11.8787 4.21633 11.5009 4.5244C10.9619 4.96378 10.4887 5.47507 10 5.96816Z"
        fill="black"
      />
    </svg>
  )
}

function TranslateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.2381 0.832031H14.8677L14.8672 0.833969C14.201 3.31142 14.2004 3.31382 11.7196 3.97999V4.35038C12.9604 4.68393 13.5807 4.85069 13.9743 5.24428C14.3677 5.63782 14.5344 6.25813 14.8677 7.4987H15.2381C15.5714 6.25813 15.7381 5.63782 16.1315 5.24428C16.5251 4.85069 17.1454 4.68393 18.3862 4.35038V3.97999C17.1455 3.64683 16.5252 3.48024 16.1316 3.08678C15.7381 2.69329 15.5714 2.07288 15.2381 0.832031Z" fill="black" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.4265 5.21202C8.55718 5.15368 9.64934 5.03136 10.6982 4.83878L10.8229 6.08656C9.75126 6.27849 8.64345 6.40034 7.50526 6.45961C7.58098 7.36093 7.69614 8.22663 7.85219 9.05913C7.98663 9.02721 8.12378 8.99722 8.26365 8.96925C9.79697 8.66259 11.1396 8.68586 12.2544 8.97174C12.3393 8.37481 12.4022 7.73424 12.4403 7.04744L13.6884 7.11678C13.6428 7.93849 13.5627 8.70588 13.4511 9.42125C14.3154 9.8667 14.9714 10.5156 15.3895 11.3141C16.42 13.2822 15.8334 15.8525 13.8125 17.7829L12.9491 16.8791C14.6783 15.2272 14.9891 13.2442 14.2821 11.8939C14.0517 11.4538 13.694 11.0469 13.2002 10.7237C12.7442 12.6889 12.0148 14.1921 11.0868 15.2966C10.9032 15.5151 10.7127 15.717 10.5162 15.903C10.7854 16.3173 11.0731 16.7211 11.3796 17.1151L10.3929 17.8825C10.0871 17.4893 9.79916 17.0876 9.52866 16.6769C8.40243 17.3974 7.1462 17.7071 5.88623 17.7071C3.63634 17.7071 2.35357 15.7646 2.61999 13.759C2.84683 12.0513 4.13898 10.3505 6.64873 9.4208C6.46783 8.48388 6.33725 7.51094 6.25443 6.49977C5.03217 6.51541 3.77845 6.46455 2.5 6.35597L2.60579 5.11045C3.82964 5.2144 5.02166 5.2632 6.17707 5.25061C6.15029 4.62336 6.14043 3.98197 6.14692 3.32593L7.39686 3.3383C7.39052 3.97891 7.40027 4.60326 7.4265 5.21202ZM6.92104 10.6531C4.86905 11.4611 4.00725 12.8083 3.8591 13.9236C3.67248 15.3285 4.53446 16.4571 5.88623 16.4571C6.9332 16.4571 7.95809 16.2039 8.87638 15.6099C8.01194 14.0824 7.36669 12.4357 6.92104 10.6531ZM9.85518 14.7982C9.94849 14.7012 10.04 14.5993 10.1297 14.4926C10.9388 13.5295 11.6179 12.1411 12.0354 10.2055C11.1237 9.94991 9.95541 9.90565 8.5088 10.195C8.37466 10.2218 8.24393 10.2505 8.11654 10.281C8.5189 11.9131 9.09441 13.412 9.85518 14.7982Z"
        fill="black"
      />
    </svg>
  )
}

function ShareLinkIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60171_586273)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.7 11.1617C7.10725 11.1257 7.5362 11.1118 8 11.1118V15H9L16 8L9 1H8V4.91011C3.53175 5.79724 0.588043 8.80854 0.0788605 12.9222C0.0704882 12.9899 0.0627744 13.0578 0.0557226 13.126C0.0470458 13.21 0.0393713 13.2944 0.0327072 13.3792C0.0109894 13.6557 0 13.9368 0 14.2222H0.777778C0.960837 14.0604 1.13839 13.9068 1.31106 13.7609C3.46899 11.9374 4.86387 11.3243 6.7 11.1617ZM1.61283 11.8613C2.43857 11.2523 3.20793 10.7988 3.99131 10.4773C5.30677 9.93739 6.55936 9.81179 8 9.81179H9.3V12.8615L14.1615 8L9.3 3.13848V5.97739L8.25316 6.18523C4.7708 6.87661 2.42274 8.96522 1.61283 11.8613Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_60171_586273">
          <rect width="16" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CopyLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip0_60191_121059)">
        <g clipPath="url(#clip1_60191_121059)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6924 0.0078125C12.9829 0.0312924 13.7628 0.125191 14.376 0.500977C14.8332 0.781246 15.2178 1.1658 15.498 1.62305C15.9991 2.44064 15.999 3.55434 15.999 5.78027V6.21973L15.9912 7.69336C15.9677 8.98388 15.8738 9.76373 15.498 10.377L15.3877 10.5449C15.1201 10.9286 14.776 11.2538 14.376 11.499L14.2188 11.5869C13.6789 11.8642 13.0017 11.9544 11.9834 11.9844C11.9505 13.1037 11.8457 13.8113 11.499 14.377L11.3887 14.5449C11.1211 14.9286 10.777 15.2538 10.377 15.499L10.2197 15.5869C9.62998 15.8898 8.87651 15.9707 7.69336 15.9922L6.21973 16H5.78027L4.30664 15.9922C3.12349 15.9707 2.37002 15.8898 1.78027 15.5869L1.62305 15.499C1.22301 15.2538 0.87891 14.9286 0.611328 14.5449L0.500977 14.377C0.125191 13.7637 0.0312924 12.9839 0.0078125 11.6934L0 10.2197V9.78027C0 7.69324 0.000124156 6.5844 0.413086 5.78027L0.500977 5.62305C0.746176 5.22301 1.07141 4.87891 1.45508 4.61133L1.62305 4.50098C2.18891 4.15422 2.89667 4.04849 4.0166 4.01562C4.04587 2.99732 4.13487 2.32012 4.41211 1.78027L4.5 1.62305C4.7452 1.22301 5.07044 0.87891 5.4541 0.611328L5.62207 0.500977C6.2353 0.125191 7.01514 0.0312924 8.30566 0.0078125L9.7793 0H10.2188L11.6924 0.0078125ZM5.78027 5.2998C4.64228 5.2998 3.87972 5.30105 3.29688 5.35645C2.87403 5.39665 2.6216 5.45999 2.4502 5.5332L2.30273 5.60938C2.09078 5.73926 1.9041 5.90543 1.75098 6.09961L1.60938 6.30273C1.50508 6.47294 1.41002 6.73338 1.35645 7.29688C1.30105 7.87972 1.2998 8.64228 1.2998 9.78027V10.2197C1.2998 11.3577 1.30105 12.1203 1.35645 12.7031C1.41002 13.2666 1.50508 13.5271 1.60938 13.6973L1.75098 13.9004C1.9041 14.0946 2.09078 14.2607 2.30273 14.3906L2.4502 14.4668C2.6216 14.54 2.87403 14.6034 3.29688 14.6436C3.87972 14.699 4.64228 14.7002 5.78027 14.7002H6.21973C7.35772 14.7002 8.12028 14.699 8.70312 14.6436C9.26663 14.59 9.52706 14.4949 9.69727 14.3906L9.90039 14.249C10.0946 14.0959 10.2607 13.9092 10.3906 13.6973L10.4668 13.5498C10.54 13.3784 10.6034 13.126 10.6436 12.7031C10.699 12.1203 10.7002 11.3577 10.7002 10.2197V9.78027C10.7002 8.64228 10.699 7.87972 10.6436 7.29688C10.59 6.73338 10.4949 6.47294 10.3906 6.30273C10.2607 6.09078 10.0946 5.9041 9.90039 5.75098L9.69727 5.60938C9.52706 5.50508 9.26663 5.41002 8.70312 5.35645C8.12028 5.30105 7.35772 5.2998 6.21973 5.2998H5.78027ZM9.7793 1.2998C8.64131 1.2998 7.87874 1.30105 7.2959 1.35645C6.87305 1.39665 6.62062 1.45999 6.44922 1.5332L6.30176 1.60938C6.0898 1.73926 5.90313 1.90543 5.75 2.09961L5.6084 2.30273C5.5041 2.47294 5.40905 2.73337 5.35547 3.29688C5.33561 3.5058 5.32405 3.73783 5.31641 4.00195L5.78027 4H6.21973L7.69336 4.00781C8.98388 4.03129 9.76373 4.12519 10.377 4.50098C10.8342 4.78125 11.2188 5.1658 11.499 5.62305C12 6.44064 12 7.55434 12 9.78027V10.2197L11.9971 10.6807C12.2612 10.6731 12.4932 10.6634 12.7021 10.6436C13.2656 10.59 13.5261 10.4949 13.6963 10.3906L13.8994 10.249C14.0936 10.0959 14.2598 9.90922 14.3896 9.69727L14.4658 9.5498C14.539 9.3784 14.6024 9.12597 14.6426 8.70312C14.698 8.12028 14.6992 7.35772 14.6992 6.21973V5.78027C14.6992 4.64228 14.698 3.87972 14.6426 3.29688C14.589 2.73337 14.4939 2.47294 14.3896 2.30273C14.2598 2.09078 14.0936 1.9041 13.8994 1.75098L13.6963 1.60938C13.5261 1.50508 13.2656 1.41002 12.7021 1.35645C12.1193 1.30105 11.3567 1.2998 10.2188 1.2998H9.7793Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_60191_121059">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip1_60191_121059">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function App() {
  const OMNIBOX_HEIGHT = 161
  const OMNIBOX_BOTTOM_GAP = 16

  const [currentUrl, setCurrentUrl] = useState<string | null>('https://apple.com')
  const [isLoading, setIsLoading] = useState(false)
  const [frameState, setFrameState] = useState<FrameState>('idle')
  const [isOmniboxExpanded, setIsOmniboxExpanded] = useState(false)
  const [omniboxFocusKey, setOmniboxFocusKey] = useState(0)
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
  const [omniboxQuery, setOmniboxQuery] = useState('')
  const [incognitoAnimKey, setIncognitoAnimKey] = useState(0)
  const [moreOptionsAnimKey, setMoreOptionsAnimKey] = useState(0)
  const pageViewRef = useRef<HTMLElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const wasIncognitoTriggerRef = useRef(false)
  const wasMoreOptionsOpenRef = useRef(false)
  const proxiedUrl = currentUrl ? `/__proxy?url=${encodeURIComponent(currentUrl)}` : null

  const WEBSITE_RE =
    /^(?:(?:https?:\/\/)?(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,})(?::\d{2,5})?(?:[/?#][^\s]*)?)$/i

  const getCurrentHost = () => {
    if (!currentUrl) return ''
    try {
      const url = new URL(currentUrl)
      return url.hostname
    } catch {
      return currentUrl
    }
  }

  const trimmedQuery = omniboxQuery.trim()
  const isTypingInOmnibox = trimmedQuery.length > 0
  const normalizedQuery = trimmedQuery.toLowerCase()
  const isIncognitoTrigger = normalizedQuery.startsWith('sex')
  const incognitoAutocomplete = 'sexstudenki.com — Sex Stunedki'
  const topicPhrases = ['more about this topic', 'find best price', 'summarize']
  const matchedTopicPhrase =
    topicPhrases.find((phrase) => phrase.includes(normalizedQuery) || normalizedQuery.includes(phrase)) ?? null
  const isTopicStyleInput = Boolean(normalizedQuery && matchedTopicPhrase)

  const topicSuggest =
    matchedTopicPhrase === 'summarize'
      ? { title: 'Summarize reviews', host: 'youtube.com', actionLabel: 'go to chat' }
      : matchedTopicPhrase === 'find best price'
        ? { title: 'Find best price', host: 'market.yandex.com', actionLabel: 'go to chat' }
        : { title: 'More about this topic', host: 'wikipedia.org', actionLabel: 'go to chat' }

  const typedSite =
    SITE_SUGGESTIONS.find(
      (site) => site.host.toLowerCase().startsWith(normalizedQuery) || site.title.toLowerCase().startsWith(normalizedQuery)
    ) ??
    SITE_SUGGESTIONS.find(
      (site) => site.host.toLowerCase().includes(normalizedQuery) || site.title.toLowerCase().includes(normalizedQuery)
    ) ??
    SITE_SUGGESTIONS[0]
  const typedTitle = typedSite.title
  const typedHost = typedSite.host
  const typedFavicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(typedHost)}&sz=128`
  const moreOptionsSites = Array.from(
    new Map(
      SITE_SUGGESTIONS.map((site) => [site.host.replace(/^www\./i, '').toLowerCase(), site] as const)
    ).values()
  )

  useEffect(() => {
    if (isIncognitoTrigger && !wasIncognitoTriggerRef.current) {
      setIncognitoAnimKey((prev) => prev + 1)
    }
    wasIncognitoTriggerRef.current = isIncognitoTrigger
  }, [isIncognitoTrigger])

  useEffect(() => {
    if (isMoreOptionsOpen && !wasMoreOptionsOpenRef.current) {
      setMoreOptionsAnimKey((prev) => prev + 1)
    }
    wasMoreOptionsOpenRef.current = isMoreOptionsOpen
  }, [isMoreOptionsOpen])

  useEffect(() => {
    if (!currentUrl || frameState !== 'loading') return
    const timeout = window.setTimeout(() => {
      setIsLoading(false)
      setFrameState('blocked')
    }, 6000)
    return () => window.clearTimeout(timeout)
  }, [currentUrl, frameState])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const pageView = pageViewRef.current

    if (isOmniboxExpanded || isMoreOptionsOpen) {
      const activeElement = document.activeElement as HTMLElement | null
      // Blur only background-focused elements. Do not blur omnibox/content in portal.
      if (activeElement && activeElement !== document.body && pageView?.contains(activeElement)) {
        activeElement.blur()
      }

      root.style.overflow = 'hidden'
      root.style.overscrollBehavior = 'none'
      body.style.overflow = 'hidden'
      body.style.overscrollBehavior = 'none'
      body.style.touchAction = 'none'

      if (pageView) {
        pageView.setAttribute('inert', '')
        pageView.setAttribute('aria-hidden', 'true')
      }
    } else {
      root.style.overflow = ''
      root.style.overscrollBehavior = ''
      body.style.overflow = ''
      body.style.overscrollBehavior = ''
      body.style.touchAction = ''

      if (pageView) {
        pageView.removeAttribute('inert')
        pageView.removeAttribute('aria-hidden')
      }
    }

    return () => {
      root.style.overflow = ''
      root.style.overscrollBehavior = ''
      body.style.overflow = ''
      body.style.overscrollBehavior = ''
      body.style.touchAction = ''

      if (pageView) {
        pageView.removeAttribute('inert')
        pageView.removeAttribute('aria-hidden')
      }
    }
  }, [isOmniboxExpanded, isMoreOptionsOpen])

  useEffect(() => {
    const root = document.documentElement

    const updateViewportVars = () => {
      const vv = window.visualViewport
      const visibleHeight = vv?.height ?? window.innerHeight
      const offsetTop = vv?.offsetTop ?? 0
      const keyboardHeight = Math.max(0, window.innerHeight - visibleHeight - offsetTop)

      root.style.setProperty('--app-visible-height', `${visibleHeight}px`)
      root.style.setProperty('--keyboard-height', `${keyboardHeight}px`)
    }

    updateViewportVars()
    window.visualViewport?.addEventListener('resize', updateViewportVars)
    window.visualViewport?.addEventListener('scroll', updateViewportVars)
    window.addEventListener('resize', updateViewportVars)
    window.addEventListener('orientationchange', updateViewportVars)

    return () => {
      window.visualViewport?.removeEventListener('resize', updateViewportVars)
      window.visualViewport?.removeEventListener('scroll', updateViewportVars)
      window.removeEventListener('resize', updateViewportVars)
      window.removeEventListener('orientationchange', updateViewportVars)
    }
  }, [])

  const openInIframe = (url: string) => {
    setCurrentUrl(url)
    setIsLoading(true)
    setFrameState('loading')
    setIsOmniboxExpanded(false)
    setIsMoreOptionsOpen(false)
    setOmniboxQuery('')
  }

  const handleOmniboxSubmit = (rawValue: string) => {
    const value = rawValue.trim()
    if (!value) return

    const isLikelyWebsite = WEBSITE_RE.test(value)
    if (isLikelyWebsite) {
      const parsed = parseAddressInput(value)
      if (parsed.ok) {
        openInIframe(parsed.url)
        return
      }
    }

    const searchUrl = `https://yandex.com.tr/search/?text=${encodeURIComponent(
      value
    )}&lr=11508&search_source=yacom.tr_desktop_common`
    openInIframe(searchUrl)
  }

  useEffect(() => {
    if (!isOmniboxExpanded) {
      setOmniboxQuery('')
    }
  }, [isOmniboxExpanded])

  const handleFrameLoad = () => {
    setIsLoading(false)
    const frame = iframeRef.current
    if (!frame) {
      setFrameState('ready')
      return
    }

    try {
      const loadedHref = frame.contentWindow?.location.href ?? ''
      if (loadedHref === 'about:blank' || loadedHref === 'about:srcdoc') {
        setFrameState('blocked')
        return
      }
      setFrameState('ready')
    } catch {
      setFrameState('ready')
    }
  }

  const handleOpenInNewTab = () => {
    if (!currentUrl) return
    window.open(currentUrl, '_blank', 'noopener,noreferrer')
  }

  const inputStyle: CSSProperties = {
    bottom: 'calc(16px + env(safe-area-inset-bottom))',
  }
  const suggestsStyle: CSSProperties = {
    top: 'auto',
    bottom: `calc(env(safe-area-inset-bottom) + ${OMNIBOX_BOTTOM_GAP + OMNIBOX_HEIGHT + 10}px)`,
  }

  return (
    <>
      <main className="browser-app">
        <section
          ref={pageViewRef}
          className={`page-view ${isOmniboxExpanded || isMoreOptionsOpen ? 'page-view-blurred' : ''}`}
          aria-label="Browser view"
        >
          {!currentUrl && <div className="blank-state" />}
          {proxiedUrl && (
            <iframe
              key={proxiedUrl}
              ref={iframeRef}
              className="site-frame"
              src={proxiedUrl}
              title="Embedded website"
              onLoad={handleFrameLoad}
              tabIndex={isOmniboxExpanded ? -1 : 0}
              aria-hidden={isOmniboxExpanded}
              style={{
                pointerEvents: isOmniboxExpanded || isMoreOptionsOpen ? 'none' : 'auto',
                display: 'block',
              }}
            />
          )}
          {isLoading && <div className="frame-status">Loading website...</div>}
          {frameState === 'blocked' && currentUrl && (
            <div className="frame-fallback" role="status">
              <p>Site refused to load in iframe.</p>
              <button type="button" onClick={handleOpenInNewTab}>
                Open in new tab
              </button>
            </div>
          )}
        </section>

        {!isOmniboxExpanded && (
          <div className="bottom-shell">
            <div
              style={{ maxWidth: '100%', overflow: 'visible' }}
              onClick={() => {
                setOmniboxQuery('')
                setIsOmniboxExpanded(true)
                setOmniboxFocusKey((prev) => prev + 1)
              }}
            >
              <OmniboxBottom
                currentHost={getCurrentHost()}
                isMoreOptionsOpen={isMoreOptionsOpen}
                onMoreOptionsClick={() => setIsMoreOptionsOpen((prev) => !prev)}
              />
            </div>
          </div>
        )}
      </main>

      {isMoreOptionsOpen &&
        createPortal(
          <div className="more-options-overlay" role="dialog" aria-modal="true" onClick={() => setIsMoreOptionsOpen(false)}>
            <div className="more-options-content" onClick={(event) => event.stopPropagation()}>
              <p className="more-options-headline">
                <span className="more-options-headline-base">
                  i noticed what you visits this
                  <br />
                  sites quite often
                </span>
                <span key={moreOptionsAnimKey} aria-hidden="true" className="more-options-headline-sweep">
                  i noticed what you visits this
                  <br />
                  sites quite often
                </span>
              </p>

              <div className="more-options-sites-row">
                {moreOptionsSites.slice(0, 5).map((site) => (
                  <div key={site.host} className="more-options-site-icon">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(site.host)}&sz=128`}
                      alt=""
                      className="more-options-site-favicon"
                    />
                  </div>
                ))}
              </div>

              <div className="more-options-cards-row">
                {moreOptionsSites.slice(0, 3).map((site) => (
                  <div key={`${site.host}-card`} className="more-options-card">
                    <div className="more-options-card-thumb" />
                    <div className="more-options-card-source">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(site.host)}&sz=128`}
                        alt=""
                        className="more-options-card-favicon"
                      />
                      <span>{site.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="more-options-actions">
                <button type="button" className="more-options-pill">
                  <FavoriteIcon />
                  Add to favorites
                </button>
                <button type="button" className="more-options-pill">
                  <TranslateIcon />
                  Translate
                </button>
                <button type="button" className="more-options-pill">
                  <ShareLinkIcon />
                  Share link
                </button>
                <button type="button" className="more-options-pill">
                  <CopyLinkIcon />
                  Copy link
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {(isOmniboxExpanded || !!currentUrl) &&
        createPortal(
          <div className="omnibox-ui-root">
            <div className="omnibox-pinned-header" onClick={(event) => event.stopPropagation()}>
              <div className="omnibox-open-header">
                {isIncognitoTrigger ? <IncognitoHeader /> : <Header currentHost={getCurrentHost()} />}
              </div>
              <button
                type="button"
                className="omnibox-open-close-hit"
                aria-label="Close omnibox"
                onClick={() => setIsOmniboxExpanded(false)}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="48" height="48" rx="24" fill="rgba(250,250,250,0.7)" />
                  <path d="M33 15L15 33" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M15 15L33 33" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {isOmniboxExpanded && (
              <div className="omnibox-open-overlay" onClick={() => setIsOmniboxExpanded(false)} role="dialog" aria-modal="true">
              <div className="omnibox-open-top" onClick={(event) => event.stopPropagation()}>
            {!isIncognitoTrigger && <div className="omnibox-open-shortcuts">
              <svg width="393" height="112" viewBox="0 0 393 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="shortcutStroke" x1="0" y1="0" x2="393" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="0.5" stopColor="white" stopOpacity="0.2" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                </defs>
                <rect x="16" y="26" width="52" height="52" rx="26" fill="rgba(250,250,250,0.9)" />
                <rect x="16.5" y="26.5" width="51" height="51" rx="25.5" stroke="url(#shortcutStroke)" strokeOpacity="0.3" />
                <rect x="32" y="42" width="20" height="20" rx="6" fill="#0f172a" fillOpacity="0.08" />
                <rect x="93.5" y="26" width="52" height="52" rx="26" fill="rgba(250,250,250,0.9)" />
                <rect x="94" y="26.5" width="51" height="51" rx="25.5" stroke="url(#shortcutStroke)" strokeOpacity="0.3" />
                <rect x="109.5" y="42" width="20" height="20" rx="6" fill="#0f172a" fillOpacity="0.08" />
                <rect x="171" y="26" width="52" height="52" rx="26" fill="rgba(250,250,250,0.9)" />
                <rect x="171.5" y="26.5" width="51" height="51" rx="25.5" stroke="url(#shortcutStroke)" strokeOpacity="0.3" />
                <rect x="187" y="42" width="20" height="20" rx="6" fill="#0f172a" fillOpacity="0.08" />
                <rect x="248.5" y="26" width="52" height="52" rx="26" fill="rgba(250,250,250,0.9)" />
                <rect x="249" y="26.5" width="51" height="51" rx="25.5" stroke="url(#shortcutStroke)" strokeOpacity="0.3" />
                <rect x="264.5" y="42" width="20" height="20" rx="6" fill="#0f172a" fillOpacity="0.08" />
                <rect x="326" y="26" width="52" height="52" rx="26" fill="rgba(250,250,250,0.9)" />
                <rect x="326.5" y="26.5" width="51" height="51" rx="25.5" stroke="url(#shortcutStroke)" strokeOpacity="0.3" />
                <rect x="342" y="42" width="20" height="20" rx="6" fill="#0f172a" fillOpacity="0.08" />
              </svg>
            </div>}

            {isIncognitoTrigger ? (
              <div className="omnibox-incognito-hint">
                <p className="omnibox-incognito-hint-text">
                  <span className="omnibox-incognito-hint-base">
                    shhh... maybe you want
                    <br />
                    to continue in incognito mode?
                  </span>
                  <span
                    key={incognitoAnimKey}
                    aria-hidden="true"
                    className="omnibox-incognito-hint-sweep"
                  >
                    shhh... maybe you want
                    <br />
                    to continue in incognito mode?
                  </span>
                </p>
              </div>
            ) : (
            <div className="omnibox-open-suggests" style={suggestsStyle}>
              {!isTypingInOmnibox ? (
                <>
                  <button type="button" className="omnibox-suggest omnibox-suggest-wide" aria-label="More about this topic">
                    <span className="omnibox-suggest-icon" aria-hidden="true">
                      <SuggestIcon />
                    </span>
                    <span className="omnibox-suggest-label">More about this topic</span>
                  </button>

                  <div className="omnibox-suggest-row">
                    <button type="button" className="omnibox-suggest" aria-label="Find best price">
                      <span className="omnibox-suggest-icon" aria-hidden="true">
                        <SuggestIcon />
                      </span>
                      <span className="omnibox-suggest-label">Find best price</span>
                    </button>

                    <button type="button" className="omnibox-suggest" aria-label="Summarize">
                      <span className="omnibox-suggest-icon" aria-hidden="true">
                        <SuggestIcon />
                      </span>
                      <span className="omnibox-suggest-label">Summarize</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="omnibox-typed-suggests">
                  {isTopicStyleInput ? (
                    <SuggestSite
                      title={topicSuggest.title}
                      host={topicSuggest.host}
                      actionLabel={topicSuggest.actionLabel}
                      useTopicIcon
                    />
                  ) : (
                    <>
                      <div className="omnibox-history-item">
                        <span className="omnibox-history-icon" aria-hidden="true">
                          <HistoryClockIcon />
                        </span>
                        <span className="omnibox-history-text">Youmoney</span>
                      </div>
                      <div className="omnibox-history-item">
                        <span className="omnibox-history-icon" aria-hidden="true">
                          <HistoryClockIcon />
                        </span>
                        <span className="omnibox-history-text">Yandex</span>
                      </div>
                      <SuggestSite title={typedTitle} host={typedHost} actionLabel="go to site" faviconSrc={typedFavicon} />
                    </>
                  )}
                </div>
              )}
            </div>
            )}
          </div>

              <div className="omnibox-open-input" style={inputStyle} onClick={(event) => event.stopPropagation()}>
                <Omnibox
                  onSubmit={handleOmniboxSubmit}
                  onQueryChange={setOmniboxQuery}
                  autoCompleteSuggestion={isIncognitoTrigger ? incognitoAutocomplete : null}
                  focusKey={omniboxFocusKey}
                />
              </div>
            </div>
            )}
          </div>,
          document.body
        )}
    </>
  )
}

export default App
