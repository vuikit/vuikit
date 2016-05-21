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
        :default="row.default"
        :editable="row.editable"
        :options="row.options"
        :value.sync="row.value">
      </tr>
    </tbody>
  </table>
</template>

<script>
import PropsRow from './TablePropsRow'
import { sortBy } from 'lodash'

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
      return sortBy(this.rows, 'order')
    }
  }
}
</script>
