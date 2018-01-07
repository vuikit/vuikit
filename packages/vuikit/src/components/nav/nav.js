import mergeData from 'vuikit/core/helpers/vue-data-merge'

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
  render (h, { props, children, data }) {
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
