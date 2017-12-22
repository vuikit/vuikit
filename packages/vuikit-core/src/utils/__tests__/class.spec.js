/* eslint-env jest */
import { hasClass, addClass, removeClass, toggleClass } from '../class'

function createButton () {
  const button = document.createElement('button')
  document.body.appendChild(button)
  return button
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Class', () => {
  test('hasClass', () => {
    const button = createButton()

    expect(hasClass(button, 'myClass')).toBe(false)
  })

  test('add/remove class', () => {
    const button = createButton()

    addClass(button, 'myClass myOtherClass')
    expect(hasClass(button, 'myClass')).toBe(true)
    expect(hasClass(button, 'myOtherClass')).toBe(true)

    removeClass(button, 'myClass')
    expect(hasClass(button, 'myClass')).toBe(false)
    expect(hasClass(button, 'myOtherClass')).toBe(true)
  })

  test('toggle class', () => {
    const button = createButton()

    toggleClass(button, 'myClass')
    expect(hasClass(button, 'myClass')).toBe(true)

    toggleClass(button, 'myClass')
    expect(hasClass(button, 'myClass')).toBe(false)
  })
})
