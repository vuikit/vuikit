var strPrototype = String.prototype;
var startsWithFn = strPrototype.startsWith || function (search) {
  return this.lastIndexOf(search, 0) === 0
};

/**
 * Determines whether a string starts with the characters of a specified string
 */
function startsWith (str, search) {
  return startsWithFn.call(str, search)
}

export default startsWith;
