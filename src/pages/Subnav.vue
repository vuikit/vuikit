<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Subnav</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-subnav
        :line="props.line.demo.value"
        :pill="props.pill.demo.value"
        :active="props.active.demo.value"
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
        @change="
          events.change.emited = true,
          props.active.demo.value = arguments[0]
        ">
      </vk-subnav>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-subnav</code> component together with a <code>vk-subnav-item</code> renders a simple navigation.
      </div>
      <!-- TABS -->
      <vk-tabs>
        <vk-tab label="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </vk-tab>
        <vk-tab label="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
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
import Component from '../lib/Subnav'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageSubnav',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  items: {
    description: 'A definition <code>Object</code> of items to be displayed.'
  },
  active: {
    description: 'The currently active item determined by it slug',
    demo: {
      type: 'Select',
      options: [
        { text: 'Item 0', value: 'item-0' },
        { text: 'Item 1', value: 'item-1' }
      ],
      value: 'item-0'
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
