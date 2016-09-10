export default {
  name: 'VkTabsVertical',
  props: {
    index: {
      type: Number,
      default: 0
    },
    flip: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1-3'
    },
    contentWidth: {
      type: String,
      default: '2-3'
    }
  },
  render (h) {
    const Tabs = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-tabs-item'
    ).map((node, index) => {
      node.componentOptions.propsData.index = index
      return node
    })
    return (
      <div class={{
        'uk-grid': true,
        'uk-flex uk-flex-row-reverse': this.flip
      }}>
        <div class={ `uk-width-medium-${this.width}` }>
          <ul class={{
            'uk-tab': true,
            'uk-tab-left': !this.flip,
            'uk-tab-right': this.flip
          }}>
            { Tabs }
          </ul>
        </div>
        <div class={ `uk-width-medium-${this.contentWidth}` }>
          <vk-switcher index={ this.index }>{
            Tabs.map(tab => (
              <vk-switcher-item>
                { tab.componentOptions.children }
              </vk-switcher-item>
            ))
          }</vk-switcher>
        </div>
      </div>
    )
  }
}
