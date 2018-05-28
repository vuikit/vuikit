import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  name: 'ElModalTitle',
  props: {
    tag: {
      type: String,
      default: 'h2'
    }
  },
  render (h, { props, data, children }) {
    const { tag } = props

    return h(tag, mergeData(data, {
      class: 'uk-modal-title'
    }), children)
  }
}
