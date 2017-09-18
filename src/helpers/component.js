export function filterByTag (nodes, tag) {
  const result = []
  nodes.forEach(node => {
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
    props = {...props, ...component.props}
    component = component.extends
  }
  return props
}

// filter out text nodes (possible whitespaces)
export function filterOutEmptyNodes (nodes) {
  return nodes.filter(c => c.tag || isAsyncPlaceholder(c))
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}
