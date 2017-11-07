import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  render: (h, { children, data }) =>
    h('ul', mergeData(data, { class: 'uk-iconnav uk-iconnav-vertical' }), children)
}
