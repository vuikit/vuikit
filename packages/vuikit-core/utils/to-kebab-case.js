/**
 * Formats the string adding an hyphen between each word
 */
function toKebabCase (str) {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export default toKebabCase;
