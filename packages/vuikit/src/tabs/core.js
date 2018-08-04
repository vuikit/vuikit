import { get } from 'vuikit/src/_core/utils/object'

/* This component supports both local as synced
  activeTab state, reason for a data and a prop. */

export default {
  props: {
    activeTab: {}
  },
  data: () => ({
    activeKey: 0
  }),
  computed: {
    tabs: {
      get () {
        let nodes = get(this, '$slots.default', [])

        // filter out text nodes
        nodes = nodes.filter(n => n.tag || (n.isComment && n.asyncFactory))

        // enforce key, default to index if not provided
        nodes.forEach((n, i) => { n.key = get(n, 'data.key', i) })

        return nodes.map(this.mapTabNode)
      },
      cache: false
    },
    activeTabNode: {
      get () {
        return get(this, '$slots.default', []).filter(tab => tab.key === this.activeKey)[0]
      },
      cache: false
    }
  },
  watch: {
    activeTab (key) {
      this.activeKey = key
    }
  },
  methods: {
    setAsActive (key) {
      this.activeKey = key
      this.$emit('update:activeTab', key)
    },
    isActive (key) {
      return this.activeKey === key
    },
    mapTabNode (node, index) {
      return ({
        key: node.key,
        props: node.componentOptions.propsData,
        tabRender: node.componentOptions.Ctor.options.tabRender
      })
    }
  }
}
