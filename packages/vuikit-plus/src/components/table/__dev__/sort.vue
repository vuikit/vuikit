<template>
  <div class="uk-padding">
    <vk-table
      divided
      middle-aligned
      :data="data"
      :sortedBy.sync="sortedBy"
    >
      <vk-table-column-sort head="ID" cell="id" />
      <vk-table-column-sort head="Company" cell="company" />
      <vk-table-column-sort
        cell="version"
      >
        <template slot="head">Slots</template>
        <template slot="cell" slot-scope="val">
          {{ val }}
        </template>
      </vk-table-column-sort>
    </vk-table>
  </div>
</template>

<script>
import data from './data.json'
import orderBy from 'lodash/orderBy'
import { keys } from '@vuikit/core/util'

import {
  Table as VkTable,
  TableColumn as VkTableColumn,
  TableColumnSort as VkTableColumnSort
} from '../'

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
    data () {
      const by = keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  }
}
</script>
