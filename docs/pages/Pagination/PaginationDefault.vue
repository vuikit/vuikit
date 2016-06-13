<template>
  <docs-page
    component="pagination"
    :props="props"
    :events="events">
    <div slot="demo">
      <vk-pagination v-ref:demo
        :align="props.align.value"
        :current.sync="props.current.value"
        :edges="props.edges.value"
        :items="props.items.value"
        :compact="props.compact.value"
        :items-on-page="props.itemsOnPage.value"
        :visible-pages="props.visiblePages.value">
      </vk-pagination>
    </div>
    <div slot="desc">
      The <code>vk-pagination</code> component renders a pagination navigation.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Pagination', props),
    events
  })
}

const props = {
  current: {
    description: 'The page being currently selected.',
    editable: false
  },
  align: {
    description: 'The pagination vertical alignment. Defaults to center if omited.',
    options: ['left', 'right']
  },
  compact: {
    description: 'The next/prev buttons position, compacted or floating to the edges.'
  },
  edges: {
    description: 'The maximum number of edge pages.',
    options: [1, 5]
  },
  items: {
    description: 'The total number of items, accross all pages.',
    options: [10, 50, 100],
    value: 10
  },
  itemsOnPage: {
    description: 'The items to display for each page.',
    options: [5, 10, 20]
  },
  visiblePages: {
    description: 'The maximum number of pages to display.',
    options: [1, 5, 10]
  }
}

const events = {
  change: {
    description: 'Emited on page selection with the selected page number as argument.'
  }
}
</script>
