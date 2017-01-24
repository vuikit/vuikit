/**
 * Utility functions
 */

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
export function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Check if value is plain string
 */
export function isString (val) {
  return typeof val === 'string'
}

/**
 * Check if value is plain integer
 */
export function isInteger (val) {
  return Number.isInteger(val)
}

/**
 * Check if value is plain function
 */
export function isFunction (val) {
  return typeof val === 'function'
}

/**
 * Check if value is plain array
 */
export const isArray = Array.isArray

/**
 * Check if value is in array
 */
export function inArray (array, value) {
  return (array || []).indexOf(value) !== -1
}

/**
* Convert an Array-like object or value to Array
*/
export function toArray (value) {
  if (isArray(value)) {
    return value
  }
  return isObject(value)
    ? _toArray(value)
    : [value]
}

function _toArray (list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Returns an array range
 */
export function range (start, stop, step = 1) {
  if (typeof stop === 'undefined') {
    stop = start
    start = 0
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), (x, i) => start + i * step)
}

export function each (obj, iterator) {
  var i, key
  if (typeof obj.length === 'number') {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i)
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key)
      }
    }
  }
  return obj
}

export function merge (target) {
  const args = Array.prototype.slice.call(arguments, 1)
  args.forEach((source) => {
    _merge(target, source, true)
  })
  return target
}

function _merge (target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {}
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = []
      }
      _merge(target[key], source[key], deep)
    } else if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
}

/**
 * Warn about errors only in no production
 */

let warn

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  warn = (msg) => {
    if (hasConsole) {
      console.error(msg)
    }
  }
}

export { warn }
