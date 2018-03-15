import Column from './table-column'
import ElementTh from './elements/table-th'
import ElementCheckbox from './elements/checkbox'
import { mergeData } from 'vuikit/src/util/vue'

import RenderCell from './render/cell'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkTableColumnSelect',
  functional: true,
  props: assign({}, ElementTh.props, {
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

    return h(ElementTh, mergeData(data, {
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
