/* eslint-env jest */
import each from '../each'
import range from '../range'
import includes from '../includes'

import get from '../get'
import getFnArgs from '../get-fn-args'

import merge from '../merge'
import mergeRecursive from '../merge-recursive'

const obj1 = { a: 1, deep: { a: 1 } }
const obj2 = { b: 2, deep: { b: 2 } }

describe('Misc', () => {
  test('merge', () => {
    expect(merge({}, obj1, obj2)).toEqual({ a: 1, b: 2, deep: { b: 2 } })
  })

  test('merge recursive', () => {
    expect(mergeRecursive({}, obj1, obj2)).toEqual({ a: 1, deep: { a: 1, b: 2 }, b: 2 })
  })

  test('each', () => {
    const mockCallback = jest.fn()

    each(obj1, mockCallback)

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2)

    // the first argument was
    expect(mockCallback.mock.calls[0][0]).toBe(1)
    expect(mockCallback.mock.calls[1][0]).toEqual({ a: 1 })

    // the second argument was
    expect(mockCallback.mock.calls[0][1]).toBe('a')
    expect(mockCallback.mock.calls[1][1]).toEqual('deep')
  })

  test('get', () => {
    expect(get(obj1, 'deep.a', 'def')).toBe(1)
    expect(get(obj1, 'deep.b', 'def')).toBe('def')
  })

  test('range', () => {
    expect(range(1, 9)).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8 ])
    expect(range(2, 20, 2)).toEqual([ 2, 4, 6, 8, 10, 12, 14, 16, 18 ])
  })

  test('get function args', () => {
    const fn = function (arg1, arg2) {}
    expect(getFnArgs(fn)).toEqual([ 'arg1', 'arg2' ])
  })

  test('includes', () => {
    const array = [0, 1, 2]

    expect(includes(array, 3)).toBe(false)
    expect(includes(array, 1)).toBe(true)
  })
})
