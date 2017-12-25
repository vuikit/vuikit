import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  render (h, { props, children, data }) {

    return h('h3', mergeData(data, { class: 'uk-card-title' }), children)

  }
}
