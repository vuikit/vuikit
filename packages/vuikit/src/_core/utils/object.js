const isString = str => typeof str === 'string'
const isObject = obj => obj !== null && typeof obj === 'object'

// Creates an object composed of the picked object properties
export function pick (obj, paths) {
  return Object.keys(paths)
    .map(k => k in obj ? {[k]: obj[k]} : {})
    .reduce((res, o) => assign(res, o), {})
}

// Gets the value at path of object.
// If the resolved value is undefined, the defaultValue is returned in its place.
export function get (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? _get(obj, path)
    : undefined

  return result === undefined
    ? defVal
    : result
}

function _get (obj, path) {
  return path.split('.').reduce((acc, val) => acc && acc[val], obj)
}

// Assigns own enumerable string keyed properties of source objects to the
// destination object. Source objects are applied from left to right.
// Subsequent sources overwrite property assignments of previous sources.
// NOTE This method mutates object
export const assign = Object.assign || function (target, ...args) {
  target = Object(target)
  for (let i = 0; i < args.length; i++) {
    const source = args[i]
    if (source !== null) {
      for (const key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}

// Iterates over elements of collection and invokes iteratee for each element.
// The iteratee is invoked with three arguments: (value, index|key)
export function each (obj, cb) {
  for (const key in obj) {
    if (cb.call(obj[key], obj[key], key) === false) {
      break
    }
  }
}

const {hasOwnProperty} = Object.prototype

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
