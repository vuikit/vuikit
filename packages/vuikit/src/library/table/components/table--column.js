import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import RenderCell from '../render/cell'
import { ElementTableTh, ElementTableTd } from '../elements'

export default {
  name: 'VkTableColumn',
  functional: true,
  props: assign({}, ElementTableTh.props, ElementTableTd.props, {
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
    return h(ElementTableTh, mergeData({}, data, {
      props,
      class: 'vk-table-column'
    }), props.title)
  },
  cellRender (h, ctx) {
    return RenderCell(h, ctx, ({ cell }) => cell)
  }
}
