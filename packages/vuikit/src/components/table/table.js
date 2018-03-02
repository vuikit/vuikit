import MixinSort from './mixins/sort'
import MixinSelect from './mixins/select'

import Render from './render'
import ElementTable from './elements/table'

import { ROW_ID } from './constants'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkTable',
  mixins: [ MixinSelect, MixinSort ],
  inheritAttrs: false,
  props: assign({}, ElementTable.props, {
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowClass: {
      type: Function
    }
  }),
  computed: {
    // using computed rows allows components
    // extending this table to alter the data
    rows () {
      return this.data.map((_row, index) => {
        const row = assign({}, _row)
        row[ROW_ID] = row[this.rowKey] || index
        return row
      })
    }
  },
  render (h) {
    const columns = this.$slots.default.filter(n => n.tag)

    return Render(h, {
      columns,
      table: this,
      rows: this.rows,
      props: this.$props
    })
  }
}
