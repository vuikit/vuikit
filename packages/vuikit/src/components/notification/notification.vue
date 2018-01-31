<template>
  <div :class="[
    'uk-notification',
    `uk-notification-${this.position}`
  ]">
    <notification-message
      v-for="n in normalizedNfcs"
      :key="n.key || n.message"
      :status="n.status"
      :timeout="n.timeout"
      @click="remove(n)"
      @mouseenter="cancelTimeout(n)"
      @mouseleave="initTimeout(n)"
    >
      <slot :message="n.message">
        {{ n.message }}
      </slot>
    </notification-message>
  </div>
</template>

<script>
import NotificationMessage from './message'
import { warn } from 'vuikit/core/util/debug'
import { isObject, isInteger, isUndefined } from 'vuikit/core/util/lang'

const timeouts = {}
const defaultTimeout = 4500

const positions = [
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'top-left',
  'top-center',
  'top-right'
]

export default {
  name: 'Notification',
  components: {
    NotificationMessage
  },
  props: {
    notifications: {
      type: Array,
      default: () => []
    },
    position: {
      type: String,
      default: 'top-center',
      validator: pos => positions.indexOf(pos) !== -1
    }
  },
  computed: {
    normalizedNfcs () {
      return this.notifications.map(n => {
        if (!isObject(n)) {
          warn('The Notification value must be an Object')
          return
        }

        this.initTimeout(n)

        return n
      })
    }
  },
  methods: {
    remove (n) {
      const index = this.notifications.indexOf(n)

      if (index !== -1) {
        const notifications = [...this.notifications]
        notifications.splice(index, 1)

        this.$emit('update:notifications', notifications)
      }
    },
    initTimeout (n) {
      const timeout = n.timeout || defaultTimeout

      if (!isInteger(timeout)) {
        warn('Notification timeout is invalid')
      }

      const id = getId(n)
      const timeoutIsSet = !isUndefined(timeouts[id])
      const timeoutShouldBeSet = timeout > 0

      if (timeoutShouldBeSet && !timeoutIsSet) {
        const timeoutId = setTimeout(() => {
          this.remove(n)
          delete timeouts[id]
        }, timeout)

        timeouts[id] = timeoutId
      }
    },
    cancelTimeout (n) {
      const id = getId(n)
      const timeoutIsSet = !isUndefined(timeouts[id])

      if (timeoutIsSet) {
        clearTimeout(timeouts[id])
        delete timeouts[id]
      }
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el)
    }
  }
}

function getId (n) {
  const msg = n.message.replace(/ /g, '')
  const key = n.key || 'key'
  const timeout = n.timeout || 0

  return `${msg}-${key}-${timeout}`
}
</script>
