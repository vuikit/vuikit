<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Emited</th>
      </tr>
    </thead>
    <tbody>
      <tr is="Row" v-for="(name, row) in rows"
        :name="name"
        :description="row.description"
        :emited.sync="row.emited">
      </tr>
    </tbody>
  </table>
</template>

<script>
import Row from './TableEventsRow'

export default {
  components: { Row },
  props: {
    rows: {
      type: Object,
      required: true
    }
  }
}
</script>
