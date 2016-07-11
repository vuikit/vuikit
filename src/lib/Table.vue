<template>
  <table class="uk-table"
    :class="{
      'uk-table-striped': striped,
      'uk-table-condensed': condensed,
      'uk-table-hover': hover
    }">
    <thead>
      <tr>
        <th v-for="field in fieldsDef" v-text="field.title"></th>
      </tr>
    </thead>
    <tbody v-el:body>
      <tr v-for="row in rows">
        <td v-for="field in fieldsDef" v-field></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { map, isString } from 'lodash'

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
    }
  },
  computed: {
    fieldsDef () {
      return map(this.fields, field => isString(field)
        ? { name: field, title: field }
        : field
      )
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
  }
}
</script>
