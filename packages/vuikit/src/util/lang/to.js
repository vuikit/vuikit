import { isArray, isUndefined, isNode, isNodeCollection, isJQuery, isWindow, isDocument } from './'

export function toArray (val) {
  if (val === null || isUndefined(val)) {
    return []
  }

  return isArray(val) ? val : [val]
}

export function toCamelCase (str) {
  function toUpper (_, c) {
    return c ? c.toUpperCase() : ''
  }

  return str.replace(/-(\w)/g, toUpper)
}

export function toCapital (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toFloat (val) {
  return parseFloat(val) || 0
}

export function toInteger (val) {
  return parseInt(val, 10)
}

export function toNumber (val) {
  const number = Number(val)
  return !isNaN(number) ? number : false
}

export function toString (val) {
  if (val === undefined || val === null) {
    return ''
  }

  return (val.toString || Object.prototype.toString).call(val)
}

export function toKebabCase (str) {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const hyphenateRe = /([a-z\d])([A-Z])/g
export function toHyphenCase (str) {
  return str
    .replace(hyphenateRe, '$1-$2')
    .toLowerCase()
}

export function toNode (element) {
  return isNode(element) || isWindow(element) || isDocument(element)
    ? element
    : isNodeCollection(element) || isJQuery(element)
      ? element[0]
      : isArray(element)
        ? toNode(element[0])
        : null
}

const arrayProto = Array.prototype
export function toNodes (element) {
  return isNode(element)
    ? [element]
    : isNodeCollection(element)
      ? arrayProto.slice.call(element)
      : isArray(element)
        ? element.map(toNode).filter(Boolean)
        : isJQuery(element)
          ? element.toArray()
          : []
}

// alias
export { toHyphenCase as hyphenate }
export { toCapital as ucfirst }
export { toString as toStr }
