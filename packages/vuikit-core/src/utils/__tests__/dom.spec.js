/* eslint-env jest */
import css from '../css'

function createButton () {
  const button = document.createElement('button')
  document.body.appendChild(button)
  return button
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('DOM', () => {
  test('css', () => {
    const button = createButton()

    expect(css(button, 'height')).toBe('')

    css(button, 'height', '100px')
    expect(css(button, 'height')).toBe('100px')
  })
})
