<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Table</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-table class="uk-form" ref="table"
        trackBy="id"
        :fields="fields"
        :rows="sortedRows"
        :selectedRows="selectedRows"
        :selectable="props.selectable.demo.value"
        :condensed="props.condensed.demo.value"
        :striped="props.striped.demo.value"
        :hover="props.hover.demo.value"
        :sort-order="sortOrder"
        @sort="
          events.sort.emited = true,
          sortOrder = arguments[0]
        "
        @select="
          events.select.emited = true,
          selectedRows = arguments[0]
        "
        @unselect="
          events.unselect.emited = true,
          selectedRows = arguments[0]
        ">
      </vk-table>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-table</code> component renders a table based on the provided fields
        definition and data.
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
    selectedRows: [],
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
      render (h, { props }) {
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
    description: `A collection of <code>String</code>, <code>Objects</code> or mix of both
      defining the fields. Simple field definition will be converted to
      <code>Object</code>.`
  },
  rows: {
    description: `A collection of <code>Objects</code> representing the rows data.
      The row object doesn't require any specific structure, but the key
      <code>_selected</code> is reserved for the component workflow.`
  },
  trackBy: {
    description: `A unique key for the rows to be tracked by. Used among others
    to optimize the rendering of the rows.`
  },
  selectable: {
    description: 'Whether to display the rows select checkboxes.',
    demo: {
      value: true
    }
  },
  selectedRows: {
    description: `An <code>Array</code> of selected rows ids determined by
      <code>trackBy</code>.`
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
  select: {
    description: `Emited on the intention to change the rows state to selected passing as
      first argument the <code>selectedRows</code> new state and as second the involved rows.`,
    emited: false
  },
  unselect: {
    description: `Emited on the intention to change the rows state to unselected passing as
      first argument the <code>selectedRows</code> new state and as second the involved rows.`,
    emited: false
  }
}

const example =
`<vk-table {attrs}
  trackBy="id"
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
  @change="rows = arguments[0]">
</vk-table>`
</script>
