<script>
import Row from './row'
import Cell from './row-cell'
import Table from './ui/table'
import MixinSelect from './mixin-select'
import { merge, get } from '@vuikit/core/util'

export default {
  name: 'Table',
  components: { Row, Cell },
  mixins: [ MixinSelect ],
  inheritAttrs: false,
  props: merge({}, Table.props, {
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
    },
    // required by column-sort
    sortedBy: {
      type: Object
    },
    // required by column-select
    selectedRows: {
      type: Array,
      default: () => []
    },
    singleSelectable: {
      type: Boolean,
      default: false
    },
    rowSelectable: {
      type: Boolean,
      default: false
    }
  }),
  data: () => ({
    children: []
  }),
  computed: {
    // maps the data to table rows
    rows () {
      return this.data.map((_row, index) => {
        const row = merge({}, _row)

        row._vk_id = `${row[this.rowKey] || index}`
        return row
      })
    },
    // returns the columns vnodes
    columns: {
      get () {
        // default slots excluding spaces and comments
        const slots = (this.$slots.default || [])
          .filter(node => node.tag && !node.isComment && !node.asyncFactory)

        return slots
      },
      cache: false
    },
    // checks if there is at least one column providing head data
    isHeadDataProvided () {
      return this.columns.some(col => get(col, 'componentOptions.propsData.head'))
    }
  },
  render (h) {
    const renderRow = (row, index) => h(Row, {
      key: row._vk_id,
      props: { row }
    }, this.columns.map((col, i) => h(Cell, {
      key: i,
      props: { col, row }
    })))

    return h(Table, { props: this.$props }, [
      this.isHeadDataProvided && h('template', { slot: 'head' }, this.columns),
      h('template', { slot: 'body' }, this.rows.map(renderRow))
    ])
  },
  created () {
    // required, forces rows to rerender
    // when children are available
    this.children = this.$children
  }
}
</script>
