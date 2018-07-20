import { mergeData } from 'vuikit/src/_core/utils/vue'
import IconTriangeDown from '@vuikit/icons/lib/triangle-down'

export default {
  functional: true,
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { disabled, title } = props

    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled
      }
    }), [
      disabled
        ? [ h('span', title) ]
        : [
          h('a', { class: 'uk-icon' }, [
            title + ' ',
            h(IconTriangeDown)
          ]),
          children
        ]
    ])
  }
}
