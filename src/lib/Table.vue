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
                'uk-icon-justify': true,
                'uk-icon-caret-up': this.sortOrder[field.name] === 'asc',
                'uk-icon-caret-down': this.sortOrder[field.name] === 'desc'
              }">
            </i>
          </a>
          <template v-else>
            {{ field.header }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody v-el:body>
      <tr v-for="row in rows">
        <td v-for="field in fieldsDef"
          :class="field.cellClass"
          v-field>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { map, isString, merge } from 'lodash'

export default {
  name: 'VkTable',
  directives: {
    field: {
      update () {
        const host = this.vm
        const template = host.fieldTemplate
        if (template) {
          const field = this.el
          const context = host._context
          const scope = Object.create(context)
          scope.$row = this._frag.parentFrag.scope.row
          scope.$field = this._frag.scope.field
          field.innerHTML = template
          context.$compile(field, host, scope, this._frag)
        }
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
    template: {
      type: String,
      default: ''
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
    },
    // can be provided as slot or prop
    fieldTemplate () {
      if (this._slotContents && this._slotContents.default) {
        const node = document.createElement('div')
        node.appendChild(this._slotContents.default.cloneNode(true))
        return node.innerHTML
      } else {
        return this.template
      }
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
