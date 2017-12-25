/*
 * Determines if the value is a function
 */
export default function (val) {
  return toString(val) === '[object Function]'
}

function toString (val) {
  return Object.prototype.toString.call(val)
}
