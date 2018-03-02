import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('a', mergeData(data, {
      class: 'uk-navbar-item uk-logo'
    }), children)
  }
}
