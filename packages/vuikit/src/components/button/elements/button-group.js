import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-button-group'
    }), children)
  }
}
