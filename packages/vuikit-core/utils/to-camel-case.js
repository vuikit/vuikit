/**
 * Formats the string to camelize format
 */
function toCamelCase (str) {
  return str.replace(/-(\w)/g, toUpper)
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

export default toCamelCase;
