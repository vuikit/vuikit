export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject (obj) {
  return toString(obj) === '[object Object]'
}

export function isInteger (val) {
  return Number.isInteger(val)
}

export function isNumber (val) {
  return typeof val === 'number'
}

export function isNumeric (val) {
  return isNumber(val) || (isString(val) && !isNaN(val - parseFloat(val)))
}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function isBoolean (val) {
  return typeof val === 'boolean'
}

export function isDocument (obj) {
  return isObject(obj) && obj.nodeType === 9
}

export function isString (obj) {
  return typeof obj === 'string'
}

export function isFunction (obj) {
  return toString(obj) === '[object Function]'
}

export function isUndefined (val) {
  return val === undefined
}

export function isDefined (val) {
  return val !== undefined
}

export function isWindow (obj) {
  return isObject(obj) && obj === obj.window
}

export function isJQuery (obj) {
  return isObject(obj) && !!obj.jquery
}

export function isNode (element) {
  return element instanceof Node || (isObject(element) && element.nodeType === 1)
}

export function isNodeCollection (element) {
  return element instanceof NodeList || element instanceof HTMLCollection
}

export function isEmpty (val) {
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

function toString (val) {
  return Object.prototype.toString.call(val)
}

// aliases
export { isDefined as isDef }
export { isUndefined as isUndef }
