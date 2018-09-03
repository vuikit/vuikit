<template>
  <div class="uk-padding">

    <h1>Selectable rows</h1>

    <h2>Single Selection</h2>

    <vk-table
      striped
      narrowed
      cells-middle
      row-selectable
      :data="data"
      :selected-rows.sync="singleSelection"
    >
      <vk-table-column
        title="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

    <h2>Multiple Selection</h2>

    <vk-table
      narrowed
      cells-middle
      rows-selectable
      :data="data"
      :selected-rows.sync="selection"
    >
      <vk-table-column-select />
      <vk-table-column-select headless />
      <vk-table-column
        title="Website"
        cell="website"
      ></vk-table-column>
    </vk-table>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    data,
    selection: [],
    singleSelection: []
  })
}
</script>
