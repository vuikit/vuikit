<template>
  <div>
    <h1 class="uk-h1">Table</h1>
    <vk-table
      small
      middle
      divider
      select
      highlight
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
    <vk-table
      small
      middle
      divider
      :data="rows"
      :sortedBy="sortedBy"
      :selection.sync="selection"
      @sort="order => {
        sortedBy = order
      }">
      <vk-table-setup :presets="presets" :columns="columns" />
      <vk-table-column v-if="togglePreset" header="no preset" />
      <vk-table-column v-if="!togglePreset" header="no preset 2" />
    </vk-table>
    <vk-button @click="randomizeColumns">Sort Random</vk-button>
    <vk-button @click="addColumn('version')">Add Column</vk-button>
    <vk-button @click="removeColumn('version')">Remove Column</vk-button>
    <p>
      <vk-button @click="togglePreset = !togglePreset">Toggle</vk-button>
      Toggling no preset columns should conserve the order
    </p>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import shuffle from 'lodash/shuffle'
import mockData from '../mock-data.json'
import presets from './presets'

export default {
  data: () => ({
    presets,
    togglePreset: true,
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
