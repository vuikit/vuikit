import each from './each'

/**
 * Object.keys alternative
 */
export default function (obj) {
  var keys = []
  each(obj, (val, key) => {
    keys.push(key)
  })

  return keys
}
