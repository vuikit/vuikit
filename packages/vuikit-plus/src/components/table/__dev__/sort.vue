<template>
  <div class="uk-padding">
    <vk-table
      divided
      middle-aligned
      :data="rows"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-sort head="ID" cell="id" />
      <vk-table-column-sort head="Company" cell="company" />
      <vk-table-column-sort>
        <template slot="head">Custom Head</template>
        <template slot-scope="row">
          Custom Row
        </template>
      </vk-table-column-sort>
    </vk-table>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import mockData from './data.json'
import keys from '@vuikit/core/utils/keys'
import {
  Table as VkTable,
  TableColumn as VkTableColumn,
  TableColumnSort as VkTableColumnSort
} from '../'

const data = [...mockData].splice(0, 5)

export default {
  components: {
    VkTable,
    VkTableColumn,
    VkTableColumnSort
  },
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
