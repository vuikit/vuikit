<template>
  <docs-page
    :slots="true"
    component="subnav"
    :props="props"
    :code-slot="codeSlot"
    :events="events">
    <div slot="demo">
      <vk-subnav v-ref:demo
        :line="props.line.value"
        :pill="props.pill.value">
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item disabled>Item</vk-subnav-item>
      </vk-subnav>
    </div>
    <div slot="desc">
      The <code>vk-subnav</code> component together with a <code>vk-subnav-item</code> renders a simple navigation.
    </div>
    <div slot="props">
      <vk-subnav line v-ref:nav>
        <vk-subnav-item>vk-subnav</vk-subnav-item>
        <vk-subnav-item>vk-subnav-item</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.nav">
        <vk-switch>
          <table-props :rows="props"></table-props>
        </vk-switch>
        <vk-switch>
          <table-props :rows="propsItem" :demo="false"></table-props>
        </vk-switch>
      </vk-switcher>
    </div>
    <div slot="slots">
      <vk-subnav line v-ref:slots-nav>
        <vk-subnav-item>vk-subnav</vk-subnav-item>
        <vk-subnav-item>vk-subnav-item</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.slotsNav">
        <vk-switch>
          <table-slots :rows="slotsSubnav"></table-slots>
        </vk-switch>
        <vk-switch>
          <table-slots :rows="slotsSubnavItem"></table-slots>
        </vk-switch>
      </vk-switcher>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Subnav', props),
    propsItem: Helper.getProps('SubnavItem', propsItem),
    events,
    codeSlot,
    slotsSubnav,
    slotsSubnavItem
  })
}

const codeSlot =
`<vk-subnav-item>Item</vk-subnav-item>
<vk-subnav-item>Item</vk-subnav-item>
<vk-subnav-item>Item</vk-subnav-item>
<vk-subnav-item disabled>Item</vk-subnav-item>`

const props = {
  line: {
    description: 'Style modifier that will add a line bitween the items.'
  },
  pill: {
    description: 'Style modifier that will wrap the selected and active items.'
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
