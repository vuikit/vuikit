<template>
  <div>
    <docs-page
      :props="props"
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
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Subnav', props),
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

const events = {
  change: {
    description: 'Emited on item selection change'
  }
}

</script>
