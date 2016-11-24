<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Subnav</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-subnav
        :index="props.index.demo.value"
        :line="props.line.demo.value"
        :pill="props.pill.demo.value"
        @change="
          events.change.emited = true,
          props.index.demo.value = arguments[0]
        ">
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item disabled>Item</vk-subnav-item>
      </vk-subnav>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-subnav</code> component renders a UIkit Subnav navigation.
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
        <vk-tabs-item name="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
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
import Component from '../lib/Subnav'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageSubnav',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  index: {
    description: 'The currently active item referenced by its order index.',
    demo: {
      type: 'Select',
      options: [
        { text: '0', value: 0 },
        { text: '1', value: 1 },
        { text: '2', value: 2 }
      ],
      value: 0
    }
  },
  line: {
    description: 'Style modifier that will add a line bitween the items.',
    demo: {
      value: false
    }
  },
  pill: {
    description: 'Style modifier that will wrap the selected and active items.',
    demo: {
      value: false
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-subnav-item</code> components.'
  }
}

const events = {
  change: {
    description: 'Emited on item selection change.',
    emited: false
  }
}

const example =
`<vk-subnav {attrs}
  :items="{
    'item-0': {
      name: 'Item'
    },
    'item-1': {
      name: 'Item'
    },
    'item-2': {
      name: 'Item',
      disabled: true
    }
  }"
  @change="active = arguments[0]">
</vk-subnav>`
</script>
