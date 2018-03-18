import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    position: {
      type: String,
      default: 'top-center',
      validator: val => /^(top|bottom)-(left|center|right)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { position } = props

    return h('div', mergeData(data, {
      class: [
        'uk-notification',
        `uk-notification-${position}`
      ]
    }), children)
  }
}
