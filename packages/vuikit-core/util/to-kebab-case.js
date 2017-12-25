/**
 * Formats the string adding an hyphen between each word
 */
export default function (str) {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase()
}
