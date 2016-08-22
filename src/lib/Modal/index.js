import { on, offAll } from '../../helpers/dom'
import render from './render'

export default {
  name: 'VkModal',
  render,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-modal-transition'
    }
  },
  mounted () {
    // init click events
    const dialog = this.$el.childNodes[0]
    const clickEvents = ['click']
    if ('ontouchstart' in document.documentElement) {
      clickEvents.push('touchstart')
    }
    const clickHandler = event => {
      // click in/out modal dialog
      if (event.target === dialog || dialog.contains(event.target)) {
        this.$emit('clickIn', event)
      } else {
        this.$emit('clickOut', event)
      }
    }
    for (let i = 0; i < clickEvents.length; ++i) {
      on(this.$el, clickEvents[i], clickHandler, this._uid)
    }
  },
  beforeDestroy () {
    offAll(this._uid)
  }
}
