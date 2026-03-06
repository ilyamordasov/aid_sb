import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import Omnibox from './omnibox'

describe('Omnibox input', () => {
  it('uses one contenteditable textbox and no native text input', () => {
    const html = renderToStaticMarkup(<Omnibox onSubmit={() => {}} />)

    expect(html).toContain('class="omnibox-input-text"')
    expect(html).toContain('tabindex="0"')
    expect(html).toContain('contentEditable="true"')
    expect((html.match(/type="text"/g) ?? []).length).toBe(0)
  })
})
