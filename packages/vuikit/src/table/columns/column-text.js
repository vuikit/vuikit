import Column from './column'
import { ElTableTd } from '../elements'
import { assign } from '@vuikit/core/utils/lang'

export default {
  functional: true,
  name: 'VkTableColumnText',
  props: assign({}, Column.props, {
    size: {
      default: 'shrinked'
    }
  }),
  render: Column.render,
  headRender: Column.headRender,
  cellRender (h, { props, data }) {
    const { $row } = data
    const { cell, cellClass } = props
    const cellValue = $row[cell]

    return h(ElTableTd, {
      props,
      class: [cellClass, 'uk-text-nowrap']
    }, cellValue)
  }
}
