<template>
  <div class="uk-padding">
    <vk-table middle-aligned divided
      :data="rows"
    >
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
      <vk-table-column
        head="Website"
        headClass="uk-text-right"
        cellClass="uk-text-right"
      >
        <div slot="head">
          My custom Head
        </div>
        <a slot-scope="row"
          :href="`http://${row.website}`"
        >
          {{ row.website }}
        </a>
      </vk-table-column>
    </vk-table>
  </div>
</template>

<script>
import data from './data.json'
import {
  Table as VkTable,
  TableColumn as VkTableColumn
} from '../'

export default {
  components: {
    VkTable,
    VkTableColumn
  },
  data: () => ({
    rows: [...data].splice(0, 5)
  })
}
</script>
