<template>
  <transition :name="transition">
    <div class="uk-notification-message"
      :class="classes"
      @click="$parent.$emit('click', id)">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationMessage',
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
  computed: {
    classes () {
      const cls = {}
      cls[`uk-notification-message-${this.status}`] = this.status

      return cls
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
