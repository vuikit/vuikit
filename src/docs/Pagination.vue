<template>
  <layouts-default>
    <h1>Pagination</h1>
    Display a pagination to navigate through pages.
    <hr class="uk-article-divider">
    <div class="uk-text-center">
      Displaying <code>{{ pagination.offset }}</code> to <code>{{ pagination.to }}</code>
      of <code>{{ props.total.demo.value }}</code> items
    </div>
    <div class="uk-margin">
      <vk-pagination
        :activePage="props.activePage.demo.value"
        :total="props.total.demo.value"
        :limit="props.limit.demo.value"
        :page-range="props.pageRange.demo.value"
        :align="props.align.demo.value"
        :compact="props.compact.demo.value"
        @change="({ page, offset, to }) => {
          events.change.emited = true,
          pagination.to = to
          pagination.offset = offset
          props.activePage.demo.value = page
        }">
      </vk-pagination>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
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
  </layouts-default>
</template>

<script>
import { mergeProps } from 'helpers/pages'
import Component from 'lib/Pagination'
import mixin from './_mixin'

export default {
  name: 'PagePagination',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
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
      props.activePage.demo.value = 1
    },
    'props.limit.demo.value' () {
      props.activePage.demo.value = 1
    }
  }
}

const props = {
  activePage: {
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
`<vk-pagination :activePage="1" @change="({ page }) => activePage = page" />`
</script>
