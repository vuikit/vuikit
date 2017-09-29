<template>
  <div class="uk-padding">
    <vk-table middle divider
      :data="rows"
      :sortedBy="sortedBy"
      @sort="order => { sortedBy = order }">
      <vk-table-column-sort header="ID" cell="id" />
      <vk-table-column-sort header="Company" cell="company" />
    </vk-table>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import mockData from './mock-data.json'

const data = mockData.splice(0, 5)

export default {
  data: () => ({
    sortedBy: {
      id: 'asc'
    }
  }),
  computed: {
    rows () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  }
}
</script>
