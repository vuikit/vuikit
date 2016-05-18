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
      <tr is="Row" v-for="row in sortedRows"
        :name="row.name"
        :type="row.type
          ? row.type.name
          : '*'"
        :description="row.description"
        :defaults-to="row.default"
        :editable="row.editable"
        :options="row.options"
        :demo.sync="row.value">
      </tr>
    </tbody>
  </table>
</template>

<script>
import Row from './ApiPropsRow'
import { sortBy, reject } from 'lodash'

export default {
  components: {
    Row
  },
  props: {
    rows: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    sortedRows: function () {
      return reject(sortBy(this.rows, 'name'), 'ignore')
    }
  }
}
</script>
