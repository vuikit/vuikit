import { css } from 'vuikit/src/_core/utils/style'
import { isObject } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

const animationPrefix = 'uk-animation-'

export default {
  name: 'VkTransition',
  functional: true,
  props: {
    name: {
      type: [String, Object],
      required: true
    },
    duration: {
      type: [Number, String],
      validator: val => !val || /^(fast|\d*)$/.test(val)
    },
    origin: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'out-in'
    }
  },
  render (h, { props, listeners, children }) {
    const { name, duration, origin } = props
    const { enter, leave } = isObject(name) ? name : { enter: name, leave: name }

    let cls = ''

    if (duration === 'fast') {
      cls += ` ${animationPrefix}fast`
    }

    if (origin) {
      cls += ` uk-transform-origin-${origin}`
    }

    return h('transition', mergeData({
      on: listeners
    }, {
      props: {
        mode: props.mode,
        type: 'animation',
        enterClass: '',
        enterActiveClass: `${animationPrefix}${enter}${cls}`,
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: `${animationPrefix}${leave} uk-animation-reverse${cls}`,
        leaveToClass: ''
      },
      on: {
        beforeEnter: setDuration,
        beforeLeave: setDuration,
        afterEnter: reset,
        afterLeave: reset
      }
    }), children)

    function setDuration (el) {
      css(el, 'animationDuration', `${duration}ms`)
    }

    function reset (el) {
      css(el, 'animationDuration', '')
    }
  }
}
