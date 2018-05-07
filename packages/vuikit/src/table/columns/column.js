import { get } from '@vuikit/utils/misc'
import { mergeData } from '@vuikit/utils/vue'
import { assign, isUndefined } from '@vuikit/utils/lang'
import { getCellScope, getCellSlots } from './util'

import { ElTableTd, ElTableTh } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumn',
  props: assign({}, ElTableTh.props, ElTableTd.props, {
    cell: String,
    title: String,
    cellClass: String
  }),
  render (h, { data, props, slots }) {
    // IMPORTANT: the render is not used for rendering, but is required by Vue.
    // As a workaround we are rendering an empty element just to pick up data
    data.slots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { data, props }) {
    return h(ElTableTh, mergeData({}, data, {
      props
    }), props.title)
  },
  cellRender (h, ctx) {
    const { props, data } = ctx
    const { $row } = data
    const { cell, cellClass } = props
    const cellValue = get($row, cell)
    const isEmpty = !isUndefined(cell) && isUndefined(cellValue)

    const scope = getCellScope(ctx)
    const slots = getCellSlots(ctx)

    const slot = isEmpty && slots.empty
      ? slots.empty
      : slots.default || (({ cell }) => cell)

    return h(ElTableTd, {
      props,
      class: cellClass
    }, [
      slot(scope)
    ])
  }
}
