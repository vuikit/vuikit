<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Table</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-table
        ref="table"
        :fields="fields"
        :rows="sortedRows"
        :selectable="props.selectable.demo.value"
        :selection="selection"
        :condensed="props.condensed.demo.value"
        :striped="props.striped.demo.value"
        :hover="props.hover.demo.value"
        :sort-order="sortOrder"
        @sort="
          events.sort.emited = true,
          sortOrder = arguments[0]
        "
        @clickRow="
          events.clickRow.emited = true,
          selection[arguments[0]]
            ? $delete(selection, arguments[0])
            : $set(selection, arguments[0], true)
        "
        @select="
          events.select.emited = true,
          selection[arguments[0]]
            ? $delete(selection, arguments[0])
            : $set(selection, arguments[0], true)
        "
        @selectAll="
          events.selectAll.emited = true,
          Object.keys(selection).length !== rows.length
            ? arguments[0].forEach(function(rowId) { $set(selection, rowId, true) })
            : selection = {}
        ">
      </vk-table>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-table</code> component renders a UIkit table providing
        additional features for displaying dynamic data.
      </div>
      <!-- TABS -->
      <vk-tabs
        :index="tabsIndex"
        @change="tabsIndex = arguments[0]">
        <vk-tabs-item name="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
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
  </layouts-default>
</template>

<script>
import { orderBy } from 'lodash'
import Component from '../lib/Table'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageTable',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    events,
    example,
    sortOrder: {
      name: 'asc'
    },
    selection: {},
    fields: [{
      name: 'name',
      sortBy: true
    }, {
      name: 'hits',
      sortBy: true,
      headerClass: 'vk-table-width-minimum'
    }, {
      name: 'desc',
      header: 'Description',
      cell (h, { props }) {
        return props.row[ props.field.name ]
      }
    }],
    rows: [
      { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
      { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
      { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
    ]
  }),
  computed: {
    sortedRows () {
      const by = Object.keys(this.sortOrder)[0]
      const dir = this.sortOrder[by]
      return orderBy(this.rows, [item => item[by]], dir)
    }
  }
}

const props = {
  fields: {
    description: `A collection of <code>Objects</code> defining the fields as:
<pre>[{
  name: String,
  sortBy: [Boolean, String],
  headerClass: String,
  header: [Boolean, String, Function],
  cellClass: String,
  cell: [String, Function]
}]</pre>`
  },
  rows: {
    description: 'A collection of <code>Objects</code> representing the rows data.'
  },
  trackBy: {
    description: `A unique key for the rows to be tracked by used among others
      to optimize the rendering.`
  },
  selectable: {
    description: 'Whether to display the rows select checkboxes.',
    demo: {
      value: true
    }
  },
  selection: {
    description: 'An <code>Object</code> of selected rows indexed by <code>trackBy</code> id.'
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
      value: false
    }
  },
  hover: {
    description: 'Whether to display a hover state on rows.',
    demo: {
      value: false
    }
  },
  sortOrder: {
    description: `Object defining the current order being the <code>key</code> the
      field being sorted by and the <code>value</code> the direction, <code>asc</code>
      or <code>desc</code>.`
  }
}

const events = {
  sort: {
    description: `Emited on the intention to sort the rows passing as argument
    the sorting data.`,
    emited: false
  },
  clickRow: {
    description: 'Emited when a click was performed on a row passing as argument it id and data.',
    emited: false
  },
  select: {
    description: `Emited on the intention to select or unselect a row passing as argument
      it id and data.`,
    emited: false
  },
  selectAll: {
    description: `Emited on the intention to select or unselect all rows passing as argument
      its ids and data.`,
    emited: false
  }
}

const example =
`<vk-table {attrs}
  :fields="[{
    name: 'name',
    sortBy: true
  }, {
    name: 'hits',
    sortBy: true,
    headerClass: 'vk-table-width-minimum'
  }, {
    name: 'desc',
    header: 'Description'
  }]"
  :rows="[
    { id: 1, name: 'Item A', hits: 100, desc: 'Description' },
    { id: 2, name: 'Item B', hits: 40, desc: 'Description' },
    { id: 3, name: 'Item C', hits: 700, desc: 'Description' }
  ]"
  @sort="sortOrder = arguments[0]"
  @clickRow="
    selection[arguments[0]]
      ? $delete(selection, arguments[0])
      : $set(selection, arguments[0], true)
  "
  @select="
    selection[arguments[0]]
      ? $delete(selection, arguments[0])
      : $set(selection, arguments[0], true)
  "
  @selectAll="
    Object.keys(selection).length !== rows.length
      ? arguments[0].forEach(function(rowId) { $set(selection, rowId, true) })
      : selection = {}
  ">
</vk-table>`
</script>
