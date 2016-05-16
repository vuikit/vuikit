<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr is="Row" v-for="row in sortedRows"
        :name="row.name"
        :description="row.description">
      </tr>
    </tbody>
  </table>
</template>

<script>
import Row from './ApiEventsRow'
import { sortBy } from 'lodash'

export default {
  components: {
    Row
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
