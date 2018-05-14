<template>
  <div class="uk-padding">

    <h1>Column Date</h1>

    <vk-table
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-date
        head="Date"
        cell="date"
      ></vk-table-column-date>
      <vk-table-column-date-sort
        head="Date"
        cell="date"
      ></vk-table-column-date-sort>
      <vk-table-column size="expanded"/>
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'
import orderBy from 'lodash/orderBy'

export default {
  data: () => ({
    sortedBy: {
      date: 'asc'
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
