<script>
import Table from './ui/table'
import Row from './ui/table-row'
import Cell from './ui/table-cell'
import MixinSelect from './mixin-select'
import { merge, stringify } from '@vuikit/core/util'

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
    rowClass: {
      type: Function
    },
    // required by column-sort
    sortedBy: {
      type: Object
    },
    // required by column-select
    selection: {
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
  render (h) {

    const rowRender = row =>
      h(Row, {
        props: { row },
        key: stringify(row)
      }, [
        this.columns.map((col, i) => h(Cell, {
          key: i,
          props: { col, row }
        }))
      ])

    return h(Table, { props: this.$props }, [
      h('template', { slot: 'head' }, this.columns),
      h('template', { slot: 'body' }, this.data.map(rowRender))
    ])

  },
  computed: {
    columns: {
      get () {
        // default slots excluding spaces and comments
        const slots = (this.$slots.default || [])
          .filter(node => node.tag && !node.isComment && !node.asyncFactory)

        return slots
      },
      cache: false
    }
  },
  methods: {
    stringify (obj) {
      return stringify(obj)
    }
  },
  created () {
    // forces the table to rerender
    // when children are available
    // which is required by some cols
    this.children = this.$children
  }
}
</script>
