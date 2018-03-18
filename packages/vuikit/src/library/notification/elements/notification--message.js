import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    status: {
      type: String,
      default: '',
      validator: val => !val || /^(primary|success|warning|danger)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { status } = props

    return h('div', mergeData(data, {
      class: ['uk-notification-message', {
        [`uk-notification-message-${status}`]: status
      }]
    }), children)
  }
}
