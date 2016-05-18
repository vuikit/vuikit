<template>
  <div>
    <vk-pagination v-ref:demo
      :align="props.align.value"
      :current.sync="props.current.value"
      :edges="props.edges.value"
      :items="props.items.value"
      :compact="props.compact.value"
      :items-on-page="props.itemsOnPage.value"
      :visible-pages="props.visiblePages.value">
    </vk-pagination>
    <div class="uk-margin-large">
      Easlily create a nicely looking pagination to navigate through pages.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="props"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="events"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode="code"></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Pagination', props),
    events,
    code
  })
}

const code =
'<vk-pagination></vk-pagination>'

const props = {
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
    value: 10
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

const events = {
  select: {
    description: 'Emited when the user clicks on a page.'
  }
}
</script>
