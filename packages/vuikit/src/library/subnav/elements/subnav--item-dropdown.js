import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { disabled, title } = props

    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled
      }
    }), [
      disabled
        ? h('span', title)
        : children
    ])
  }
}
