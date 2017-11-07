import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  render (h, { props, children, data }) {

    return h('h3', mergeData(data, { class: 'uk-card-title' }), children)

  }
}
