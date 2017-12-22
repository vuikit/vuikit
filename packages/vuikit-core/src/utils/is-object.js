/*
 * Determines if the value is an object
 */
export default function (val) {
  const type = typeof val
  return val !== null && (type === 'object' || type === 'function')
}
