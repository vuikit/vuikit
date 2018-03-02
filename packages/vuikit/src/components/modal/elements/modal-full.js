import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render (h, { children, data, props }) {
    return h('div', mergeData(data, {
      class: 'uk-modal uk-modal-full',
      style: {
        display: 'block'
      }
    }), children)
  }
}
