import mergeData from 'vuikit/src/util/vue-data-merge'

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

    const def = {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }

    return h('li', mergeData(data, def), [
      h('a', label)
    ])
  }
}
