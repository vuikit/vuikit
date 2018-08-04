import { mergeData } from 'vuikit/src/_core/utils/vue'

import IconMore from '@vuikit/icons/lib/more'
import IconTriangeDown from '@vuikit/icons/lib/triangle-down'
import { VkIconEl } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    title: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners, children }) {
    const { title, active, disabled } = props

    delete data.on

    return h('li', mergeData(data, {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }), [
      h('a', [
        title || h(VkIconEl, [ h(IconMore) ]),
        title && h(VkIconEl, {
          class: 'uk-margin-small-left'
        }, [
          h(IconTriangeDown)
        ])
      ]),
      children
    ])
  }
}
