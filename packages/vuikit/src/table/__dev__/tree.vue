<template>
  <div class="uk-padding">

    <h1>TableTree</h1>

    <vk-table-tree
      row-selectable
      :data="data"
      :expanded-rows.sync="expanded"
      :selected-rows.sync="selected"
    >
      <vk-table-column-tree
        title="Tree"
        cell="company"
      ></vk-table-column-tree>
      <vk-table-column
        title="id"
        cell="__vkTable_rowId"
      ></vk-table-column>
    </vk-table-tree>

    <h2>Variations</h2>

    <vk-table-tree
      narrowed
      striped
      hoverable
      row-selectable
      :data="data"
      :expanded-rows.sync="expanded"
      :selected-rows.sync="selected"
    >
      <vk-table-column-tree cell="company"></vk-table-column-tree>
    </vk-table-tree>

  </div>
</template>

<script>
import data from './data.json'

export default {
  data: () => ({
    data,
    expanded: [],
    selected: []
  })
}
</script>
