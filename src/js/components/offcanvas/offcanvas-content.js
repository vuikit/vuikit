export default {
  name: 'VkOffcanvasContent',
  functional: true,
  render (h, { children }) {
    const nodesCount = children.length

    if (nodesCount === 1) {
      const rawChild = children[0]

      if (rawChild.tag) {
        addNodeClass(rawChild)
        return rawChild
      }
    }

    return h('div', {
      staticClass: 'uk-offcanvas-content'
    }, children)
  }
}

function addNodeClass (node) {
  const classes = node.data.staticClass
    ? node.data.staticClass.split(' ')
    : []
  classes.push('uk-offcanvas-content')
  node.data.staticClass = classes.join(' ')
}
