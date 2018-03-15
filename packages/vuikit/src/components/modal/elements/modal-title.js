import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
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
