import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import Omnibox from './omnibox'

describe('Omnibox input', () => {
  it('uses native textarea input', () => {
    const html = renderToStaticMarkup(<Omnibox onSubmit={() => {}} />)

    expect(html).toContain('class="omnibox-input-text"')
    expect(html).toContain('<textarea')
    expect(html).toContain('placeholder="ask anything or type url"')
  })
})
