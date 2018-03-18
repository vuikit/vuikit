import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import Column from './table--column'
import RenderCell from '../render/cell'
import ElementCheckbox from '../elements/checkbox'
import { ElementTableTh } from '../elements'

export default {
  name: 'VkTableColumnSelect',
  functional: true,
  props: assign({}, ElementTableTh.props, {
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
      h(ElementCheckbox, {
        props: {
          checked: parent.allRowsSelected
        },
        on: {
          click: e => parent.toggleRowsSelection()
        }
      })
    ])

    return h(ElementTableTh, mergeData(data, {
      props: { shrinked: true },
      class: 'vk-table-column-select'
    }), [ content ])
  },
  cellRender (h, ctx) {
    const { parent } = ctx

    return RenderCell(h, ctx, ({ row, selected }) => h('span', {
      class: 'uk-form uk-text-center'
    }, [
      h(ElementCheckbox, {
        props: { checked: selected },
        on: {
          click: e => parent.toggleRowSelection(row)
        }
      })
    ]))
  }
}
