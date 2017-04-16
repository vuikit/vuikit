<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small" :data="data">
        <vk-table-column header="Name" cell="name" />
        <vk-table-column header="Hits" cell="hits" />
        <vk-table-column header="Author" cell="author.name" />
      </vk-table>
    </div>

    <h2>ScopedSlots</h2>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small uk-table-middle" :data="data">
        <vk-table-column header="Name" cell="name" />
        <vk-table-column header="Hits" cell="hits" />
        <vk-table-column>
          <template slot="header" scope="props">
            <vk-button class="uk-button-small"
              @click="resetHits">
              Reset All
            </vk-button>
          </template>
          <template slot="cell" scope="{ row }">
            <vk-button class="uk-button-small uk-button-danger"
              @click="resetHit(row)">
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

    <h2>Data Defined Columns</h2>
    <div class="uk-overflow-auto">
      <vk-table class="uk-table-small"
        :data="data"
        :sortedBy="sortedBy"
        @sort="order => {
          sortedBy = order
        }">
        <vk-table-columns :definition="columns" />
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
    },
    rows: [
      { id: 1, name: 'Item A', hits: 100, desc: 'Description', author: { name: 'John Public' } },
      { id: 2, name: 'Item B', hits: 40, desc: 'Description', author: { name: 'Jane Public' } },
      { id: 3, name: 'Item C', hits: 700, desc: 'Description', author: { name: 'John Public' } }
    ],
    columns: [
      {
        header: 'Name',
        headerClass: 'header-class',
        cell: 'name',
        cellClass: 'cellClass'
      },
      {
        type: 'sort',
        header: 'Hits',
        cell: 'hits'
      },
      {
        headerRender () {
          const h = this.$createElement
          return h('b', 'Custom Header Render')
        },
        cellRender ({ row }) {
          const h = this.$createElement
          return h('b', `Custom Cell Render: ${row.author.name}`)
        }
      }
    ]
  }),
  computed: {
    data () {
      const by = Object.keys(this.sortedBy)[0]
      const dir = this.sortedBy[by]
      return orderBy(this.rows, [item => item[by]], dir)
    }
  },
  methods: {
    resetHit (row) {
      const index = this.rows.indexOf(row)
      this.rows[index].hits = 0
    },
    resetHits () {
      this.rows = this.rows.map(row => {
        row.hits = 0
        return row
      })
    },
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
</script>
