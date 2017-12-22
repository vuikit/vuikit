import TreeNode from './node'
import each from '@vuikit/core/utils/each'
import includes from '@vuikit/core/utils/includes'

export default {
  name: 'Tree',
  props: {
    data: {
      type: Object,
      required: true
    },
    activeNodes: {
      type: Array,
      default: () => []
    },
    expandedNodes: {
      type: Array,
      default: () => []
    },
    striped: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    narrowed: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    return h('ul', {
      class: ['vk-tree', {
        'vk-tree--striped': this.striped,
        'vk-tree--divided': this.divided,
        'vk-tree--narrowed': this.narrowed,
        'vk-tree--hoverable': this.hoverable
      }]
    }, this.renderNodes(this.data))
  },
  methods: {
    isExpanded (node) {
      return includes(this.expandedNodes, node.id)
    },
    isActive (node) {
      return includes(this.activeNodes, node.id)
    },
    toggleExpand (node) {
      const expandedNodes = [...this.expandedNodes]
      const index = expandedNodes.indexOf(node.id)
      const isExpanded = index !== -1

      isExpanded
        ? expandedNodes.splice(index, 1)
        : expandedNodes.push(node.id)

      this.$emit('update:expandedNodes', expandedNodes)
    },
    renderNodes (nodes, level = 0) {
      let result = []
      const h = this.$createElement

      each(nodes, (node, id) => {
        node.id = id
        node.level = level

        // render node and its children
        result.push(
          h(TreeNode, {
            key: node.id,
            props: { node },
            scopedSlots: this.$scopedSlots
          })
        )

        if (node.children && this.isExpanded(node)) {
          result = [
            ...result,
            ...this.renderNodes(node.children, level + 1)
          ]
        }
      })

      return result
    }
  }
}
