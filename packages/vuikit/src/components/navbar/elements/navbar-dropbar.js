import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    slide: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    const { slide } = props

    return h('div', mergeData(data, {
      class: ['uk-navbar-dropbar', {
        'uk-navbar-dropbar-slide': slide
      }]
    }))
  }
}
