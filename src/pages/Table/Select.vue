<template>
  <div>
    <div class="uk-margin-large">
      To make the rows selectable add the <code>vk-table-column-select</code> in the
      column configuration and set the <code>selection</code> prop object.
    </div>
    <vk-table
      trackBy="id"
      condensed
      :data="data"
      :selection="selection"
      @clickRow="rowId => {
        events.clickRow.emited = true
        selection[rowId]
          ? $delete(selection, rowId)
          : $set(selection, rowId, true)
      }"
      @select="rowId => {
        events.select.emited = true
        selection[rowId]
          ? $delete(selection, rowId)
          : $set(selection, rowId, true)
      }"
      @selectAll="rows => {
        events.selectAll.emited = true
        Object.keys(selection).length !== rows.length
          ? rows.forEach(function(rowId) { $set(selection, rowId, true) })
          : selection = {}
      }">
      <vk-table-column-select />
      <vk-table-column header="Name" cell="name" />
      <vk-table-column header="Hits" cell="hits" />
      <vk-table-column header="Description" cell="desc" />
    </vk-table>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="index => tabsIndex = index">
      <vk-tabs-item name="Props">
        <vk-docs-props
          :props="tableProps"
          @change="value => tableProps[arguments[0]].demo.value = value">
        </vk-docs-props>
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
import mixin from '../_mixin'
import { mergeProps } from 'src/helpers/pages'

export default {
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    tableProps: mergeProps(Table.props, tableProps),
    events,
    selection: {},
    example,
    data: [
      { id: 0, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 1, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 2, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}

const tableProps = {
  selection: {
    description: `An <code>Object</code> representing the selected rows. It must
      be indexed by the row id, the same one set on <code>trackBy</code>.`
  }
}

const events = {
  select: {
    description: `Emited on the intention to select or unselect a row passing as argument
      it id and data.`,
    emited: false
  },
  selectAll: {
    description: `Emited on the intention to select or unselect all rows passing as argument
      its ids and data.`,
    emited: false
  },
  clickRow: {
    description: 'Emited when a click was performed on a row passing as argument it data.',
    emited: false
  }
}

/* eslint-disable */
const example = `<template>
  <vk-table
    trackBy="id"
    :data="data"
    :selection="selection"
    @clickRow="rowId => {
      selection[rowId]
        ? $delete(selection, rowId)
        : $set(selection, rowId, true)
    }"
    @select="rowId => {
      selection[rowId]
        ? $delete(selection, rowId)
        : $set(selection, rowId, true)
    }"
    @selectAll="rows => {
      Object.keys(selection).length !== rows.length
        ? rows.forEach(function(rowId) { $set(selection, rowId, true) })
        : selection = {}
    }">
    <vk-table-column-select />
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
      { id: 0, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 1, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 2, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  })
}
<\/script>`
</script>
