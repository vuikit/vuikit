import { get } from 'vuikit/src/util/misc'
import { warn } from 'vuikit/src/util/debug'
import { TAB_ID } from '../constants'

/* This component supports both local as synced
  activeTab state, reason for a data and a prop. */

const isNotProd = process.env.NODE_ENV !== 'production'

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
        return filterTabs(this)
          .filter(node => this.isActive(node.data[TAB_ID]))[0]
      },
      cache: false
    }
  },
  methods: {
    getTabs () {
      return filterTabs(this)
        .filter((node, index) => {
          if (!node.componentOptions) {
            isNotProd && warn(`vk-tabs -> failed to process '${node.tag}', seems is not a stateful component`, this)
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
      return JSON.stringify(this.state.activeTab) === JSON.stringify(id)
    }
  }
}

function filterTabs (vm) {
  return vm.$slots.default.filter(n => n.tag)
}
