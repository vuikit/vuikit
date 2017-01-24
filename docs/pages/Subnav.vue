<template>
  <layouts-default>
    <h1>Subnav</h1>
    A simple navigation.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-subnav
        :activeItem="props.activeItem.demo.value"
        :line="props.line.demo.value"
        :pill="props.pill.demo.value"
        @change="item => {
          events.change.emited = true
          props.activeItem.demo.value = item
        }">
        <vk-subnav-item label="Item" />
        <vk-subnav-item label="Item" />
        <vk-subnav-item label="Item" />
        <vk-subnav-item label="Item" disabled />
      </vk-subnav>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Item Props">
        <vk-docs-props :props="itemProps" />
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Subnav from 'lib/Subnav/Subnav'
import SubnavItem from 'lib/Subnav/Item'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageSubnav',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(Subnav.props, props),
    itemProps: mergeProps(SubnavItem.props, itemProps),
    slots,
    events,
    example
  })
}

const props = {
  activeItem: {
    description: 'The currently active item referenced by its alias.',
    demo: {
      type: 'Select',
      options: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 }
      ],
      value: 1
    }
  },
  line: {
    description: 'Style modifier that will add a line bitween the items.',
    demo: {
      type: 'Boolean',
      value: false
    }
  },
  pill: {
    description: 'Style modifier that will wrap the selected and active items.',
    demo: {
      type: 'Boolean',
      value: true
    }
  }
}

const itemProps = {
  alias: {
    description: `Unique identifier for the item. If omited defaults to the ordinal
      number of the item (e.g. the first item alias would be <code>1</code>).`
  },
  label: {
    description: 'Title of the item. If ignoroed fallsback to default slot.'
  },
  disabled: {
    description: 'Whether the item should be disabled.'
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
`<vk-subnav @change="item => { activeItem = item }">
  <vk-subnav-item label="Item" />
  <vk-subnav-item label="Item" />
  <vk-subnav-item label="Item" />
  <vk-subnav-item label="Item" disabled />
</vk-subnav>`
</script>
