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
  directives: {
    field: {
      update () {
        const field = this.el
        const host = this.vm
        const context = host._context
        const template = host.fieldTemplate
        const scope = Object.create(context)
        scope.$row = this._frag.parentFrag.scope.row
        scope.$field = this._frag.scope.field
        field.innerHTML = template
        context.$compile(field, host, scope, this._frag)
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
    }
  },
  computed: {
    fieldsDef () {
      return map(this.fields, field => isString(field)
        ? { name: field, title: field }
        : field
      )
    },
    fieldTemplate () {
      const node = document.createElement('div')
      const slot = this._slotContents.default
      node.appendChild(slot.cloneNode(true))
      return node.innerHTML
    }
  }
}
</script>
