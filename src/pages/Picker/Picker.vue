<template>
  <div class="uk-block">
    <h2>Picker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-picker
      :fields="[{
        name: 'name',
        pickable: 'id'
      }, {
        name: 'hits',
        pickable: true
      }, {
        name: 'description'
      }]"
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
      }]"
      @pick="
        events.pick.emited = true,
        picked(arguments[0], arguments[1])
      ">
    </vk-picker>
    <span v-html="message"></span>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-picker</code> components renders a <code>vk-table</code> wich data
      can be picked.
    </div>
    <!-- TABS -->
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
</template>

<script>
import Component from '../../lib/Picker'
import mixin from '../_mixin'
import { mergeProps } from '../../helpers/pages'

export default {
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
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
  fields: {
    description: `Extends the VkTable <code>fields</code> prop with a <code>pickable</code>
      property. It determines if the field is pickable and what row data should it pick.`
  },
  rows: {
    description: 'Extends the VkTable <code>rows</code> prop.'
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
  :fields="[{
    name: 'name',
    pickable: 'id'
  }, {
    name: 'hits',
    pickable: true
  }, {
    name: 'description'
  }]"
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
  }]"
  @pick="picked = arguments[0]">
</vk-picker>`
</script>
