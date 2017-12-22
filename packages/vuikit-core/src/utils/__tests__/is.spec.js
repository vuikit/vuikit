/* eslint-env jest */
import isArray from '../is-array'
import isEmpty from '../is-empty'
import isFunction from '../is-function'
import isInteger from '../is-integer'
import isUndefined from '../is-undefined'

const fn = function () {}
const obj = {}
const arr = []
const str = ''
const int = 0

describe('Test is functions', () => {
  test('isArray', () => {
    expect(isArray(fn)).toBe(false)
    expect(isArray(obj)).toBe(false)
    expect(isArray(str)).toBe(false)
    expect(isArray(int)).toBe(false)

    expect(isArray(arr)).toBe(true)
  })

  test('isEmpty', () => {
    expect(isEmpty(obj)).toBe(true)
    expect(isEmpty(arr)).toBe(true)
    expect(isEmpty(str)).toBe(true)
    expect(isEmpty(int)).toBe(true)

    expect(isEmpty(1)).toBe(false)
    expect(isEmpty({ v: '' })).toBe(false)
    expect(isEmpty([0, 1])).toBe(false)
    expect(isEmpty(' ')).toBe(false)
  })

  test('isFunction', () => {
    expect(isFunction(obj)).toBe(false)
    expect(isFunction(arr)).toBe(false)
    expect(isFunction(str)).toBe(false)
    expect(isFunction(int)).toBe(false)

    expect(isFunction(fn)).toBe(true)
  })

  test('isInteger', () => {
    expect(isInteger(fn)).toBe(false)
    expect(isInteger(obj)).toBe(false)
    expect(isInteger(arr)).toBe(false)
    expect(isInteger(str)).toBe(false)

    expect(isInteger(int)).toBe(true)
  })

  test('isUndefined', () => {
    expect(isUndefined(fn)).toBe(false)
    expect(isUndefined(obj)).toBe(false)
    expect(isUndefined(arr)).toBe(false)
    expect(isUndefined(str)).toBe(false)

    expect(isUndefined()).toBe(true)
    expect(isUndefined(undefined)).toBe(true)
  })
})
