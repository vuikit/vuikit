import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  render (h, { children, data, props }) {
    const { show } = props

    return h('div', mergeData(data, {
      class: {
        'uk-open': show
      },
      style: {
        display: show ? 'block' : null
      }
    }), children)
  }
}
