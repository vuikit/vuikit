<template>
  <div class="uk-block">
    <h2>Picker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-picker
      :pickables="[{ name: 'id' }, 'hits']"
      :table-fields="['name', 'hits', 'description']"
      :table-rows="[{
        id: 1,
        name: 'Item 1',
        hits: 34,
        description: 'The item description'
      }, {
        id: 2,
        name: 'Item 2',
        hits: 56,
        description: 'The item description'
      }]"
      @pick="picked">
    </vk-picker>
    <span v-html="message"></span>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-picker</code> components renders a <code>vk-table</code> wich data
      can be picked.
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
</template>

<script>
import Component from '../../lib/Picker'
import mixin from '../_mixin'
import { mergeProps } from './helper'

export default {
  mixins: [mixin],
  data: () => ({
    message: '',
    props: mergeProps(Component.props, props),
    example,
    events
  }),
  methods: {
    picked (value, field) {
      this.message = `Picked field <code>${field}</code> which returned value <code>${value}</code>.`
    }
  }
}

const props = {
  pickables: {
    description: `Array of fields names that should allow picking data. A picked field
    can return a different field value by passing a field/data mapping <code>Object</code>
    instead. Eg. <code>[{ name: 'id' }, 'hits']</code>.`
  },
  'table-*': {
    description: `Props passed to the underlying Table instance prefixed with
      <code>table-</code>. See the <a href="/vuikit/#!/table">Table documentation</a>
      for all possible values.`
  }
}

const events = {
  pick: {
    description: 'Emited when a data is picked passing as argument the picked value and its field name.'
  }
}

const example =
`<vk-picker {attrs}
  :pickables="[{ name: 'id' }, 'hits']"
  :table-fields="['name', 'hits', 'description']"
  :table-rows="[{
    id: 1,
    name: 'Item 1',
    hits: 34,
    description: 'The item description'
  }, {
    id: 2,
    name: 'Item 2',
    hits: 56,
    description: 'The item description'
  }]">
</vk-picker>`
</script>
