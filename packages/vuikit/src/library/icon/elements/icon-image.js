import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    src: {
      type: String,
      required: true
    }
  },
  render (h, { data, props }) {
    const { src } = props

    return h('span', mergeData(data, {
      class: 'uk-icon uk-icon-image',
      style: {
        'background-image': `url(${src})`
      }
    }))
  }
}
