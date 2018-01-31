import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data, children }) {

    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)

  }
}
