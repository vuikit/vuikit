import MessageDirective from './directive'
import MessageTransition from './transition'

import ElementNotificationMessage from './elements/notification-message'
import ElementNotification from './elements/notification'
import ElementNotificationClose from './elements/notification-close'

import { warn, tip } from 'vuikit/src/util/debug'
import { isObject, isString, assign, get } from 'vuikit/src/util/lang'

export default {
  name: 'VkNotification',
  directives: {
    MessageDirective
  },
  props: assign({}, ElementNotification.props, {
    timeout: {
      type: Number,
      default: 5000
    },
    messages: {
      type: Array,
      default: () => [],
      validator: val => {
        if (!val.every(m => isObject(m) || isString(m))) {
          warn('vk-notification -> each message is expected as Object or String')
          return false
        }

        return true
      }
    },
    status: ElementNotificationMessage.props.status
  }),
  computed: {
    $messages () {
      let messages = this.messages.map(val => {
        let msg = isString(val) ? { message: val } : val
        return assign({ status: this.status, timeout: this.timeout }, msg)
      })

      messages = this.removeDuplicates(messages)

      return messages
    }
  },
  methods: {
    triggerRemove (index) {
      const messages = [...this.$messages]
      messages.splice(index, 1)

      this.$emit('update:messages', messages)
    },
    removeDuplicates (values) {
      const messages = []

      const isDuplicated = msg => messages.find(m => {
        return this.getMessageId(m) === this.getMessageId(msg)
      })

      for (let i = 0; i < values.length; i++) {
        if (isDuplicated(values[i])) {
          tip('vk-notification -> duplicate messages are filtered out, consider adding a unique `key` to those.')
          continue
        }

        messages.push(values[i])
      }

      return messages
    },
    getMessageId (msg) {
      const validKeys = ['message', 'status', 'key', 'timeout']

      return Object.keys(msg)
        .filter(k => validKeys.find(k => k))
        .map(k => msg[k])
        .join(':')
    }
  },
  render (h) {
    const { position } = this

    const MessageSlot = get(this, '$scopedSlots.default', msg => msg.message)

    return h(ElementNotification, {
      props: { position }
    }, [
      h(MessageTransition, [
        this.$messages.map((msg, index) =>
          h(ElementNotificationMessage, {
            key: this.getMessageId(msg),
            props: msg,
            directives: [{
              name: 'message-directive',
              value: msg
            }],
            on: {
              close: () => this.triggerRemove(index)
            }
          }, [
            MessageSlot(msg),
            h(ElementNotificationClose)
          ])
        )
      ])
    ])
  }
}
