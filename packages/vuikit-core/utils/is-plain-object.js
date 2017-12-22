/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects
 */
function isPlainObject (obj) {
  return toString(obj) === '[object Object]'
}

function toString (val) {
  return Object.prototype.toString.call(val)
}

export default isPlainObject;
