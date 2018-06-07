import { warn, tip } from 'vuikit/src/_core/utils/debug'
import { assign, get } from 'vuikit/src/_core/utils/object'
import { isObject, isString } from 'vuikit/src/_core/utils/lang'

import MessageDirective from '../directives/message'
import MessageTransition from '../transition'

import { ElNotification, ElNotificationMessage, ElNotificationClose } from '../elements'

export default {
  name: 'VkNotification',
  directives: { MessageDirective },
  props: assign({}, ElNotification.props, {
    timeout: {
      type: Number,
      default: 5000
    },
    messages: {
      type: Array,
      default: () => [],
      validator: val => {
        if (!val.every(m => isObject(m) || isString(m))) {
          if (process.env.NODE_ENV !== 'production') {
            warn('[VkNotification]: Each message is expected as Object or String')
          }
          return false
        }

        return true
      }
    },
    status: ElNotificationMessage.props.status
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
    // similar to debounce this fn will delay it execution
    // every time is invoked. A workaround for edge situtions
    // where triggers are invoked on the same time
    triggerRemove (msg) {
      this.closeQueue = this.closeQueue || []
      this.closeQueue.push(msg)

      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        const queue = [...this.closeQueue]
        const messages = [...this.$messages]

        // allow for new triggers to get in queue
        this.closeQueue = []

        queue.forEach(msg => {
          const index = messages.indexOf(messages.filter(m => m === msg)[0])
          messages.splice(index, 1)
        })

        this.$emit('update:messages', messages)
      })
    },
    removeDuplicates (values) {
      const messages = []

      const isDuplicated = msg => messages.filter(m =>
        this.getMessageId(m) === this.getMessageId(msg)
      ).length

      for (let i = 0; i < values.length; i++) {
        if (isDuplicated(values[i])) {
          if (process.env.NODE_ENV !== 'production') {
            tip('[VkNotification]: Duplicate messages are filtered out, consider adding a unique `key` to those.')
          }
          continue
        }

        messages.push(values[i])
      }

      return messages
    },
    getMessageId (msg) {
      const validKeys = ['message', 'status', 'key', 'timeout']

      return Object.keys(msg)
        .filter(k => validKeys.filter(k => k)[0])
        .map(k => msg[k])
        .join(':')
    }
  },
  render (h) {
    const { position } = this

    const MessageSlot = get(this, '$scopedSlots.default', msg => msg.message)

    return h(ElNotification, {
      props: { position }
    }, [
      h(MessageTransition, [
        this.$messages.map((msg, index) =>
          h(ElNotificationMessage, {
            key: this.getMessageId(msg),
            props: msg,
            directives: [{
              name: 'message-directive',
              value: msg
            }],
            on: {
              close: () => this.triggerRemove(msg)
            }
          }, [
            MessageSlot(msg),
            h(ElNotificationClose)
          ])
        )
      ])
    ])
  }
}
