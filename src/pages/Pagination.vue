<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Pagination</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <div class="uk-text-center">
        Displaying <code>{{ pagination.offset }}</code> to <code>{{ pagination.to }}</code>
        of <code>{{ props.total.demo.value }}</code> items
      </div>
      <vk-pagination
        :total="props.total.demo.value"
        :limit="props.limit.demo.value"
        :page="props.page.demo.value"
        :page-range="props.pageRange.demo.value"
        :align="props.align.demo.value"
        :compact="props.compact.demo.value"
        @change="
          events.change.emited = true,
          props.page.demo.value = arguments[0].page
          pagination.offset = arguments[0].offset,
          pagination.to = arguments[0].to
        ">
      </vk-pagination>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-pagination</code> component renders a UIkit Pagination navigation.
      </div>
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
import { mergeProps } from '../helpers/pages'
import Component from '../lib/Pagination'
import mixin from './_mixin'

export default {
  name: 'PagePagination',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    pagination: {
      offset: 1,
      to: 20
    },
    props: mergeProps(Component.props, props),
    events,
    example
  }),
  watch: {
    'props.total.demo.value' () {
      props.page.demo.value = 1
    },
    'props.limit.demo.value' () {
      props.page.demo.value = 1
    }
  }
}

const props = {
  page: {
    description: 'The page being displayed.',
    demo: {
      type: 'Overview',
      value: 1
    }
  },
  total: {
    description: 'The amount of items accross all pages.',
    demo: {
      type: 'Select',
      options: [
        { text: '50', value: 50 },
        { text: '99', value: 99 },
        { text: '200', value: 200 },
        { text: '1000', value: 1000 }
      ],
      value: 200
    }
  },
  limit: {
    description: 'Amount of items each page is displaying.',
    demo: {
      type: 'Select',
      options: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '50', value: 50 },
        { text: '100', value: 100 }
      ],
      value: 10
    }
  },
  pageRange: {
    description: 'Amount of visible pages around the selected page.',
    demo: {
      type: 'Select',
      options: [
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '5', value: 5 }
      ],
      value: 3
    }
  },
  align: {
    description: 'The pagination vertical alignment, defaults to center if omited.',
    demo: {
      type: 'Select',
      options: [
        { text: 'center', value: '' },
        { text: 'left', value: 'left' },
        { text: 'right', value: 'right' }
      ],
      value: ''
    }
  },
  compact: {
    description: 'The next/prev buttons position, compacted or floating to the edges.',
    demo: {
      value: false
    }
  }
}

const events = {
  change: {
    description: `Emited on page change passing as argument an <code>Object</code>
      with the pagination new state.`,
    emited: false
  }
}

const example =
`<vk-pagination {attrs}
  @change="page = arguments[0].page">
</vk-pagination>`
</script>
