<template>
  <div>
    <h1 class="uk-h1">Table</h1>
    <vk-table class="uk-table-small uk-table-middle"
      ref="table"
      :data="rows"
      :sortedBy="sortedBy"
      :selection.sync="selection"
      @sort="order => {
        sortedBy = order
      }">
      <vk-table-column-select />
      <vk-table-column-sort header="ID" cell="id" />
      <vk-table-column-sort header="Company" cell="company" />
      <vk-table-column
        header="Website"
        class="uk-text-right"
        cellClass="uk-text-right">
        <template scope="row">
          <a :href="`http://${row.website}`">{{ row.website }}</a>
        </template>
      </vk-table-column>
    </vk-table>

    <h2 class="uk-h2">Presets</h2>
    <vk-table class="uk-table-small uk-table-middle"
      ref="table"
      :data="rows"
      :sortedBy="sortedBy"
      :selection.sync="selection"
      @sort="order => {
        sortedBy = order
      }">
      <vk-table-presets :definition="presets" :columns="columns" />
    </vk-table>
    <vk-button @click="randomizeColumns">Sort Random</vk-button>
    <vk-button @click="addColumn('version')">Add Column</vk-button>
    <vk-button @click="removeColumn('version')">Remove Column</vk-button>
  </div>
</template>

<script>
import mockData from 'root/mock-data.json'
import orderBy from 'lodash/orderBy'
import shuffle from 'lodash/shuffle'
import presets from './presets'

export default {
  data: () => ({
    presets,
    selection: [],
    columns: ['select', 'id', 'company', 'website'],
    sortedBy: {
      id: 'asc'
    },
    dirtyRows: mockData.splice(0, 5)
  }),
  computed: {
    rows () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(this.dirtyRows, [item => item[by]], dir)
    }
  },
  methods: {
    randomizeColumns () {
      this.columns = shuffle(this.columns)
    },
    addColumn (col) {
      this.columns.push(col)
    },
    removeColumn (col) {
      this.columns.splice(this.columns.indexOf(col), 1)
    }
  }
}
</script>
