<template>
  <div class="uk-padding">

    <table-tree
      divided
      single-selectable
      row-selectable
      :data="data"
      :expanded-rows.sync="expanded"
      :selected-rows.sync="selected"
    >
      <table-tree-column
        head="Custom Header"
        cell="company"
      ></table-tree-column>
    </table-tree>

  </div>
</template>

<script>
import data from './data.json'
import { TableTree, TableColumn, TableTreeColumn } from '../'

export default {
  components: {
    TableTree,
    TableColumn,
    TableTreeColumn
  },
  data: () => ({
    data,
    expanded: [],
    selected: []
  })
}
</script>
