import { merge, pick, each, isArray } from 'lodash'

export function mergeProps (compProps, props) {
  props = merge({}, pick(compProps, Object.keys(props)), props)
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
