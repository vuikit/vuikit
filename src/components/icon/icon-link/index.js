import { merge } from '@vuikit/util'

export default {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners, children }) {
    // add static class now to avoid overrides
    data.class = ['uk-icon', data.class, {
      'uk-icon-link': props.reset
    }]

    const def = merge({}, { on: listeners }, data)

    return h('a', def, children)
  }
}
