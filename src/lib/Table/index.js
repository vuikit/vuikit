import render from './render'
import { isString, merge } from '../../util'

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
    },
    fieldComponent: {
      type: [Object, Boolean],
      default: false
    },
    fieldProps: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    selected: Object.create(null)
  }),
  computed: {
    isAllSelected () {
      const totalSelected = Object.keys(this.selected).length
      return totalSelected && totalSelected === this.rows.length
    },
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
          obj.header = this.titleCase(obj.name)
        }
        return obj
      })
    }
  },
  watch: {
    rows () {
      // reset selected if rows change
      this.selected = Object.create(null)
    }
  },
  methods: {
    isSelected (row) {
      const key = row[this.trackBy]
      return this.selected[key]
    },
    toggleSelected (row) {
      const key = row[this.trackBy]
      this.selected[key]
        ? this.$delete(this.selected, key)
        : this.$set(this.selected, key, true)
    },
    toggleAllSelected () {
      if (this.isAllSelected) {
        this.selected = Object.create(null)
      } else {
        const allSelected = {}
        this.rows.forEach(row => {
          const key = row[this.trackBy]
          allSelected[key] = true
        })
        this.selected = allSelected
      }
    },
    titleCase (str) {
      return str.replace(/\w+/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
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
