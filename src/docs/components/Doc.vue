<template>
  <div>
    <slot name="demo"></slot>
    <div class="uk-margin-large">
      <slot name="desc"></slot>
    </div>
    <vk-tabs>
      <vk-tab label="Props">
        <slot name="props">
          <table-props :rows="props"></table-props>
        </slot>
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
export default {
  data: () => ({
    showEvents: false
  }),
  props: {
    props: {
      type: Object,
      required: false
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
