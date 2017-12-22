import isObject from './is-object'

/**
 * Recursive merge
 */
function mergeRecursive (host) {
  var donors = slice(arguments, 1)

  donors.forEach(function (donor) {
    Object.keys(donor).forEach(recurser(host, donor))
  })

  return host
}

function slice (arr, i) {
  return Array.prototype.slice.call(arr, i)
}

function recurser (host, donor) {
  return function (key) {
    if (isObject(donor[key])) {
      if (isObject(host[key])) {
        mergeRecursive(host[key], donor[key])
      } else {
        var base = Array.isArray(donor[key]) ? [ ] : { }
        host[key] = mergeRecursive(base, donor[key])
      }
    } else {
      host[key] = donor[key]
    }
  }
}

export default mergeRecursive
