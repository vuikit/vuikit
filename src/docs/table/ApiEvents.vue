<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr is="Row" v-for="row in rows"
        :name="row.name"
        :description="row.description">
      </tr>
    </tbody>
  </table>
</template>

<script>
import Row from './ApiEventsRow'

export default {
  components: {
    Row
  },
  props: {
    rows: {
      type: Array,
      default: () => []
    }
  }
}
</script>
