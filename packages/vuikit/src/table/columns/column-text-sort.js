import ColumnText from './column-text'
import ColumnSort from './column-sort'
import { assign } from '@vuikit/core/utils/lang'

export default assign({}, ColumnText, {
  name: 'VkTableColumnTextSort',
  props: assign({}, ColumnSort.props, ColumnText.props),
  headRender: ColumnSort.headRender
})
