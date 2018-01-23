<template>
  <div class="uk-padding">

    <vk-table divided :data="data">
      <vk-table-column head="Company" cell="company" expanded />
      <vk-table-column head="Website" cell="website" shrinked />
    </vk-table>

    <h2>Headless</h2>
    <vk-table divided :data="data">
      <vk-table-column cell="company" expanded />
      <vk-table-column cell="website" shrinked />
    </vk-table>

    <h2>Custom Slots</h2>
    <vk-table
      divided
      middle-aligned
      :data="data"
    >
      <vk-table-column
        head="Website"
        cell="website"
      ></vk-table-column>
      <vk-table-column
        cell="website"
      >
        <div
          slot="head"
          class="uk-text-right"
        >
          Cell Slot
        </div>
        <div
          slot="cell"
          slot-scope="val"
          class="uk-text-right"
        >
          <a :href="`http://${ val }`">{{ val }}</a>
        </div>
      </vk-table-column>
      <vk-table-column
        cell="none"
      >
        <div
          slot="head"
        >
          Empty Cell Slot
        </div>
        <div
          slot="emptyCell"
          slot-scope="row"
        >
          empty
        </div>
      </vk-table-column>
    </vk-table>

    <h2>Modifiers</h2>
    <vk-table
      divided
      striped
      hoverable
      narrowed
      middle-aligned
      :data="data"
    >
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
  TableColumn as VkTableColumn
} from '../'

export default {
  components: {
    VkTable,
    VkTableColumn
  },
  data: () => ({
    data
  })
}
</script>
