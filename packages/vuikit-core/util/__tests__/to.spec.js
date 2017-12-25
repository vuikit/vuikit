/* eslint-env jest */
import toArray from '../to-array'
import toString from '../to-string'
import toInteger from '../to-integer'
import toCapital from '../to-capital'
import toKebabCase from '../to-kebab-case'
import toCamelCase from '../to-camel-case'
import toTitleCase from '../to-title-case'

const fn = function () {}
const obj = {}
const arr = []
const str = '0'
const int = 0

describe('Test to functions', () => {
  test('toArray', () => {
    expect(toArray(fn)).toEqual([fn])
    expect(toArray(obj)).toEqual([obj])
    expect(toArray(str)).toEqual([str])
    expect(toArray(int)).toEqual([int])
    expect(toArray(arr)).toEqual(arr)
  })

  test('toString', () => {
    expect(toString(str)).toBe(str)
    expect(toString(int)).toBe('0')
    expect(toString(undefined)).toBe('')
    expect(toString(null)).toBe('')
  })

  test('toInteger', () => {
    expect(toInteger(str)).toBe(0)
    expect(toInteger(int)).toBe(0)
  })

  test('toCapital', () => {
    expect(toCapital('the sentence')).toBe('The sentence')
  })

  test('toKebabCase', () => {
    expect(toKebabCase('The-Case')).toBe('the-case')
  })

  test('toCamelCase', () => {
    expect(toCamelCase('the-case')).toBe('theCase')
  })

  test('toTitleCase', () => {
    expect(toTitleCase('the case')).toBe('The Case')
  })
})
