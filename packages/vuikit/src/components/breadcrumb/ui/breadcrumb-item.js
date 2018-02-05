import mergeData from 'vuikit/src/util/vue-data-merge'

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
  render: (h, { props, data }) => {
    const { title, active, disabled } = props

    return h('li', mergeData(data, {
      class: {
        'uk-active': active,
        'uk-disabled': disabled
      }
    }), [
      h(disabled || active ? 'span' : 'a', title)
    ])
  }
}
