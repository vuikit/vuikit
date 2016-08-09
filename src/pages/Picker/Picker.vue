<template>
  <div class="uk-block">
    <h2>Picker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-picker
      :pickables="[{ name: 'id' }, 'hits']"
      @pick="
        events.pick.emited = true,
        picked(arguments[0], arguments[1])
      ">
      <vk-table
        :fields="['name', 'hits', 'description']"
        :rows="[{
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
      </vk-table>
    </vk-picker>
    <span v-html="message"></span>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-picker</code> components renders a <code>vk-table</code> wich data
      can be picked.
    </div>
    <!-- TABS -->
    <tm-tabs>
      <tm-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </tm-tabs-item>
      <tm-tabs-item name="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </tm-tabs-item>
      <tm-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </tm-tabs-item>
    </tm-tabs>
  </div>
</template>

<script>
import Component from '../../lib/Picker'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

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
  }
}

const events = {
  pick: {
    description: 'Emited when a data is picked passing as argument the picked value and its field name.',
    emited: false
  }
}

const example =
`<vk-picker {attrs}
  :pickables="[{ name: 'id' }, 'hits']"
  @pick="picked = arguments[0]">
  <vk-table
    :fields="['name', 'hits', 'description']"
    :rows="[{
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
  </vk-table>
</vk-picker>`
</script>
