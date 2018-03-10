import { getCssVar } from './style'
import { isString, toFloat } from './lang'

export function toMedia (value) {
  if (isString(value)) {
    if (value[0] === '@') {
      const name = `media-${value.substr(1)}`
      value = toFloat(getCssVar(name))
    } else if (isNaN(value)) {
      return value
    }
  }

  return value && !isNaN(value) ? `(min-width: ${value}px)` : false
}
