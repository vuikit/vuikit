<template>
  <div class="uk-padding">
    <!-- multiple selection -->
    <vk-table
      divided
      selectable
      middle-aligned
      row-selectable
      :data="rows"
      :selection.sync="selection2"
    >
      <vk-table-column-select />
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <!-- single selection -->
    <vk-table
      divided
      middle-aligned
      single-selectable
      row-selectable
      :data="rows"
      :selection.sync="selection"
    >
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <!-- using slots -->
    <vk-table
      divided
      middle-aligned
      single-selectable
      row-selectable
      :data="rows"
      :selection.sync="selection3"
    >
      <vk-table-column-select>
        <template slot="head">All</template>
        <template slot-scope="row">
          Checkbox
        </template>
      </vk-table-column-select>
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'
import {
  Table as VkTable,
  TableColumn as VkTableColumn,
  TableColumnSelect as VkTableColumnSelect
} from '../'

export default {
  components: {
    VkTable,
    VkTableColumn,
    VkTableColumnSelect
  },
  data: () => ({
    selection: [],
    selection2: [],
    selection3: [],
    rows: [...data].splice(0, 5)
  })
}
</script>
