import Column from './column'
import { assign } from '@vuikit/core/utils/lang'
import { ElTableTd, ElTableCellToggle } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumnToggle',
  props: assign({}, Column.props, {
    size: {
      default: 'shrinked'
    },
    align: {
      default: 'center'
    }
  }),
  render: Column.render,
  headRender: Column.headRender,
  cellRender (h, { props, data }) {
    const { $row } = data
    const { cell } = props
    const value = Boolean($row[cell])

    return h(ElTableTd, { props }, [
      h(ElTableCellToggle, {
        props: { state: value }
      })
    ])
  }
}
