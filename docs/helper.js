import Vue from 'vue'
import Vuikit from '../src'
import {
  each,
  merge,
  pick,
  mapValues,
  upperFirst,
  camelCase
} from 'lodash'

export function getComponent (component) {
  component = upperFirst(camelCase(component))
  const comp = Vuikit[component]
  if (!comp) {
    Vue.util.warn(`Vk${component} not found, did you registered it?`)
  }
  // is extending another component?
  if (comp.extends) {
    comp.props = merge(comp.props || {}, comp.extends.props)
  }
  return comp
}

export function getComponentDefaults (component) {
  component = getComponent(component)
  return mapValues(component.props, prop => typeof prop.default === 'function'
    ? prop.default.call(component) // is a function
    : prop.default
  )
}

export function getProps (component, demo) {
  component = getComponent(component)
  // attempt to preserve the order
  let i = 0
  each(demo, (prop) => {
    prop.order = i++
  })
  const props = merge({}, pick(component.props, Object.keys(demo)), demo)
  each(props, (prop, name) => {
    // add the name as property, it's required later on
    prop.name = name
    // evaluate defaults if functions
    if (prop.default && typeof prop.default === 'function') {
      prop.default = prop.default.call(component)
    }
    // set default as initial value
    prop.value = prop.value === undefined
      ? prop.default
      : prop.value
  })
  return props
}
