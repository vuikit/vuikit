import VkIconLink from '../icon/icon-link'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  render (h, { props, data }) {
    const { active, icon } = props

    return h('li', { class: { 'uk-active': active } }, [

      h(VkIconLink, mergeData(data, {
        props: { name: icon }
      }))

    ])

  }
}
