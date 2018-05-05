import { assign } from '@vuikit/utils/lang'
import { mergeData } from '@vuikit/utils/vue'

import RenderCell from '../render/cell'
import { ElTableTh, ElTableTd } from '../elements'

export default {
  name: 'VkTableColumn',
  functional: true,
  props: assign({}, ElTableTh.props, ElTableTd.props, {
    cell: String,
    title: String,
    cellClass: String
  }),
  render (h, { data, props, slots }) {
    // IMPORTANT: don't remove or change, is the
    // initial dummy render to pick up data
    data.slots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { data, props }) {
    return h(ElTableTh, mergeData({}, data, {
      props,
      class: 'vk-table-column'
    }), props.title)
  },
  cellRender (h, ctx) {
    return RenderCell(h, ctx, ({ cell }) => cell)
  }
}
