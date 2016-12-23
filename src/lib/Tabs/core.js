import { warn } from 'src/helpers/util'

export default {
  components: {
    TabContent: {
      functional: true,
      render (h, { parent: vm }) {
        const activeTabSlot = vm.tabs.find(tab => vm.getTabAlias(tab) === vm.activeTab)
        const content = activeTabSlot && activeTabSlot.componentOptions.children
        if (activeTabSlot && content) {
          return (<div>{ content }</div>)
        } else if (warn) {
          warn(`VkTabs: No tab found with with identifier '${vm.activeTab}'`)
        }
      }
    }
  },
  props: {
    activeTab: [String, Number],
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
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  data: () => ({
    tabs: []
  }),
  computed: {
    tabs: {
      get () {
        return this.$slots.default.filter(c =>
          c.componentOptions && c.componentOptions.tag === 'vk-tab'
        )
      },
      cache: false
    }
  },
  beforeMount () {
    // set initally selected tab
    const active = this.tabs.find(tab => this.getTabAlias(tab) === this.activeTab)
    if (active) {
      active.componentOptions.propsData.selected = true
    }

    this._updateTabs()
  },
  beforeUpdate () {
    this._updateTabs()
  },
  methods: {
    getTabAlias (tab) {
      return tab.componentOptions.propsData.alias || this.tabs.indexOf(tab) + 1
    },
    _updateTabs () {
      this.tabs.forEach((tab, index) => {
        const alias = this.getTabAlias(tab)
        const active = this.activeTab === alias
        const props = tab.componentOptions.propsData
        props.active = active
        props.alias = alias
      })
    }
  }
}
