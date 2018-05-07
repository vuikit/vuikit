import ColumnDate from './column-date'
import ColumnSort from './column-sort'
import { assign } from '@vuikit/core/utils/lang'

export default assign({}, ColumnDate, {
  name: 'VkTableColumnDateSort',
  props: assign({}, ColumnSort.props, ColumnDate.props),
  headRender: ColumnSort.headRender
})
