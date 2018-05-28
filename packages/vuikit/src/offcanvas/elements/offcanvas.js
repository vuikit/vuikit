import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    overlay: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { overlay } = props

    return h('div', mergeData(data, {
      class: ['uk-offcanvas', {
        'uk-offcanvas-overlay': overlay
      }],
      style: {
        display: 'block'
      }
    }), children)
  }
}
