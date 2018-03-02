import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data }) {
    return h('li', mergeData(data, {
      class: 'uk-nav-divider'
    }))
  }
}
