import pick from 'lodash-es/pick'
import each from '@vuikit/core/utils/each'
import keys from '@vuikit/core/utils/keys'
import isArray from '@vuikit/core/utils/is-array'

export default function (compProps, pageProps) {
  // we only want to pick declared props
  let pickedProps = pick(compProps, keys(pageProps))
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
