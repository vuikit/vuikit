<template>
  <div class="uk-block">
    <h2>Table</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-table v-ref:demo
      :fields="[{
        name: 'id',
        sortBy: true
      }, {
        name: 'name',
        sortBy: true
      }, {
        name: 'desc',
        header: 'Description',
        headerClass: 'uk-text-right',
        cellClass: 'uk-text-right'
      }]"
      :rows="rows"
      :striped="props.striped.demo.value"
      :condensed="props.condensed.demo.value"
      :hover="props.hover.demo.value"
      :sort-order="sortOrder"
      @sort="sortRows">
      {{ $row[$field.name] }}
    </vk-table>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-table</code> component renders a table based on the provided fields
      definition and data.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick, orderBy } from 'lodash'
import Component from '../lib/Table'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    events,
    example,
    rawRows: [
      { name: 'Item B', id: 1, desc: 'Description' },
      { name: 'Item A', id: 2, desc: 'Description' }
    ],
    sortOrder: {
      name: 'desc'
    }
  }),
  computed: {
    rows () {
      const by = Object.keys(this.sortOrder)[0]
      const dir = this.sortOrder[by]
      return orderBy(this.rawRows, by, dir)
    }
  },
  methods: {
    sortRows (sortOrder) {
      this.sortOrder = sortOrder
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
    description: 'A collection of <code>Objects</code> representing the rows data.'
  },
  sortOrder: {
    description: `Object defining the current order being the <code>key</code> the
      field being sorted by and the <code>value</code> the direction, <code>asc</code>
      or <code>desc</code>.`
  },
  condensed: {
    description: 'Whether to display the rows compacted.',
    demo: {
      value: true
    }
  },
  striped: {
    description: 'Whether to display the rows with zebra-striping style.',
    demo: {}
  },
  hover: {
    description: 'Whether to display a hover state on rows.',
    demo: {}
  }
}

const slots = {
  default: {
    description: `The template that will be used to render each field. Both
      <code>$row</code> and <code>$field</code> variables are available representing
      the current row and field being rendered.`
  }
}

const events = {
  sort: {
    description: `Emited when a sortable field header has been clicked passing
      as arguments the field data.`
  }
}

const example =
`<vk-table {attrs}
  :fields="[
    'id',
    'name',
    {
      name: 'desc',
      header: 'Description',
      headerClass: 'uk-text-right',
      cellClass: 'uk-text-right'
    }
  ]"
  :rows="[
    { name: 'Item 1', id: 1, desc: 'Description' },
    { name: 'Item 2', id: 2, desc: 'Description' }
  ]">
  {{ $row[$field] }}
</vk-table>`
</script>
