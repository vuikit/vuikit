<template>
  <div class="uk-block">
    <h2>Pagination</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-text-center">
      Displaying <code>{{ $refs.demo.from }}</code> to <code>{{ $refs.demo.to }}</code> of <code>{{ $refs.demo.total }}</code> items
    </div>
    <vk-pagination v-ref:demo
      :total="props.total.demo.value"
      :limit="props.limit.demo.value"
      :init-current="props.initCurrent.demo.value"
      :page-range="props.pageRange.demo.value"
      :align="props.align.demo.value"
      :compact="props.compact.demo.value">
    </vk-pagination>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-pagination</code> component renders a pagination navigation.
    </div>
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge } from 'lodash'
import Component from '../lib/Pagination'
import mixin from './_mixin'

export default {
  name: 'PagePagination',
  mixins: [mixin],
  data: () => ({
    props: merge({}, Component.props, props),
    events,
    example
  }),
  watch: {
    'props.total.demo.value' () {
      this.$refs.demo.current = 1
    },
    'props.limit.demo.value' () {
      this.$refs.demo.current = 1
    }
  }
}

const props = {
  total: {
    description: 'The amount of items accross all pages.',
    demo: {
      options: [10, 50, 99],
      value: 200
    }
  },
  limit: {
    description: 'Amount of items each page is displaying.',
    demo: {
      options: [20, 50]
    }
  },
  initCurrent: {
    description: `The initially selected page. The subsequent state of the selected page
      can be accessed through the <code>current</code> local property.`,
    demo: {
      type: 'Overview'
    }
  },
  pageRange: {
    description: 'Amount of visible pages around the selected page.',
    demo: {
      options: [1, 5]
    }
  },
  align: {
    description: 'The pagination vertical alignment, defaults to center if omited.',
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
    description: 'Emited on page change passing as argument an <code>Object</code> with the pagination new state.'
  }
}

const example =
`<vk-pagination {attrs}>
</vk-pagination>`
</script>
