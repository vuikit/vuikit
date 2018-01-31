const hasOwnProperty = Object.prototype.hasOwnProperty

export default function (obj, key) {
  return hasOwnProperty.call(obj, key)
}
