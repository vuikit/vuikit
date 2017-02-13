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
        :rowClass="row => selection.has(row)
          ? 'uk-active'
          : ''
        "
        @click-row="toggleSelection">
        <vk-table-column-select
          :is-selected="isSelected"
          @select="toggleSelection"
          @select-all="toggleSelectionAll"
        >
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
  name: 'VkTableDemo',
  data: () => ({
    selection: new Set(),
    sortedBy: {
      name: 'asc'
    }
  }),
  computed: {
    data () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(data, [item => item[by]], dir)
    }
  },
  methods: {
    isSelected (row) {
      return this.selection.has(row)
    },
    toggleSelection (row) {
      this.selection.has(row)
        ? this.selection.delete(row)
        : this.selection.add(row)
    },
    toggleSelectionAll () {
      const isAllSelected = this.data.filter(this.isSelected).length === this.data.length
      isAllSelected
        ? this.selection.clear()
        : this.selection = new Set(this.data)
    }
  }
}

const data = [
  { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
  { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
  { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
]
</script>
