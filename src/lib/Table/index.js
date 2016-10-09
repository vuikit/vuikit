import render from './render'
import { isString } from '../../helpers/util'

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
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selectedRows: {
      type: Array,
      default: () => []
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
  computed: {
    fieldsDef () {
      return processFields(this.fields)
    }
  },
  methods: {
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
  if (field.header !== false) {
    field.header = titleCase(field.name)
  }
  return field
})

function titleCase (str) {
  return str.replace(/\w+/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}
