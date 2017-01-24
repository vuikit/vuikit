<template>
  <transition :name="transition">
    <div class="uk-notification-message"
      :class="{
        [`uk-notification-message-${status}`]: status
      }"
      @click="$parent.$emit('click', id)">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VkNotificationMessage',
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    /* primary|success|warning|danger */
    status: {
      type: String,
      default: ''
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
  mounted () {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.$parent.$emit('timeout', this.id)
      }, this.timeout)
    }
  }
}
</script>
