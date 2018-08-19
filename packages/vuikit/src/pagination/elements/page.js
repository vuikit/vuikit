import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    text: {
      type: Number
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, data }) => {
    const { active, text } = props
    const { on, ...def } = data

    return h('li', mergeData(def, {
      class: {
        'uk-active': active
      }
    }), [
      active
        ? h('span', text)
        : h('a', { on }, text)
    ])
  }
}
