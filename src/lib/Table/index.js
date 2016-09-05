import render from './render'
import { isString, merge } from '../../helpers/util'

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
      return this.fields.map(field => {
        const obj = {
          name: '',
          header: '',
          headerClass: '',
          cellClass: '',
          sortBy: ''
        }
        isString(field)
          ? merge(obj, { name: field })
          : merge(obj, field)
        if (obj.header !== false && obj.header === '') {
          obj.header = titleCase(obj.name)
        }
        return obj
      })
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

function titleCase (str) {
  return str.replace(/\w+/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}
