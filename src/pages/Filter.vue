<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Filter</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-filter
        :filters="{
          'Filter Foo': 'from:hi@retrace.io,foo@gmail.com subject:vacations date:1/10/2013-15/04/2014 photos',
          'Filter Bar': 'subject:bar date:-15/04/2014'
        }"
        :parser="{
          keywords: ['from', 'subject'],
          ranges: ['date']
        }"
        :showReset="props.showReset.demo.value"
        @query="events.query.emited = true">
      </vk-filter>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-filter</code> component renders a GitHub inspired filter. The parsed
        query can be accessed with the <code>parsed</code> computed property.
      </div>
      <!-- TABS -->
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
  </vk-docs-layout-page>
</template>

<script>
import Component from '../lib/Filter'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageFilter',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    events,
    example
  })
}

const props = {
  filters: {
    description: 'Predefined queries that will be listed on the button dropdown.'
  },
  parser: {
    description: `The query arguments the parser should parse. It accepts 2 values:
      <code>keywords</code>, that can be separated by commas (<code>,</code>) and
      <code>ranges</code>, that can be separated by a hyphen (<code>-</code>).
      Both values take an array of strings, if none specified, or if none are present
      in the given search query, the parser will return a string.`
  },
  showReset: {
    description: 'Wheter to disable the button that allows reseting the query string.',
    demo: {
      value: true
    }
  }
}

const events = {
  query: {
    description: 'Emited when the query is updated passing as argument raw and parsed state.',
    emited: false
  }
}

const example =
`<vk-filter {attrs}
  :filters="{
    'Filter Foo': '...',
    'Filter Bar': '...'
  }"
  :parser="{
    keywords: ['from', 'subject'],
    ranges: ['date']
  }">
</vk-filter>`
</script>
