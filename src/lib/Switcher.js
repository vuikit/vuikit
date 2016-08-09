export default {
  name: 'VkSwitcher',
  props: {
    index: {
      type: Number,
      default: 0
    },
    transition: {
      type: String,
      default: ''
    },
    transitionMode: {
      type: String,
      default: 'out-in'
    }
  },
  render (h) {
    const switchers = this.$slots.default.filter(node =>
      node.componentOptions && node.componentOptions.tag === 'vk-switcher-item'
    ).map((node, index) => {
      node.key = `tab-${index}`
      return node
    })
    return (
      <ul class="uk-list">
        <transition name={ this.transition } mode={ this.transitionMode }>
          <keep-alive>
            { [ switchers[this.index] ] }
          </keep-alive>
        </transition>
      </ul>
    )
  }
}
