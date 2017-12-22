/* eslint-env jest */
import simulant from 'simulant'
import { on, one, offAll } from '../event'

function createButton () {
  const button = document.createElement('button')
  document.body.appendChild(button)
  return button
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('DOM events', () => {
  test('one', () => {
    const mockCallback = jest.fn()
    const button = createButton()

    one(button, 'click mousenter', mockCallback)

    simulant.fire(button, 'click')
    simulant.fire(button, 'mousenter')

    expect(mockCallback.mock.calls.length).toBe(1)

    // with a condition
    one(button, 'click mousenter', mockCallback, e => e.type === 'mousenter')

    // this event should be ignored
    simulant.fire(button, 'click')
    expect(mockCallback.mock.calls.length).toBe(1)

    // this one should trigger
    simulant.fire(button, 'mousenter')
    expect(mockCallback.mock.calls.length).toBe(2)

    // only once
    simulant.fire(button, 'mousenter')
    expect(mockCallback.mock.calls.length).toBe(2)

  })

  test('on/off', () => {
    const mockCallback = jest.fn()
    const button = createButton()

    // set listener for mutliple events
    const off = on(button, 'click mousenter', mockCallback)

    simulant.fire(button, 'click')
    expect(mockCallback.mock.calls.length).toBe(1)

    simulant.fire(button, 'mousenter')
    expect(mockCallback.mock.calls.length).toBe(2)

    // unset listeners
    off()

    simulant.fire(button, 'click')
    simulant.fire(button, 'mousenter')

    // it shouldn't listen anymore, so no new calls
    expect(mockCallback.mock.calls.length).toBe(2)
  })

  test('offAll', () => {
    const mockCallback = jest.fn()
    const button = createButton()

    on(button, 'click', mockCallback)
    on(button, 'hover', mockCallback)

    // unset all listeners
    offAll()

    simulant.fire(button, 'click')
    simulant.fire(button, 'hover')

    expect(mockCallback.mock.calls.length).toBe(0)
  })

  test('namespace', () => {
    const mockCallback = jest.fn()
    const button = createButton()

    on(button, 'click', mockCallback, 'namespace')
    on(button, 'hover', mockCallback, 'namespace')

    // unset all listeners
    offAll('namespace')

    simulant.fire(button, 'click')
    simulant.fire(button, 'hover')

    expect(mockCallback.mock.calls.length).toBe(0)
  })
})
