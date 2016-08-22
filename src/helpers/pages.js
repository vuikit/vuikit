import { merge, each, isArray } from '../helpers/util'
import { pick } from 'lodash'

export function mergeProps (compProps, pageProps) {
  // we only want to pick declared props
  let pickedProps = pick(compProps, Object.keys(pageProps))
  // merge the new properties
  const props = merge({}, pickedProps, pageProps)
  each(props, prop => {
    prop.type = stringifyPropType(prop.type)
    prop.default = stringifyPropDefault(prop.default)
  })
  return props
}

function stringifyPropType (type) {
  if (isArray(type)) {
    type = type.map(t => t.name).join(', ')
  } else if (type && type.name) {
    type = type.name
  }
  return type || '*'
}

function stringifyPropDefault (def) {
  return def && typeof def === 'function'
    ? def.call()
    : def
}
