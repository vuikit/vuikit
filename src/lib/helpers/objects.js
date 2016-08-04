import { mapKeys, pickBy } from 'lodash'

export function pickCleanByPrefix (props, prefix) {
  return removePrefix(pickByPrefix(props, prefix), prefix)
}

export function pickByPrefix (props, prefix) {
  return pickBy(props, (value, prop) => prop.match(`^${prefix}`))
}

export function addPrefix (props, prefix) {
  return mapKeys(props, (value, key) => key.replace(
    /^(\w{1})/,
    (match, $1) => prefix + $1.toUpperCase()
  ))
}

export function removePrefix (props, prefix) {
  return mapKeys(props, (value, key) => key.replace(
    new RegExp(`^${prefix}(-?)(\\w{1})`),
    (match, $1, $2) => $2.toLowerCase()
  ))
}

export function cleanPrefixed (props, prefix) {
  return pickBy(props, (value, prop) => !prop.match(`^${prefix}`))
}
