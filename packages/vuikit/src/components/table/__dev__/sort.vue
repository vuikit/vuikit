<template>
  <div class="uk-padding">

    <h1>Table With Sort</h1>

    <vk-table
      divided
      middle-aligned
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-sort title="Company" cell="company" />
      <vk-table-column-sort title="Slots" cell="ranking">
        <div slot="cell" slot-scope="val">
          {{ val }}
        </div>
      </vk-table-column-sort>
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
