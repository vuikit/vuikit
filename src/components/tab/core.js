import { warn } from '@vuikit/core/helpers/debug'

const TabContent = {
  functional: true,
  render: (h, { parent }) => parent.tabs
    .filter(tab => parent.activeTab === tab.name)
    .map(tab => tab.node)
}

export default {
  components: {
    TabContent
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabs: {
      get () {
        // default slots excluding spaces and comments
        const slots = (this.$slots.default || [])
          .filter(n => n.tag)

        if (!slots.length) {
          warn('At least one vk-tab-item must be set', this)
        }

        return slots.map(node => ({
          node,
          name: node.componentOptions.propsData.name,
          label: node.componentOptions.propsData.label,
          disabled: node.componentOptions.propsData.disabled !== undefined
        }))
      },
      cache: false
    }
  },
  methods: {
    triggerTab (name) {
      this.$emit('update:activeTab', name)
    }
  },
  created () {
    // set initial activeTab
    if (!this.activeTab && this.tabs.length) {
      this.triggerTab(this.tabs[0].node.componentOptions.propsData.name)
    }
  }
}
