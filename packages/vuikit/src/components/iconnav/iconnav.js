import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  render: (h, { children, data }) =>
    h('ul', mergeData(data, { class: 'uk-iconnav' }), children)
}
