import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  render (h, { children, data }) {

    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)

  }
}
