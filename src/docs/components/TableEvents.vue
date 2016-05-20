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
      <tr is="EventsRow" v-for="(name, row) in rows"
        :name="name"
        :description="row.description"
        :emited.sync="row.emited">
      </tr>
    </tbody>
  </table>
</template>

<script>
import EventsRow from './TableEventsRow'

export default {
  components: { EventsRow },
  props: {
    rows: {
      type: Object,
      required: true
    }
  }
}
</script>
