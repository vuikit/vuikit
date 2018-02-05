import { warn } from 'vuikit/src/util/debug'

/* Tab component support both local as synced activeTab
  state, reason why there is a data and a prop activeTab. */

export default {
  components: {
    TabContent: {
      functional: true,
      render: (h, { parent }) => parent.tabs
        .filter(tab => parent.state.activeTab === tab.id)
        .map(tab => tab.node)
    }
  },
  props: {
    activeTab: {},
    transition: {
      type: String,
      default: ''
    }
  },
  watch: {
    activeTab (val) {
      this.state.activeTab = val
    }
  },
  data: vm => ({
    state: {
      activeTab: vm.activeTab
    }
  }),
  computed: {
    tabs: {
      get () {
        // default slots excluding spaces and comments
        const slots = (this.$slots.default || [])
          .filter(n => n.tag)

        if (!slots.length) {
          warn(`At least one 'vk-tab-item' must be set`, this)
        }

        return slots.map((node, index) => {
          const props = node.componentOptions.propsData

          const id = props.name || index
          const label = props.label
          const disabled = props.disabled !== undefined

          return { node, id, label, disabled }
        })
      },
      cache: false
    }
  },
  methods: {
    triggerTab (val) {
      this.state.activeTab = val
      this.$emit('update:activeTab', val)
    }
  },
  created () {
    // set initial activeTab
    if (!this.state.activeTab && this.tabs.length) {
      this.triggerTab(this.tabs[0].id)
    }
  }
}
