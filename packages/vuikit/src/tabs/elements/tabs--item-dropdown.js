import { mergeData } from 'vuikit/src/_core/utils/vue'

import IconMore from '@vuikit/icons/lib/more'
import IconTriangeDown from '@vuikit/icons/lib/triangle-down'
import { elements as IconElements } from 'vuikit/src/icon'

const { ElIcon } = IconElements

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
        title || h(ElIcon, [ h(IconMore) ]),
        title && h(ElIcon, {
          class: 'uk-margin-small-left'
        }, [
          h(IconTriangeDown)
        ])
      ]),
      children
    ])
  }
}
