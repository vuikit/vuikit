export default {
  computed: {
    columns: {
      get () {
        return (this.$slots.default || []).filter(n => n.tag).map(this.mapColumnNode)
      },
      cache: false
    }
  },
  methods: {
    mapColumnNode (node) {
      const data = node.data || {}

      return {
        headRender: node.fnOptions.headRender,
        cellRender: node.fnOptions.cellRender,
        context: {
          data,
          parent: this,
          props: data.props || {},
          listeners: data.on || {},
          // slots are expected to be a function,
          // but as those are the same for each cell
          // we are just returning a pre resolved ones
          slots: () => data.slots || {}
        }
      }
    }
  }
}
