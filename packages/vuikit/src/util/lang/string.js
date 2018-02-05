const strPrototype = String.prototype
const startsWithFn = strPrototype.startsWith || function (search) {
  return this.lastIndexOf(search, 0) === 0
}
const endsWithFn = strPrototype.endsWith || function (search) {
  return this.substr(-1 * search.length) === search
}

/*
 * Whether a string starts with the characters of a specified string
 */
export function startsWith (str, search) {
  return startsWithFn.call(str, search)
}

/**
 * Whether a string ends with the characters of a specified string
 */
export function endsWith (str, search) {
  return endsWithFn.call(str, search)
}
