import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, data, listeners }) => {
    const { title, active, disabled } = props

    delete data.on

    return h('li', mergeData(data, {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }), [ disabled
      ? h('span', title)
      : h('a', { on: listeners }, title)
    ])
  }
}
