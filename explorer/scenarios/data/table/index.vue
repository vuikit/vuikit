<template>
  <div>
    <h1 class="uk-h1">Table</h1>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small"
        :data="rows"
        :sortedBy="sortedBy"
        :selection.sync="selection"
        @sort="order => {
          sortedBy = order
        }">
        <vk-table-column-select />
        <vk-table-column header="ScopedSlot">
          <template scope="row">
            {{ row.id }}
          </template>
        </vk-table-column>
        <vk-table-auto :presets="presets" :columns="columns" />
      </vk-table>
      <vk-button @click="randomizeColumns">Randomize Columns</vk-button>
    </div>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'
import shuffle from 'lodash/shuffle'
import data from './data'
import presets from './presets'

export default {
  data: () => ({
    presets,
    selection: [],
    columns: ['name', 'hits', 'nested', 'sort'],
    sortedBy: {
      name: 'asc'
    }
  }),
  computed: {
    rows () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  },
  methods: {
    randomizeColumns () {
      this.columns = shuffle(this.columns)
    }
  }
}
</script>
