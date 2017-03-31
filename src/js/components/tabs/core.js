import { warn } from 'src/js/util/index'

export default {
  components: {
    TabContent: {
      functional: true,
      render (h, { parent }) {
        return parent.$tabsNodes.filter(vn => parent.activeTab === parent.getTabId(vn))
      }
    }
  },
  props: {
    activeTab: {
      type: [String, Number],
      required: true
    },
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  computed: {
    tabs: {
      get () {
        return this.$tabsNodes.map(vn => ({
          id: this.getTabId(vn),
          label: vn.componentOptions.propsData.label,
          disabled: vn.componentOptions.propsData.disabled !== undefined
        }))
      },
      cache: false
    }
  },
  created () {
    // save tabs nodes
    this.$tabsNodes = this.$slots.default.filter(vn =>
      vn.componentOptions && vn.componentOptions.tag === 'vk-tab'
    )
    if (warn && !this.$tabsNodes) {
      warn(`[VkTabs]: there are no tabs defined`)
    }
    // set tabs key for keep-alive
    this.$tabsNodes.forEach(vn => { vn.key = this.getTabId(vn) })
  },
  methods: {
    getTabId (vn) {
      return vn.componentOptions.propsData.alias || this.$tabsNodes.indexOf(vn) + 1
    }
  }
}
