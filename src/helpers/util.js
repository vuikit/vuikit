/**
 * Utility functions
 */

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject (obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

export function isString (val) {
  return typeof val === 'string'
}

export function isFunction (val) {
  return typeof val === 'function'
}

export const isArray = Array.isArray

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
  warn = (msg, vm) => {
    if (hasConsole) {
      console.error('[Vuikit warn]: ' + msg)
    }
  }
}

export { warn }
