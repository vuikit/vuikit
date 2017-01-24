<template>
  <div>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small" :data="data">
        <vk-table-column header="Name" cell="name" />
        <vk-table-column header="Hits" cell="hits" />
        <vk-table-column header="Description" cell="desc" />
      </vk-table>
    </div>

    <h2>ScopedSlots</h2>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small uk-table-middle" :data="data">
        <vk-table-column header="Name" cell="name" />
        <vk-table-column header="Hits" cell="hits" />
        <vk-table-column>
          <template slot="header" scope="props">
            <vk-button class="uk-button-small">
              Reset All
            </vk-button>
          </template>
          <template slot="cell" scope="props">
            <vk-button class="uk-button-small uk-button-danger">
              Reset Hits
            </vk-button>
          </template>
        </vk-table-column>
      </vk-table>
    </div>

    <h2>Select</h2>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small"
        :data="data"
        :rowClass="row => selection[row.id]
          ? 'uk-active'
          : ''
        ">
        <vk-table-column-select
          trackBy="id"
          :selection="selection"
          @select="rowId => {
            selection[rowId]
              ? $delete(selection, rowId)
              : $set(selection, rowId, true)
          }"
          @selectAll="rows => {
            Object.keys(selection).length !== rows.length
              ? rows.forEach(rowId => $set(selection, rowId, true))
              : selection = {}
          }"
          @selectRow="rowId => {
            selection[rowId]
              ? $delete(selection, rowId)
              : $set(selection, rowId, true)
          }">
        </vk-table-column-select>
        <vk-table-column header="Name" cell="name" />
        <vk-table-column header="Hits" cell="hits" />
        <vk-table-column header="Description" cell="desc" />
      </vk-table>
    </div>

    <h2>Sort</h2>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small"
        :data="data"
        :sortedBy="sortedBy"
        @sort="order => {
          sortedBy = order
        }">
        <vk-table-column-sort header="Name" cell="name" />
        <vk-table-column-sort header="Hits" cell="hits" />
        <vk-table-column header="Description" cell="desc" />
      </vk-table>
    </div>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'

export default {
  data: () => ({
    selection: {},
    sortedBy: {
      name: 'asc'
    },
    rawData: [
      { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  }),
  computed: {
    data () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(this.rawData, [item => item[by]], dir)
    }
  }
}
</script>
