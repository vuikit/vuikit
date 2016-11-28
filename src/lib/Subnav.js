export default {
  name: 'VkSubnav',
  props: {
    index: {
      type: Number,
      default: 0
    },
    line: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    const items = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-subnav-item'
    ).map((node, index) => {
      const data = node.componentOptions.propsData
      data.index = index
      return node
    })
    return (
      <ul class={{
        'uk-subnav': true,
        'uk-subnav-line': this.line,
        'uk-subnav-pill': this.pill
      }}>
        { items }
      </ul>
    )
  }
}
