import { get } from 'vuikit/src/util/misc'
import { assign } from 'vuikit/src/util/lang'

import MixinSort from '../mixins/sort'
import MixinSelect from '../mixins/select'
import TableRender from '../render/table'
import { ElementTable } from '../elements'
import { ROW_ID } from '../constants'

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
    const columns = get(this, '$slots.default', []).filter(n => n.tag)

    return TableRender(h, {
      columns,
      table: this,
      rows: this.rows,
      props: this.$props
    })
  }
}
