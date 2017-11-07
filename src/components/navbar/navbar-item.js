import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  render (h, { children, data }) {

    return h('div', mergeData(data, { class: 'uk-navbar-item' }), children)

  }
}
