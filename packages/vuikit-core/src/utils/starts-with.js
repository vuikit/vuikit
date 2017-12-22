const strPrototype = String.prototype
const startsWithFn = strPrototype.startsWith || function (search) {
  return this.lastIndexOf(search, 0) === 0
}

/**
 * Determines whether a string starts with the characters of a specified string
 */
export default function (str, search) {
  return startsWithFn.call(str, search)
}
