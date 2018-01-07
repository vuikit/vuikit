const strPrototype = String.prototype
const endsWithFn = strPrototype.endsWith || function (search) {
  return this.substr(-1 * search.length) === search
}

/**
 * Determines whether a string ends with the characters of a specified string
 */
export default function (str, search) {
  return endsWithFn.call(str, search)
}
