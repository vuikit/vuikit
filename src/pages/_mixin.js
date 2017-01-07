import { mapValues, pickBy, isEqual, isEmpty, kebabCase } from 'lodash'
import { each, isArray, isObject } from 'helpers/util'

export default {
  computed: {
    code () {
      const attrs = toAttrs(this.demoUniqueProps)
      return this.example
        // add demo props
        .replace('{attrs}', '\n' + attrs)
        // add new line for closing tags, if no children
        .replace(/><\/vk-(.*)>$/g, '>\n</vk-$1>')
    },
    // get demo props which value
    // differ from defaults
    demoUniqueProps () {
      const propsDefaultValues = mapValues(this.props, prop => typeof prop.default === 'function'
        ? prop.default.call()
        : prop.default)
      const propsValues = mapValues(this.props, prop => prop.demo && prop.demo.value)
      return pickBy(propsValues, (value, key) => {
        return value !== undefined && !isEqual(value, propsDefaultValues[key])
      })
    }
  }
}

/*
 * Converts an Object to String as node attributes
 */
function toAttrs (props) {
  let attrs = ''
  each(props, (value, prop) => {
    // make sure prop is kebabCase
    prop = kebabCase(prop)
    // literal numbers requires binding (:) to be evaluated as such
    if (Number.isInteger(value) || value === false) {
      prop = `:${prop}`
    }
    // Arrays and Objects
    if (isArray(value) || isObject(value)) {
      // skip if empty
      if (isEmpty(value)) {
        return true
      }
      // convert into literal
      value = JSON.stringify(value)
      // convert double quotes
      value = value.replace(/"/g, '\'')
      // bind is required
      prop = `:${prop}`
    } else if (value === '' || value === null || value === undefined) {
      return true
    }
    // literal trues can be set without value, eg. disabled
    if (value === true) {
      value = ''
    }
    attrs += value || value === false
      ? `${prop}="${value}" `
      : `${prop} `
  })
  return attrs
}
