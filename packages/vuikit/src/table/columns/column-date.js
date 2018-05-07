import formatDate from 'date-fns/format'
import { assign } from '@vuikit/core/utils/lang'

import Column from './column'
import { ElTableTd } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumnDate',
  props: assign({}, Column.props, {
    size: {
      default: 'shrinked'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  }),
  render: Column.render,
  headRender: Column.headRender,
  cellRender (h, { props, data }) {
    const { $row } = data
    const { cell, cellClass, format } = props
    const date = $row[cell]

    return h(ElTableTd, {
      props,
      class: [cellClass, 'uk-text-nowrap']
    }, formatDate(date, format))
  }
}
