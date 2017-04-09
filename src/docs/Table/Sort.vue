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
      :activeTab="activeTab"
      @change="index => activeTab = index">
      <vk-tab label="Table Props">
        <vk-docs-props :props="tableProps" />
      </vk-tab>
      <vk-tab label="Column Props">
        <vk-docs-props :props="columnProps"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Table from 'lib/Table'
import Column from 'lib/Table/columns/Sort'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'
import { getFinalProps } from 'helpers/component'
import { orderBy } from 'lodash'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    tableProps: mergeProps(Table.props, tableProps),
    columnProps: mergeProps(getFinalProps(Column), columnProps),
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
  headerClass: {
    description: 'The class to be applied to the <code>thead th</code> tag.'
  },
  cell: {
    description: 'The row property name to display as the column cell value.'
  },
  cellClass: {
    description: 'The class to be applied to the <code>tbody td</code> tag.'
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
