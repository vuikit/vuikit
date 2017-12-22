/*
 * Determines if the value is an object
 */
function isObject (val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function')
}

/*
 * Determines if the value is a string
 */
function isString (val) {
  return typeof val === 'string'
}

/*
 * Determines if the value is an array
 */
function isArray (val) {
  return Array.isArray(val)
}

/*
 * Determines if the value is empty
 */
function isEmpty (val) {
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  if (isString(val)) {
    return val === ''
  }

  if (isArray(val)) {
    return val.length === 0
  }

  return !val
}

export default isEmpty;
