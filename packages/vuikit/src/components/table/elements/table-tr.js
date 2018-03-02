import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { active } = props

    return h('tr', mergeData(data, {
      class: {
        'uk-active': active
      }
    }), children)
  }
}
