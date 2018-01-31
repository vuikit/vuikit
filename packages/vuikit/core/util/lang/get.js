import { isObject, isString } from 'vuikit/core/util/lang'

/**
 * Gets the Object value at specific `path`. If the resolved value is
 * `undefined`, the `defVal` is returned in its place.
 */
export default function (obj, path, defVal) {
  var result = isObject(obj) && isString(path)
    ? get(obj, path)
    : undefined

  return result === undefined
    ? defVal
    : result
}

function get (obj, path) {
  return path.split('.').reduce((acc, val) => acc && acc[val], obj)
}
