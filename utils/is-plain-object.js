/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects
 */
var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'

module.exports = function (obj) {
  return toString.call(obj) === OBJECT_STRING
}
