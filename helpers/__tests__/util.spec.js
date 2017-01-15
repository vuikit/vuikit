import {
  isObject,
  isPlainObject,
  isString,
  isInteger,
  isFunction,
  isArray,
  inArray,
  range
} from '../util'

describe('Helpers', () => {
  it('isObject', () => {
    expect(isObject([])).toBeTruthy()
    expect(isPlainObject({})).toBeTruthy()
  })
  it('isString', () => {
    expect(isString('string')).toBeTruthy()
    expect(isString({})).toBeFalsy()
  })
  it('isinteger', () => {
    expect(isInteger(1)).toBeTruthy()
    expect(isInteger('1')).toBeFalsy()
  })
  it('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction('')).toBeFalsy()
  })
  it('isArray', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray('[]')).toBeFalsy()
  })
  it('inArray', () => {
    expect(inArray([1], 1)).toBeTruthy()
    expect(inArray([1], 2)).toBeFalsy()
  })
  it('range', () => {
    expect(range(4).toString()).toEqual([0, 1, 2, 3].toString())
  })
})
