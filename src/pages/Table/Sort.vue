<template>
  <div>
    <div class="uk-margin-large">
      To make the rows sortable add the <code>vk-table-column-sort</code> in the
      column configuration.
    </div>
    <vk-table
      condensed
      :data="data"
      :sortedBy="sortedBy"
      @sort="order => {
        events.sort.emited = true
        sortedBy = order
      }">
      <vk-table-column-sort header="Name" cell="name" />
      <vk-table-column-sort header="Hits" cell="hits" />
      <vk-table-column header="Description" cell="desc" />
    </vk-table>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="index => tabsIndex = index">
      <vk-tabs-item name="Table Props">
        <vk-docs-props :props="tableProps" />
      </vk-tabs-item>
      <vk-tabs-item name="Column Props">
        <vk-docs-props :props="columnProps"></vk-docs-props>
      </vk-tabs-item>
      <vk-tabs-item name="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tabs-item>
      <vk-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import Table from 'src/lib/Table'
import Column from 'src/lib/Table/columns/Sort'
import mixin from '../_mixin'
import { mergeProps } from 'src/helpers/pages'
import { orderBy } from 'lodash'

export default {
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    tableProps: mergeProps(Table.props, tableProps),
    columnProps: mergeProps(Column.props, columnProps),
    events,
    sortedBy: {
      name: 'asc'
    },
    example,
    rawData: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
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

const tableProps = {
  sortedBy: {
    description: `Object defining the current order being the <code>key</code> the
      field being sorted by and the <code>value</code> the direction, <code>asc</code>
      or <code>desc</code>.`
  }
}

const columnProps = {
  header: {
    description: 'The label for the column header.'
  },
  cell: {
    description: 'The row property name to display as the column cell value.'
  },
  sortBy: {
    description: `The row property which to use for the ordering. Defaults to
      prop value if omited.`
  }
}

const events = {
  sort: {
    description: `Emited when a click was performed on a sorting column header
      passing as argument the sorting new order.`,
    emited: false
  }
}

/* eslint-disable */
const example = `<template>
  <vk-table
    :data="data"
    :sortedBy="sortedBy"
    @sort="order => {
      sortedBy = order
    }">
    <vk-table-column-sort header="Name" cell="name" />
    <vk-table-column-sort header="Hits" cell="hits" />
    <vk-table-column header="Description" cell="desc" />
  </vk-table>
<\/template>

<script>
export default {
  data: () => ({
    sortedBy: {
      name: 'asc'
    },
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}
<\/script>`
</script>
