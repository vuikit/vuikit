export default {
  name: 'VkTabsVertical',
  props: {
    index: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: 'left'
    },
    width: {
      type: String,
      default: '1-3'
    },
    bodyWidth: {
      type: String,
      default: '2-3'
    }
  },
  render (h) {
    const tabs = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-tabs-item'
    ).map((node, index) => {
      const data = node.componentOptions.propsData
      data.index = index
      data.active = index === this.index
      return node
    })
    return (
      <div class={{
        'uk-grid': true,
        'uk-flex uk-flex-row-reverse': this.align === 'right'
      }}>
        <div class={ `uk-width-medium-${this.width}` }>
          <ul class={{
            'uk-tab': true,
            'uk-tab-left': this.align === 'left',
            'uk-tab-right': this.align === 'right'
          }}>
            { tabs }
          </ul>
        </div>
        <div class={ `uk-width-medium-${this.bodyWidth}` }>
          { this.$slots.switcher }
        </div>
      </div>
    )
  }
}
