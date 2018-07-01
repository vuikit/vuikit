import { assign } from 'vuikit/src/_core/utils/object'

import Column from './column'
import { ElTableTh, ElTableCellCheckbox } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumnSelect',
  props: assign({}, ElTableTh.props, {
    cellClass: String,
    headless: {
      type: Boolean,
      default: false
    },
    width: {
      default: 'shrinked'
    }
  }),
  render: Column.render,
  headRender (h, { props, parent }) {
    return [
      props.headless || h('span', {
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
    ]
  },
  cellRender (h, { props, parent }) {
    const { row } = props

    return h('span', {
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
  }
}
