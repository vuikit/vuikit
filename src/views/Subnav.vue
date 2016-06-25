<template>
  <div class="uk-block">
    <h2>Subnav</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-subnav v-ref:demo
      :line="props.line.demo.value"
      :pill="props.pill.demo.value">
      <vk-subnav-item>Item</vk-subnav-item>
      <vk-subnav-item>Item</vk-subnav-item>
      <vk-subnav-item>Item</vk-subnav-item>
      <vk-subnav-item disabled>Item</vk-subnav-item>
    </vk-subnav>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-subnav</code> component together with a <code>vk-subnav-item</code> renders a simple navigation.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-subnav line v-ref:nav>
          <vk-subnav-item>vk-subnav</vk-subnav-item>
          <vk-subnav-item>vk-subnav-item</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <vk-docs-props :props="props"></vk-docs-props>
          </vk-switch>
          <vk-switch>
            <vk-docs-props :props="propsItem"></vk-docs-props>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-subnav line v-ref:slots-nav>
          <vk-subnav-item>vk-subnav</vk-subnav-item>
          <vk-subnav-item>vk-subnav-item</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.slotsNav">
          <vk-switch>
            <vk-docs-slots :slots="slotsSubnav"></vk-docs-slots>
          </vk-switch>
          <vk-switch>
            <vk-docs-slots :slots="slotsSubnavItem"></vk-docs-slots>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>
<vk-subnav>
  <vk-subnav-item>Item</vk-subnav-item>
  <vk-subnav-item>Item</vk-subnav-item>
  <vk-subnav-item>Item</vk-subnav-item>
  <vk-subnav-item disabled>Item</vk-subnav-item>
</vk-subnav>
        </vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Subnav from '../lib/Subnav'
import SubnavItem from '../lib/SubnavItem'

export default {
  data: () => ({
    props: merge(props, pick(Subnav.props, Object.keys(props))),
    propsItem: merge(propsItem, pick(SubnavItem.props, Object.keys(propsItem))),
    slotsSubnav,
    slotsSubnavItem,
    events
  })
}

const props = {
  line: {
    description: 'Style modifier that will add a line bitween the items.',
    demo: {}
  },
  pill: {
    description: 'Style modifier that will wrap the selected and active items.',
    demo: {}
  }
}

const propsItem = {
  active: {
    description: 'Determines whether the item is active.'
  },
  disabled: {
    description: 'Determines whether the item is disabled.'
  }
}

const slotsSubnav = {
  default: {
    description: 'The list of <code>vk-subnav-item</code> components.'
  }
}

const slotsSubnavItem = {
  default: {
    description: 'The item title.'
  }
}

const events = {
  change: {
    description: 'Emited on item selection.'
  }
}

</script>
