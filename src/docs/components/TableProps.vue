<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th class="tm-docs-hidden-medium">Type</th>
        <th class="tm-docs-hidden-medium">Default</th>
        <th class="tm-docs-hidden-small">Description</th>
        <th class="tm-docs-hidden-small" v-if="demo">Demo</th>
    </tr>
    </thead>
    <tbody>
      <tr v-else class="uk-table-middle" v-for="row in sortedRows">
        <td v-text="row.name"></td>
        <td class="tm-docs-hidden-medium" v-text="row.type | type"></td>
        <td class="tm-docs-hidden-medium uk-text-truncate">
          <code v-text="row.default | default"></code>
        </td>
        <td class="tm-docs-hidden-small" v-html="row.description"></td>
        <td class="tm-docs-hidden-small" v-if="demo" is="PropsColDemo"
          :editable="row.editable"
          :options="row.options"
          :type="row.type | type"
          :value.sync="row.value">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import PropsColDemo from './TablePropsColDemo'
import { sortBy } from 'lodash'

export default {
  components: { PropsColDemo },
  props: {
    rows: {
      type: Object,
      default: () => ({})
    },
    demo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sortedRows: function () {
      return sortBy(this.rows, 'order')
    }
  },
  filters: {
    type (type) {
      if (Vue.util.isArray(type)) {
        type = type.map(t => t.name).join(', ')
      } else if (type) {
        type = type.name
      }
      return type || '*'
    },
    default (value) {
      value = value && value.name === '_default'
        ? value()
        : value
      return value === undefined
        ? 'N/A'
        : JSON.stringify(value)
    }
  }
}
</script>
