<template>
  <div>
    <slot name="demo"></slot>
    <div class="uk-margin-large">
      <slot name="desc"></slot>
    </div>
    <vk-tabs>
      <vk-tab label="Props">
        <table-props :rows="props"></table-props>
      </vk-tab>
      <vk-tab label="Events" v-if="events">
        <table-events :rows="events"></table-events>
      </vk-tab>
      <vk-tab label="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import TableProps from './TableProps'
import TableEvents from './TableEvents'

export default {
  data: () => ({
    showEvents: false
  }),
  components: {
    TableProps,
    TableEvents
  },
  props: {
    props: {
      type: Object,
      required: true
    },
    events: {
      type: [Object, Boolean],
      default: false
    },
    code: {
      type: String,
      default: ''
    }
  }
}
</script>
