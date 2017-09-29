<template>
  <div class="uk-padding">
    <!-- single selection -->
    <vk-table middle divider select-single
      :data="rows"
      :selection.sync="selection"
    >
      <vk-table-column
        header="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <!-- multiple selection -->
    <vk-table middle divider select
      :data="rows"
      :selection.sync="selection2"
    >
      <vk-table-column-select></vk-table-column-select>
      <vk-table-column
        header="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

  </div>
</template>

<script>
import mockData from './mock-data.json'

export default {
  data: () => ({
    selection: [],
    selection2: [],
    rows: mockData.splice(0, 5)
  })
}
</script>
