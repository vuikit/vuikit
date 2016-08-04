<template>
  <table class="uk-table"
    :class="{
      'uk-table-striped': striped,
      'uk-table-condensed': condensed,
      'uk-table-hover': hover
    }">
    <thead>
      <tr>
        <th v-for="field in fieldsDef"
          :class="field.headerClass">
          <a href=""
            v-if="field.sortBy"
            @click.prevent="emitSort(field)">
            {{ field.header }}
            <i :class="{
                'uk-icon-justify uk-position-absolute': true,
                'uk-icon-caret-up': sortOrder[field.name] === 'asc',
                'uk-icon-caret-down': sortOrder[field.name] === 'desc'
              }">
            </i>
          </a>
          <template v-else>
            {{ field.header }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows">
        <td-field v-for="(field, index) in fieldsDef"
          :class="field.cellClass"
          :key="index"
          :row="row"
          :field="field">
        </td-field>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { map, isString, merge } from 'lodash'

export default {
  name: 'VkTable',
  beforeCreate () {
    // set component ref earlier
    // so it can be used in the slot
    const context = this.$options._parentVnode.context
    const ref = this.$options._parentVnode.data.ref
    if (ref) {
      context.$refs[ref] = this
    }
    // keep the template, null slot rendering
    this.$renderingTemplate = this.$options._renderChildren
    this.$options._renderChildren = null
  },
  components: {
    tdField: {
      functional: true,
      render (h, { parent, data }) {
        parent.$renderingRow = data.attrs.row
        parent.$renderingField = data.attrs.field
        return h('td', {
          attrs: { class: data.class }
        }, parent.$renderingTemplate)
      }
    }
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
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
      return map(this.fields, field => {
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
  methods: {
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
</script>
