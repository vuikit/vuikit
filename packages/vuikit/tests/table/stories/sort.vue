<template>
  <div class="uk-padding">

    <h1>Table With Sort</h1>

    <vk-table
      cells-middle
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-sort title="Company" cell="company" />
      <vk-table-column-sort title="Slots" cell="ranking" />
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'
import orderBy from 'lodash/orderBy'

export default {
  data: () => ({
    sortedBy: {
      company: 'asc'
    }
  }),
  computed: {
    data () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  }
}
</script>
