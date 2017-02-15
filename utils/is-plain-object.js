/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects
 */
const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'

module.exports = function (obj) {
  return toString.call(obj) === OBJECT_STRING
}
