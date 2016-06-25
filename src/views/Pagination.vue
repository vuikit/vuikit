<template>
  <div class="uk-block">
    <h2>Pagination</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-pagination v-ref:demo
      :align="props.align.demo.value"
      :current.sync="props.current.demo.value"
      :edges="props.edges.demo.value"
      :items="props.items.demo.value"
      :compact="props.compact.demo.value"
      :items-on-page="props.itemsOnPage.demo.value"
      :visible-pages="props.visiblePages.demo.value">
    </vk-pagination>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-pagination</code> component renders a pagination navigation.
    </div>
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>
<vk-pagination></vk-pagination>
        </vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Pagination'

export default {
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    events
  })
}

const props = {
  current: {
    description: 'The page being currently selected.',
    demo: {
      editable: false
    }
  },
  align: {
    description: 'The pagination vertical alignment. Defaults to center if omited.',
    demo: {
      options: ['left', 'right']
    }
  },
  compact: {
    description: 'The next/prev buttons position, compacted or floating to the edges.',
    demo: {}
  },
  edges: {
    description: 'The maximum number of edge pages.',
    demo: {
      options: [1, 5]
    }
  },
  items: {
    description: 'The total number of items, accross all pages.',
    demo: {
      options: [10, 50, 100],
      value: 10
    }
  },
  itemsOnPage: {
    description: 'The items to display for each page.',
    demo: {
      options: [5, 10, 20]
    }
  },
  visiblePages: {
    description: 'The maximum number of pages to display.',
    demo: {
      options: [1, 5, 10]
    }
  }
}

const events = {
  change: {
    description: 'Emited on page selection with the selected page number as argument.'
  }
}
</script>
