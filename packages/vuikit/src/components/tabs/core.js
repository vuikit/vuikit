import { warn } from 'vuikit/src/util/debug'
import { toStr, get } from 'vuikit/src/util/lang'

/* This component supports both local as synced
  activeTab state, reason for a data and a prop. */

import { TAB_ID } from './constants'

export default {
  props: {
    activeTab: {},
    animation: {
      type: String,
      default: ''
    },
    keepAlive: {
      type: Boolean,
      default: false
    }
  },
  data: vm => ({
    state: {
      activeTab: vm.activeTab || filterTabs(vm).shift().data.key || 0
    }
  }),
  watch: {
    activeTab (val) {
      this.state.activeTab = val
    }
  },
  computed: {
    activeTabContent: {
      get () {
        return filterTabs(this).find(node => this.isActive(node.data[TAB_ID]))
      },
      cache: false
    }
  },
  methods: {
    getTabs () {
      return filterTabs(this)
        .filter((node, index) => {
          if (!node.componentOptions) {
            warn(`vk-tabs -> failed to process '${node.tag}', seems is not a stateful component`, this)
            return false
          }

          // the key must be set for the animation to work
          node.key = get(node, 'data.key', index)
          node.data[TAB_ID] = node.key
          return true
        })
    },
    setActiveTab (id) {
      this.state.activeTab = id
      this.$emit('update:activeTab', id)
    },
    isActive (id) {
      return toStr(this.state.activeTab) === toStr(id)
    }
  }
}

function filterTabs (vm) {
  return vm.$slots.default.filter(n => n.tag)
}
