import { each, isArray } from 'src/js/util/index'
import pick from 'lodash-es/pick'

export default function (compProps, pageProps) {
  // we only want to pick declared props
  let pickedProps = pick(compProps, Object.keys(pageProps))
  // merge the new properties
  const props = {...pickedProps, ...pageProps}
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
