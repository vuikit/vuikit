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
      <tr is="PropsRow" v-for="row in sortedRows"
        :name="row.name"
        :type="row.type"
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
import PropsRow from './TablePropsRow'
import { sortBy, reject } from 'lodash'

export default {
  components: { PropsRow },
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
