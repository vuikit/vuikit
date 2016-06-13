<template>
  <table class="uk-table uk-table-striped uk-table-condensed">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr is="SlotsRow" v-for="(name, row) in rows"
        :name="name"
        :description="row.description">
      </tr>
    </tbody>
  </table>
</template>

<script>
import SlotsRow from './TableSlotsRow'

export default {
  components: { SlotsRow },
  props: {
    rows: {
      type: Object,
      required: true
    }
  }
}
</script>
