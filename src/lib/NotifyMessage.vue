<template>
  <transition :name="transition">
    <div class="uk-notify-message"
      :class="{
        [statusClass]: status,
        'vk-notify-message-sticky': timeout === 0
      }"
      @click="$parent.$emit('click', id)">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VkNotifyMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    status: {
      type: String,
      default: '' // info, success, warning, danger
    },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    statusClass () {
      return 'uk-notify-message-' + this.status.replace('info', 'primary')
    }
  },
  mounted () {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.$parent.$emit('timeout', this.id)
      }, this.timeout)
    }
  }
}
</script>
