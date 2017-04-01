export function promise (executor) {
  return new window.Promise(executor)
}

export function classify (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
//
// export function hyphenate(str) {
//     return str
//         .replace(/([a-z\d])([A-Z])/g, '$1-$2')
//         .toLowerCase()
// }
//
const camelizeRE = /-(\w)/g
export function camelize (str) {
  return str.replace(camelizeRE, toUpper)
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

export function capitalize (value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// export function isNumber(value) {
//     return typeof value === 'number';
// }
//
export function isUndefined (value) {
  return value === undefined
}

export function isString (val) {
  return typeof val === 'string'
}

export function isInteger (val) {
  return Number.isInteger(val)
}

export function isArray (val) {
  return Array.isArray(val)
}

/* https://github.com/sindresorhus/is-obj */
export function isObject (x) {
  var type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects
 */
export function isPlainObject (obj) {
  return toString.call(obj) === '[object Object]'
}

/* https://github.com/sindresorhus/is-fn */
export function isFunction (x) {
  return toString.call(x) === '[object Function]'
}

//
// export function isContextSelector(selector) {
//     return isString(selector) && selector.match(/^(!|>|\+|-)/);
// }
//
// export function getContextSelectors(selector) {
//     return isContextSelector(selector) && selector.split(/(?=\s(?:!|>|\+|-))/g).map(value => value.trim());
// }
//
// export function toBoolean(value) {
//     return typeof value === 'boolean'
//         ? value
//         : value === 'true' || value == '1' || value === ''
//             ? true
//             : value === 'false' || value == '0'
//                 ? false
//                 : value;
// }
//
export function toNumber (value) {
  const number = Number(value)
  return !isNaN(number)
    ? number
    : false
}
//
// export function toList(value) {
//     return isArray(value)
//         ? value
//         : isString(value)
//             ? value.split(',').map(value => value.trim())
//             : [value];
// }

export function toInteger (n) {
  return parseInt(n, 10)
}

export function toString (string) {
  return Object.prototype.toString(string)
}

/* https://github.com/sindresorhus/arrify */
export function arrify (val) {
  if (val === null || val === undefined) {
    return []
  }

  return isArray(val) ? val : [val]
}

export function inArray (array, value) {
  return (array || []).indexOf(value) !== -1
}

export function each (obj, iterator) {
  var i, key
  if (isInteger(obj.length)) {
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

export function range (start, stop, step = 1) {
  if (typeof stop === 'undefined') {
    stop = start
    start = 0
  }
  return Array.from(new Array(Math.floor((stop - start) / step)), (x, i) => start + (i * step))
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 */
export function get (object, path, defaultValue) {
  var result = isObject(object) && isString(path)
    ? baseGet(object, path)
    : undefined
  return result === undefined
    ? defaultValue
    : result
}

function baseGet (object, path) {
  return path.split('.').reduce((acc, val) => acc && acc[val], object)
}
