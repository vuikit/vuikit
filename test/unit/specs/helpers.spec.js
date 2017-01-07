import matrix from 'helpers/date-matrix'
import {
  isObject,
  isPlainObject,
  isString,
  isInteger,
  isFunction,
  isArray,
  inArray,
  range
} from 'helpers/util'

describe('Helpers', () => {
  describe('util', () => {
    it('isObject', () => {
      expect(isObject([])).to.be.true
      expect(isPlainObject({})).to.be.true
    })
    it('isString', () => {
      expect(isString('string')).to.be.true
      expect(isString({})).to.be.false
    })
    it('isinteger', () => {
      expect(isInteger(1)).to.be.true
      expect(isInteger('1')).to.be.false
    })
    it('isFunction', () => {
      expect(isFunction(() => {})).to.be.true
      expect(isFunction('')).to.be.false
    })
    it('isArray', () => {
      expect(isArray([])).to.be.true
      expect(isArray('[]')).to.be.false
    })
    it('inArray', () => {
      expect(inArray([1], 1)).to.be.true
      expect(inArray([1], 2)).to.be.false
    })
    it('range', () => {
      expect(range(4).toString()).to.equal([0, 1, 2, 3].toString())
    })
  })

  describe('data-matrix', () => {
    const dec14 = [
      [-30, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, -1, -2, -3],
      [-4, -5, -6, -7, -8, -9, -10]
    ]
    const dec14w1 = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, -1, -2, -3, -4],
      [-5, -6, -7, -8, -9, -10, -11]
    ]
    const jan15 = [
      [-28, -29, -30, -31, 1, 2, 3],
      [4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31],
      [-1, -2, -3, -4, -5, -6, -7]
    ]

    it('With Object as argument', () => {
      expect(
        matrix({ year: 2014, month: 11, weekStartsOn: 1 }, true).toString()
      ).to.equal(dec14w1.toString())
    })

    it('With Date as argument', () => {
      expect(
        matrix(new Date(2014, 11), true).toString()
      ).to.equal(dec14.toString())
    })

    it('With no arguments (now)', () => {
      const clock = sinon.useFakeTimers(new Date(2015, 0).valueOf())
      expect(
        matrix(undefined, true).toString()
      ).to.equal(jan15.toString())
      clock.restore()
    })
  })
})
