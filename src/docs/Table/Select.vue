<template>
  <div>
    <div class="uk-margin-large">
      To make the rows selectable add the <code>vk-table-column-select</code> in the
      column configuration and set the <code>selection</code> prop object.
    </div>
    <vk-table condensed
      :data="data"
      :rowClass="row => selection[row.id]
        ? 'uk-active'
        : ''
      ">
      <vk-table-column-select
        trackBy="id"
        :selection="selection"
        @select="rowId => {
          columnEvents.select.emited = true
          selection[rowId]
            ? $delete(selection, rowId)
            : $set(selection, rowId, true)
        }"
        @selectAll="rows => {
          columnEvents.selectAll.emited = true
          Object.keys(selection).length !== rows.length
            ? rows.forEach(rowId => $set(selection, rowId, true))
            : selection = {}
        }"
        @selectRow="rowId => {
          columnEvents.selectRow.emited = true
          selection[rowId]
            ? $delete(selection, rowId)
            : $set(selection, rowId, true)
        }">
      </vk-table-column-select>
      <vk-table-column header="Name" cell="name" />
      <vk-table-column header="Hits" cell="hits" />
      <vk-table-column header="Description" cell="desc" />
    </vk-table>
    <!-- TABS -->
    <vk-tabs
      :activeTab="activeTab"
      @change="index => activeTab = index">
      <vk-tab label="Column Props">
        <vk-docs-props :props="columnProps" />
      </vk-tab>
      <vk-tab label="Column Events">
        <vk-docs-events :events="columnEvents" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Column from 'lib/Table/columns/Select'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'
import { getFinalProps } from 'helpers/component'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    columnProps: mergeProps(getFinalProps(Column), columnProps),
    columnEvents,
    selection: {},
    example,
    data: [
      { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}

const columnProps = {
  selection: {
    description: `An <code>Object</code> representing the selected rows. It must
    be indexed by the row id, the same one set on <code>trackBy</code>.`
  },
  trackBy: {
    description: `A unique key for the rows to be tracked by when selected.`
  },
  headerClass: {
    description: 'The class to be applied to the <code>thead th</code> tag.'
  },
  cellClass: {
    description: 'The class to be applied to each <code>tbody td</code> tag.'
  }
}

const columnEvents = {
  select: {
    description: `Emited on the intention to select or unselect a row passing as argument
      it select id and data.`,
    emited: false
  },
  selectAll: {
    description: `Emited on the intention to select or unselect all rows passing as argument
      its select ids and data.`,
    emited: false
  },
  selectRow: {
    description: 'Emited when a click was performed on a row passing as argument it select id and data.',
    emited: false
  }
}

/* eslint-disable */
const example = `<template>
  <vk-table
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
<\/template>

<script>
export default {
  data: () => ({
    selection: {},
    data: [
      { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}
<\/script>`
</script>
