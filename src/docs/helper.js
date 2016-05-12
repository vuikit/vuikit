import Vue from 'vue'
import { each } from 'lodash'

export const getComponentProps = (component) => {
  const props = Vue.options.components[`Vk${component}`].options.props
  // add the name as property, it's required later on
  each(props, (prop, name) => {
    prop.name = name
  })
  return props
}

export const getComponentPropsDefaults = (component) => {
  const defaults = {}
  const props = getComponentProps(component)
  const keys = Object.keys(props)
  let i = keys.length
  while (i--) {
    defaults[keys[i]] = props[keys[i]].default
  }
  return defaults
}
