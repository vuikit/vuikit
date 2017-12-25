import { each } from '@vuikit/core/util'

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
