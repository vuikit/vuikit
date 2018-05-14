<template>
  <div class="uk-padding">

    <h1>Column Text</h1>

    <vk-table
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-text
        head="Text"
        cell="name"
      ></vk-table-column-text>
      <vk-table-column-text-sort
        head="Text"
        cell="name"
      ></vk-table-column-text-sort>
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
      name: 'asc'
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
