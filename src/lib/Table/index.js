import Checkbox from './Checkbox'
import render from './render'
import { isString, warn } from '../../helpers/util'

export default {
  name: 'VkTable',
  render,
  props: {
    fields: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    rowsClass: {
      type: String,
      default: ''
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    selectable: {
      type: Boolean,
      default: false
    },
    condensed: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    sortOrder: {
      type: Object,
      default: () => ({}) // field: asc|desc
    }
  },
  data: () => ({
    selectedRows: []
  }),
  created () {
    // check for rows id if selectable enabled
    if (warn && this.selectable) {
      this.rows.forEach(row => {
        if (row[this.trackBy] === undefined) {
          warn(`Some of the Table rows have no 'id' set.`)
        }
      })
    }
    // watch and trigger un/selectAll event
    this.$watch('selectedRows', rows => {
      if (this.allSelected) {
        this.$emit('selectAll')
      } else if (this.selectedRows.length === 0) {
        this.$emit('unselectAll')
      }
    })
  },
  computed: {
    allSelected () {
      return this.rows.every(row =>
        this.selectedRows.find(id => id === this.getRowId(row))
      )
    },
    fieldsDef () {
      const fields = processFields(this.fields)
      // add selectable field if
      // required and no provided
      if (this.selectable) {
        fields.unshift(selectFieldDef)
      }
      return fields
    }
  },
  methods: {
    isSelected (row) {
      return this.selectedRows.find(id => id === this.getRowId(row))
    },
    getRowId (row) {
      return `row_${row[this.trackBy]}`
    },
    toggleSelection (row) {
      const rowId = this.getRowId(row)
      if (this.isSelected(row)) {
        const index = this.selectedRows.indexOf(rowId)
        this.selectedRows.splice(index, 1) // remove
        this.$emit('unselect', row)
      } else {
        this.selectedRows.push(rowId)
        this.$emit('select', row)
      }
    },
    emitSort (field) {
      const sortBy = field.sortBy === true
        ? field.name
        : field.sortBy
      const sortOrder = {}
      // prepare the final order object state
      if (this.sortOrder[sortBy]) {
        sortOrder[sortBy] = this.sortOrder[sortBy] === 'asc'
          ? 'desc'
          : 'asc'
      } else {
        sortOrder[sortBy] = 'asc'
      }
      this.$emit('sort', sortOrder)
    }
  }
}

const processFields = fields => fields.map(f => {
  let field = {
    name: '',
    header: '',
    headerClass: '',
    cellClass: '',
    sortBy: ''
  }
  // set field data
  if (isString(f)) {
    field.name = f
  } else {
    // merge both
    field = {...field, ...f}
  }
  // set default Header
  if (field.header === '') {
    field.header = titleCase(field.name)
  }
  return field
})

const selectFieldDef = {
  headerClass: 'vk-table-width-minimum',
  cellClass: 'vk-table-width-minimum',
  cell (h, { parent, props }) {
    const { row } = props
    return h(Checkbox, {
      props: {
        checked: parent.isSelected(row),
        onClick: e => {
          parent.toggleSelection(row)
        }
      }
    })
  },
  header (h, { parent, props }) {
    return h(Checkbox, {
      props: {
        checked: parent.allSelected,
        onClick: e => {
          if (parent.allSelected) {
            parent.selectedRows = []
          } else {
            parent.selectedRows = parent.rows.map(row => parent.getRowId(row))
          }
        }
      }
    })
  }
}

function titleCase (str) {
  return str.replace(/\w+/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}
