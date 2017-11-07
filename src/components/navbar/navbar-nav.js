import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  render (h, { children, data }) {

    return h('ul', mergeData(data, { class: 'uk-navbar-nav' }), children)

  }
}
