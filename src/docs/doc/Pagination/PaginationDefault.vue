<template>
  <div>
    <vk-pagination
      :align="api.align"
      :current.sync="api.current"
      :edges="api.edges"
      :items="api.items"
      :compact="api.compact"
      :items-on-page="api.itemsOnPage"
      :visible-pages="api.visiblePages">
    </vk-pagination>
    <div class="uk-margin-large">
      Easlily create a nicely looking pagination to navigate through pages.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props
          :rows="propsRows"
          :values="$data.api">
        </table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="eventsRows"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getPropsDefaults(merge(
      {}, Helper.getProps('Pagination'), propsInfo
    ))
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: () => eventsInfo,
    propsRows: () => merge({},
      Helper.getProps('Pagination'),
      propsInfo
    )
  }
}

const demoCode =
'<vk-pagination></vk-pagination>'

const propsInfo = {
  align: {
    description: `Determines the pagination vertical alignment, <code>left</code>,
      <code>center</code> or <code>right</code>.`,
    options: ['left', 'center', 'right']
  },
  compact: {
    description: `Determines the next/prev buttons position, compacted or
      floating to the edges.`
  },
  current: {
    description: 'Determines the currently selected page.',
    editable: false
  },
  edges: {
    description: 'Determines the maximum number of edge pages.',
    options: [1, 3, 5]
  },
  items: {
    description: 'Determines the total number of items, accross all pages.',
    options: [10, 50, 100],
    demo: 10
  },
  itemsOnPage: {
    description: 'Determines the items to display for each page.',
    options: [1, 5, 10, 20]
  },
  visiblePages: {
    description: 'Determines the maximum number of pages to display.',
    options: [1, 3, 5, 10]
  }
}

const eventsInfo = [{
  name: 'select',
  description: 'Emited when the user clicks on a page.'
}]
</script>
