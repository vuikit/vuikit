import ColumnToggle from './column-toggle'
import ColumnSort from './column-sort'
import { assign } from '@vuikit/utils/lang'

export default assign({}, ColumnToggle, {
  name: 'VkTableColumnTextSort',
  props: assign({}, ColumnSort.props, ColumnToggle.props),
  headRender: ColumnSort.headRender
})
