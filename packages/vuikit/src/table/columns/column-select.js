import { assign } from '@vuikit/core/utils/lang'
import { mergeData } from '@vuikit/core/utils/vue'

import Column from './column'
import { ElTableTd, ElTableTh, ElTableCellCheckbox } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumnSelect',
  props: assign({}, ElTableTh.props, {
    cellClass: String,
    headless: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'shrinked'
    }
  }),
  render: Column.render,
  headRender (h, { data, props, parent }) {
    const content = props.headless || h('span', {
      class: 'uk-form'
    }, [
      h(ElTableCellCheckbox, {
        props: {
          checked: parent.allRowsSelected
        },
        on: {
          click: e => parent.toggleRowsSelection()
        }
      })
    ])

    return h(ElTableTh, mergeData(data, {
      props,
      class: 'vk-table-column-select'
    }), [ content ])
  },
  cellRender (h, { parent, data, props, row }) {
    return h(ElTableTd, {
      props,
      class: props.cellClass
    }, [
      h('span', {
        class: 'uk-form'
      }, [
        h(ElTableCellCheckbox, {
          props: {
            checked: parent.isRowSelected(row)
          },
          on: {
            click: e => parent.toggleRowSelection(row)
          }
        })
      ])
    ])
  }
}
