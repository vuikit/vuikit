import { warn } from '../util.js'

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
    if (!this.$slots.default) {
      warn('The VkTabs default slot is undefined.')
      return
    }
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
            { tabs }
          </ul>
        </div>
        { this.$slots.switcher }
      </div>
    )
  }
}
