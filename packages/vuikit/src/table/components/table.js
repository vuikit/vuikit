import core from '../core'
import mixinColumns from '../mixins/columns'

// NOTE extends core without the columns prop
const { props, ...extendTable } = core
const { columns, ...extendProps } = props

export default {
  name: 'VkTable',
  extends: extendTable,
  props: extendProps,
  mixins: [mixinColumns]
}
