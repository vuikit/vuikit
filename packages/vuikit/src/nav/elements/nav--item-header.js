import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render (h, { data, props }) {
    return h('li', mergeData(data, {
      class: 'uk-nav-header'
    }), props.title)
  }
}
