<template>
  <docs-page
    :events="events"
    :code="code">
    <div slot="demo">
      <vk-subnav v-ref:demo
        :style="props.style.value">
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
      <vk-subnav style="line" v-ref:nav>
        <vk-subnav-item>vk-subnav</vk-subnav-item>
        <vk-subnav-item>vk-subnav-item</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.nav">
        <vk-switch>
          <table-props :rows="props"></table-props>
        </vk-switch>
        <vk-switch>
          <table-props :rows="itemProps" :demo="false"></table-props>
        </vk-switch>
      </vk-switcher>
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Subnav', props),
    itemProps: Helper.getProps('SubnavItem', itemProps),
    events,
    code
  })
}

const code =
`<vk-subnav>
  <vk-subnav-item active>Item</vk-subnav-item>
  <vk-subnav-item>Item</vk-subnav-item>
  <vk-subnav-item>Item</vk-subnav-item>
</vk-subnav>`

const props = {
  style: {
    description: 'Determines the style of the list.',
    options: ['default', 'line', 'pill']
  }
}

const itemProps = {
  active: {
    description: 'Determines whether or not the item is active.'
  },
  disabled: {
    description: 'Determines whether or not the item is disabled.'
  }
}

const events = {
  change: {
    description: 'Emited on item selection change'
  }
}

</script>
