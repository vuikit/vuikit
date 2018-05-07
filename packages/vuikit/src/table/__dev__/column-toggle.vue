<template>
  <div class="uk-padding">

    <h1>Column Toggle</h1>

    <vk-table
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-toggle
        title="Toggle"
        cell="status"
      ></vk-table-column-toggle>
      <vk-table-column-toggle-sort
        title="Toggle"
        cell="status"
      ></vk-table-column-toggle-sort>
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
      status: 'asc'
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
