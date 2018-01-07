import mergeData from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  render (h, { props, data }) {
    const { active, disabled, label } = props

    return h('li', mergeData(data, { class: {
      'uk-active': active && !disabled,
      'uk-disabled': disabled
    } }), [

      h('a', label)

    ])

  }
}
