<template>
  <div>
    <div class="uk-margin-large">
      Each column configuration is set by <code>vk-table-column</code> as direct
      child of <code>vk-table</code>.
    </div>
    <vk-table
      :data="data"
      :condensed="tableProps.condensed.demo.value"
      :striped="tableProps.striped.demo.value"
      :hover="tableProps.hover.demo.value"
      @clickRow="events.clickRow.emited = true">
      <vk-table-column header="Name" cell="name" />
      <vk-table-column header="Hits" cell="hits" />
      <vk-table-column header="Description" cell="desc" />
    </vk-table>
    <!-- TABS -->
    <vk-tabs
      :activeTab="activeTab"
      @change="index => activeTab = index">
      <vk-tab label="Table Props">
        <vk-docs-props
          :props="tableProps"
          @change="(prop, value) => tableProps[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Column Props">
        <vk-docs-props :props="columnProps"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Table Events">
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
import Column from 'lib/Table/columns/Default'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    tableProps: mergeProps(Table.props, tableProps),
    columnProps: mergeProps(Column.props, columnProps),
    events,
    example,
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}

const tableProps = {
  data: {
    description: 'A collection of <code>Objects</code> representing each row.'
  },
  rowClass: {
    description: `A class to apply to each row. If a callback provided it will get the
      current row and it index as arguments.`
  },
  condensed: {
    description: 'Whether to display the rows compacted.',
    demo: {
      value: true
    }
  },
  striped: {
    description: 'Whether to display the rows with zebra-striping style.',
    demo: {
      value: true
    }
  },
  hover: {
    description: 'Whether to display a hover state on rows.',
    demo: {
      value: true
    }
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
    description: 'The class to be applied to each <code>tbody td</code> tag.'
  }
}

const events = {
  clickRow: {
    description: 'Emited when a click was performed on a row passing as argument it data.',
    emited: false
  }
}

/* eslint-disable */
const example = `<template>
  <vk-table :data="data">
    <vk-table-column header="Name" cell="name" />
    <vk-table-column header="Hits" cell="hits" />
    <vk-table-column header="Description" cell="desc" />
  </vk-table>
<\/template>

<script>
export default {
  data: () => ({
    data: [
      { name: 'Item A', hits: 100, desc: 'Description' },
      { name: 'Item B', hits: 40, desc: 'Description' },
      { name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}
<\/script>`
</script>
