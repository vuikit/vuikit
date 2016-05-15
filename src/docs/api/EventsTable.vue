<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Demo</th>
      </tr>
    </thead>
    <tbody>
      <tr is="EventsTableRow" v-for="row in sortedRows"
        :name="row.name"
        :description="row.description">
      </tr>
    </tbody>
  </table>
</template>

<script>
import EventsTableRow from './EventsTableRow'
import { sortBy } from 'lodash'

export default {
  components: {
    EventsTableRow
  },
  props: {
    rows: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sortedRows: function () {
      return sortBy(this.rows, 'name')
    }
  }
}
</script>
