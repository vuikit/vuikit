import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    expand: {
      type: Boolean,
      default: false
    }
  },
  render (h, { children, data, props }) {
    const { expand } = props

    return h('div', mergeData(data, {
      class: ['uk-modal', {
        'uk-modal-container': expand
      }],
      style: {
        display: 'block'
      }
    }), children)
  }
}
