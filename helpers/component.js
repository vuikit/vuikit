import { each, merge } from './util'

export function filterByTag (nodes, tag) {
  const result = []
  each(nodes, node => {
    if (node.componentOptions && node.componentOptions.tag === tag) {
      result.push(node)
    }
  })
  return result
}

export function getProps (vm) {
  return vm.componentOptions.propsData
}

export function getFinalProps (component) {
  let props = {}
  while (component) {
    props = merge(props, component.props)
    component = component.extends
  }
  return props
}
