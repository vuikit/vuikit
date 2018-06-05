<template>
  <div class="uk-padding">

    <h1>Table</h1>

    <vk-table
      selectable
      :data="data"
      :sortedBy.sync="sortedBy"
      :selected-rows.sync="selection"
    >
      <vk-table-column-select/>
      <vk-table-column head="Name" cell="name"/>
      <vk-table-column head="Name Sortable" cell="name" sortable/>
    </vk-table>

    <vk-table
      selectable="single"
      :data="data"
      :selected-rows.sync="selectionSingle"
    >
      <vk-table-column head="Name" cell="name"/>
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
    },
    selection: [],
    selectionSingle: []
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
