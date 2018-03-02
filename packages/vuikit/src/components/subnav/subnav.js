import Element from './elements/subnav'
import { warn } from 'vuikit/src/util/debug'
import { assign, get, toStr } from 'vuikit/src/util/lang'
import mergeData from 'vuikit/src/util/vue-data-merge'

/* This component supports both local as synced
  activeItem state, reason for a data and a prop. */

export default {
  name: 'VkSubnav',
  props: assign({}, Element.props, {
    activeItem: {}
  }),
  data: vm => ({
    state: {
      activeItem: vm.activeItem || filterItems(vm).shift().data.key || 0
    }
  }),
  computed: {
    items () {
      return this.$slots.default.filter(n => n.tag)
    }
  },
  watch: {
    activeItem (val) {
      this.state.activeItem = val
    }
  },
  methods: {
    triggerUpdate (val) {
      this.state.activeItem = val
      this.$emit('update:activeItem', val)
    }
  },
  render (h) {
    return h(Element, {
      props: this.$props
    }, filterItems(this).map((node, index) => {

      if (process.env.NODE_ENV !== 'production' && !node.fnOptions) {
        warn('vk-subvnav -> components must be functional', this)
      }

      const key = get(node, 'data.key', index)

      // rerender items so Subnav become it parent
      return node.data.rerender
        ? h(node.fnOptions, mergeData({}, node.data, {
          key,
          rerendering: true,
          props: {
            active: toStr(key) === toStr(this.state.activeItem)
          }
        }), node.children)
        : node
    }))
  }
}

function filterItems (vm) {
  return vm.$slots.default.filter(n => n.tag)
}
