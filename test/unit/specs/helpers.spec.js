import {
  isObject,
  isPlainObject,
  isString,
  isInteger,
  isFunction,
  isArray,
  inArray
} from 'src/helpers/util'

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
  })
})
