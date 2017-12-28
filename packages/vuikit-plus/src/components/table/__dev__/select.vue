<template>
  <div class="uk-padding">

    <h2>Single Selection</h2>
    <vk-table
      divided
      middle-aligned
      single-selectable
      row-selectable
      :data="data"
      :selected-rows.sync="selection1"
    >
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <h2>Multiple Selection</h2>
    <vk-table
      divided
      selectable
      middle-aligned
      row-selectable
      :data="data"
      :selected-rows.sync="selection2"
    >
      <vk-table-column-select />
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <h2>Slot & Row Key Support</h2>
    <vk-table
      divided
      middle-aligned
      single-selectable
      row-selectable
      row-key="id"
      :data="data"
      :selected-rows.sync="selection3"
    >
      <vk-table-column-select>
        <template slot="head">All</template>
        <template slot="cell" slot-scope="row">
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
    data,
    selection1: [],
    selection2: [],
    selection3: []
  })
}
</script>
