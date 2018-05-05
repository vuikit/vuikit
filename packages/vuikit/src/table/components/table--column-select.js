import { assign } from '@vuikit/utils/lang'
import { mergeData } from '@vuikit/utils/vue'

import Column from './table--column'
import RenderCell from '../render/cell'
import ElCheckbox from '../elements/checkbox'
import { ElTableTh } from '../elements'

export default {
  name: 'VkTableColumnSelect',
  functional: true,
  props: assign({}, ElTableTh.props, {
    cellClass: {
      type: String
    },
    headless: {
      type: Boolean,
      default: false
    },
    shrinked: {
      type: Boolean,
      default: true
    }
  }),
  render: Column.render,
  headRender (h, { data, props, parent }) {
    const content = props.headless || h('span', {
      class: 'uk-form uk-text-center'
    }, [
      h(ElCheckbox, {
        props: {
          checked: parent.allRowsSelected
        },
        on: {
          click: e => parent.toggleRowsSelection()
        }
      })
    ])

    return h(ElTableTh, mergeData(data, {
      props: { shrinked: true },
      class: 'vk-table-column-select'
    }), [ content ])
  },
  cellRender (h, ctx) {
    const { parent } = ctx

    return RenderCell(h, ctx, ({ row, selected }) => h('span', {
      class: 'uk-form uk-text-center'
    }, [
      h(ElCheckbox, {
        props: { checked: selected },
        on: {
          click: e => parent.toggleRowSelection(row)
        }
      })
    ]))
  }
}
