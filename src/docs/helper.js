import Vue from 'vue'
import { each, merge, pick } from 'lodash'

export const getProps = (component, demo) => {
  component = Vue.options.components[`Vk${component}`]
  if (!component) {
    return Vue.util.warn(`Vk${component} not found, did you registered it?`)
  }
  // attempt to preserve the order
  let i = 0
  each(demo, (prop) => {
    prop.order = i++
  })
  const props = merge({},
    pick(component.options.props, Object.keys(demo)),
    demo
  )
  each(props, (prop, name) => {
    // add the name as property, it's required later on
    prop.name = name
    // add demo value property
    prop.value = prop.value !== undefined
      ? prop.value
      : prop.default
  })
  return props
}
