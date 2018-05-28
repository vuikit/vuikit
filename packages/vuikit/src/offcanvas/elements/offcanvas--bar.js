import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    animated: Boolean
  },
  render (h, { props, data, children }) {
    const { animated } = props

    return h('div', mergeData(data, {
      class: ['uk-offcanvas-bar', {
        'uk-offcanvas-bar-animation': animated
      }]
    }), children)
  }
}
