import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { center, primary } = props

    return h('ul', mergeData(data, {
      class: ['uk-nav', {
        'uk-nav-center': center,
        'uk-nav-default': !primary,
        'uk-nav-primary': primary
      }]
    }), children)

  }
}
