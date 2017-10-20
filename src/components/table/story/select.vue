<template>
  <div class="uk-padding">
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

    <!-- using slots -->
    <vk-table middle divider select
      :data="rows"
      :selection.sync="selection2"
    >
      <vk-table-column-select>
        <template slot="header">All</template>
        <template slot-scope="row">
          Checkbox
        </template>
      </vk-table-column-select>
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
    rows: [...mockData].splice(0, 5)
  })
}
</script>
