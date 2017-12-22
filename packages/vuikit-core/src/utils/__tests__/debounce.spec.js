/* eslint-env jest */
import debounce from '../debounce'

describe('Debounce', () => {
  test('debounce', async () => {
    const time = 10
    const mockCallback = jest.fn()
    const fn = debounce(mockCallback, time)

    fn()
    fn()
    fn()
    fn()

    // should make no calls
    expect(mockCallback.mock.calls.length).toBe(0)

    await wait(time)

    // after the specified time, should make one call only
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  test('immediate', async () => {
    const time = 10
    const mockCallback = jest.fn()
    const fn = debounce(mockCallback, time, true)

    fn()
    fn()
    fn()
    fn()

    // should make the call immediate and ignore the rest
    expect(mockCallback.mock.calls.length).toBe(1)
    await wait(time)
    expect(mockCallback.mock.calls.length).toBe(1)

    // after the specified time, should allow calling again
    fn()
    expect(mockCallback.mock.calls.length).toBe(2)
  })
})

function wait (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
