import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { transparent } = props

    return h('div', mergeData(data, {
      class: ['uk-navbar-container', {
        'uk-navbar-transparent': transparent
      }]
    }), children)
  }
}
