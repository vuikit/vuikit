export default {
  name: 'VkTabs',
  props: {
    index: {
      type: Number,
      default: 0
    },
    // align tabs right and in reversed order
    flip: {
      type: Boolean,
      default: false
    },
    // center the tabs
    center: {
      type: Boolean,
      default: false
    },
    // place the tabs at the bottom
    bottom: {
      type: Boolean,
      default: false
    },
    // tabs width using UIkit grid
    width: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const Tabs = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-tabs-item'
    ).map((node, index) => {
      const data = node.componentOptions.propsData
      data.index = index
      data.width = this.width
      return node
    })
    return (
      <div class={{
        'uk-flex uk-flex-column-reverse': this.bottom
      }}>
        <div class={{
          'uk-tab-center': this.center,
          'uk-tab-center-bottom': this.center && this.bottom
        }}>
          <ul class={{
            'uk-tab': true,
            'uk-tab-grid': this.width,
            'uk-tab-flip': this.flip,
            'uk-tab-bottom': this.bottom
          }}>
            { Tabs }
          </ul>
        </div>
        <vk-switcher index={ this.index }>{
          Tabs.map(tab => (
            <vk-switcher-item>
              { tab.componentOptions.children }
            </vk-switcher-item>
          ))
        }</vk-switcher>
      </div>
    )
  }
}
