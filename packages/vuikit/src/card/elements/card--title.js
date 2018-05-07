import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'h3'
    }
  },
  render (h, { props, data, children }) {
    return h(props.tag, mergeData(data, {
      class: 'uk-card-title'
    }), children)
  }
}
