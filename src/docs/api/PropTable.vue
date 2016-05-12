<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
        <th>Demo</th>
      </tr>
    </thead>
    <tbody>
      <tr is="ApiPropRow" v-for="row in sortedRows"
        :name="row.name"
        :type="row.type
          ? row.type.name
          : '*'"
        :description="row.description"
        :options="row.options"
        :default-value="row.default"
        :demo-value.sync="values[row.name]">
      </tr>
    </tbody>
  </table>
</template>

<script>
import { sortBy } from 'lodash'

export default {
  props: {
    rows: {
      type: Object,
      default: () => ({})
    },
    values: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    sortedRows: function () {
      return sortBy(this.rows, 'name')
    }
  }
}
</script>
