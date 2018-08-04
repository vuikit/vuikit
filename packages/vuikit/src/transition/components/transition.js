import { css } from 'vuikit/src/_core/utils/style'
import { isObject } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

const animationPrefix = 'uk-animation-'

export default {
  functional: true,
  props: {
    name: {
      type: [String, Object]
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
    const { origin } = props
    const animation = coerce(props.name)
    const duration = coerce(props.duration)

    let cls = ''

    // if (duration === 'fast') {
    //   cls += ` ${animationPrefix}fast`
    // }

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
        enterActiveClass: `${animationPrefix}${animation.enter}${cls}`,
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: `${animationPrefix}${animation.leave} uk-animation-reverse${cls}`,
        leaveToClass: ''
      },
      on: {
        beforeEnter (el) {
          setDuration(el, animation.enter ? duration.enter : 0)
        },
        beforeLeave (el) {
          setDuration(el, animation.leave ? duration.leave : 0)
        },
        afterEnter: reset,
        afterLeave: reset
      }
    }), children)

    function setDuration (el, duration) {
      css(el, 'animationDuration', `${duration}ms`)
    }

    function reset (el) {
      css(el, 'animationDuration', '')
    }

    function coerce (obj) {
      return isObject(obj) ? obj : { enter: obj, leave: obj }
    }
  }
}
