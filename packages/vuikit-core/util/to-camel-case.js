/**
 * Formats the string to camelize format
 */
export default function (str) {
  return str.replace(/-(\w)/g, toUpper)
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}
