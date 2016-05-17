import Vue from 'vue'
import { each } from 'lodash'

export const getProps = (component) => {
  const props = Vue.options.components[`Vk${component}`].options.props
  // add the name as property, it's required later on
  each(props, (prop, name) => {
    prop.name = name
  })
  return props
}

export const getPropsDefaults = (props) => {
  const defaults = {}
  const keys = Object.keys(props)
  let i = keys.length
  while (i--) {
    defaults[keys[i]] = props[keys[i]].demo
      ? props[keys[i]].demo
      : props[keys[i]].default
  }
  return defaults
}
