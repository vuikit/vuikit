import { mergeData } from 'vuikit/src/_core/utils/vue'
import { setDuration, reset, coerceProps } from '../util'

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
    const { animation, duration } = coerceProps(props)

    const cls = {
      enter: `uk-animation-${animation.enter}`,
      leave: `uk-animation-${animation.leave} uk-animation-reverse`
    }

    if (origin) {
      cls.enter += ` uk-transform-origin-${origin}`
      cls.leave += ` uk-transform-origin-${origin}`
    }

    if (duration.enter === 'fast') {
      cls.enter += ` uk-animation-fast`
      duration.enter = undefined
    }

    if (duration.leave === 'fast') {
      cls.leave += ` uk-animation-fast`
      duration.leave = undefined
    }

    return h('transition', mergeData({
      on: listeners
    }, {
      props: {
        mode: props.mode,
        type: 'animation',
        enterClass: '',
        enterActiveClass: cls.enter,
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: cls.leave,
        leaveToClass: ''
      },
      on: {
        beforeEnter (el) {
          if (duration.enter !== undefined) {
            setDuration(el, duration.enter)
          }
        },
        beforeLeave (el) {
          if (duration.leave !== undefined) {
            setDuration(el, duration.leave)
          }
        },
        afterEnter: reset,
        afterLeave: reset
      }
    }), children)
  }
}
