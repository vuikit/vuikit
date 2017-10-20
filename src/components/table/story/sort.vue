<template>
  <div class="uk-padding">
    <vk-table middle divider
      :data="rows"
      :sortedBy="sortedBy"
      @sort="order => { sortedBy = order }">
      <vk-table-column-sort header="ID" cell="id" />
      <vk-table-column-sort header="Company" cell="company" />
      <vk-table-column-sort>
        <template slot="header">Custom Header</template>
        <template slot-scope="row">
          Custom Row
        </template>
      </vk-table-column-sort>
    </vk-table>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import mockData from './mock-data.json'
import { keys } from '@vuikit/util'

const data = [...mockData].splice(0, 5)

export default {
  data: () => ({
    sortedBy: {
      id: 'asc'
    }
  }),
  computed: {
    rows () {
      const by = keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  }
}
</script>
