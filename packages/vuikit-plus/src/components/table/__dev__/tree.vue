<template>
  <div class="uk-padding">

    <table-tree
      divided
      single-selectable
      row-selectable
      row-key="id"
      :data="data"
      :expanded-rows.sync="expanded"
      :selected-rows.sync="selected"
    >
      <table-column-tree
        head="Custom Header"
        cell="company"
      ></table-column-tree>
    </table-tree>

  </div>
</template>

<script>
import data from './data.json'
import { TableTree, TableColumn, TableColumnTree } from '../'

export default {
  components: {
    TableTree,
    TableColumn,
    TableColumnTree
  },
  data: () => ({
    data,
    expanded: [],
    selected: []
  })
}
</script>
