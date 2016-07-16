<template>
  <div class="uk-block">
    <h2>Pagination</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-pagination v-ref:demo
      :items="props.items.demo.value"
      :selected="props.selected.demo.value"
      :page-range="props.pageRange.demo.value"
      :per-page="props.perPage.demo.value"
      :align="props.align.demo.value"
      :compact="props.compact.demo.value"
      @change="props.selected.demo.value = $arguments[0]">
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
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge } from 'lodash'
import Component from '../lib/Pagination'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge({}, Component.props, props),
    events,
    example
  })
}

const props = {
  items: {
    description: 'The total number of items, accross all pages.',
    demo: {
      options: [10, 50, 100],
      value: 100
    }
  },
  selected: {
    description: 'The page being currently selected.',
    demo: {
      editable: false,
      value: 1
    }
  },
  pageRange: {
    description: 'Amounth of visible pages around the selected page.',
    demo: {
      options: [1, 5]
    }
  },
  perPage: {
    description: 'The items to display for each page.',
    demo: {
      options: [5, 10, 20]
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
  }
}

const events = {
  change: {
    description: 'Emited on page selection with the selected page number as argument.'
  }
}

const example =
`<vk-pagination {attrs}>
</vk-pagination>`
</script>
