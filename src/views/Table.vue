<template>
  <div class="uk-block">
    <h2>Table</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-table
      :fields="['id', 'name', { name: 'desc', title: 'Description' }]"
      :rows="[
        { name: 'Item 1', id: 1, desc: 'Description' },
        { name: 'Item 2', id: 2, desc: 'Description' }
      ]"
      :striped="props.striped.demo.value"
      :condensed="props.condensed.demo.value"
      :hover="props.hover.demo.value">
      {{ $row[$field.name] }}
    </vk-table>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-table</code> component renders a table based on the provided data.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Table'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    example
  })
}

const props = {
  fields: {
    description: `Array of <code>String</code>, <code>Objects</code> or mix of both
      defining the fields. Simple field definition will be converted to
      <code>Object</code>.`
  },
  rows: {
    description: 'Array of field/value map <code>Objects</code> defining the rows.'
  },
  condensed: {
    description: 'Whether to display the rows more compact.',
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

const example =
`<vk-table {attrs}
  :fields="['id', 'name', { name: 'desc', title: 'Description' }]"
  :rows="[
    { name: 'Item 1', id: 1, desc: 'Description' },
    { name: 'Item 2', id: 2, desc: 'Description' }
  ]">
  {{ $row[$field] }}
</vk-table>`
</script>
