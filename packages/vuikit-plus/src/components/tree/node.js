import UiArrow from './ui/node-arrow'
import UiLabel from './ui/node-label'
import UiIndent from './ui/node-indent'
import UiContent from './ui/node-content'

import get from '@vuikit/core/utils/get'
import dataMerge from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: ['node'],
  render (h, { props, data, parent }) {
    const { node } = props

    const isActive = parent.isActive(node)
    const isExpanded = parent.isExpanded(node)
    const hasChildren = node.childrenCount > 0

    // prerender indents
    const indents = []
    for (let i = 0; i < node.level; i++) {
      indents.push(h(UiIndent))
    }

    const def = dataMerge(data, {
      class: ['vk-tree-node uk-flex uk-flex-middle', {
        'vk-tree-node--active': isActive,
        'vk-tree-node--parent': hasChildren
      }],
      on: {
        click: e => parent.$emit('click-node', node)
      }
    })

    // set render slot
    const defaultNodeRender = node => h(UiLabel, get(node, 'data.name', 'Node'))
    const slot = (data.scopedSlots && data.scopedSlots.default) || defaultNodeRender

    return h('li', def, [
      ...indents,

      // render the expand icon or an additional indent
      hasChildren
        ? h(UiArrow, {
          props: { rotated: isExpanded },
          on: {
            click: e => parent.toggleExpand(node)
          }
        })
        : h(UiIndent),

      // render content
      h(UiContent, [
        slot(node)
      ])
    ])

  }
}
