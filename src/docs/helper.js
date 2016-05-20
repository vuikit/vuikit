import Vue from 'vue'
import { each, merge } from 'lodash'

export const getProps = (component, demo) => {
  if (!Vue.options.components[`Vk${component}`]) {
    return Vue.util.warn(`Vk${component} not found, did you registered it?`)
  }
  const props = merge({},
    Vue.options.components[`Vk${component}`].options.props,
    demo
  )
  each(props, (prop, name) => {
    // add the name as property, it's required later on
    prop.name = name
    // add demo value property
    prop.value = prop.value
      ? prop.value
      : prop.default
  })
  return props
}
