import VkIcon from '../icon/icon'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  render (h, { props, data }) {
    const { active, label, icon } = props

    return h('li', mergeData(data, { class: { 'uk-active': active } }), [

      h('a', [
        icon && h(VkIcon, {
          class: 'uk-margin-small-right',
          props: { icon }
        }),
        label
      ])

    ])

  }
}
