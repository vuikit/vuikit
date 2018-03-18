import IconMore from 'vuikit/src/icons/more'
import IconTriangeDown from 'vuikit/src/icons/triangle-down'
import { mergeData } from 'vuikit/src/util/vue'

import { ElementIcon } from 'vuikit/src/library/icon'

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
        title || h(ElementIcon, [ h(IconMore) ]),
        title && h(ElementIcon, {
          class: 'uk-margin-small-left'
        }, [
          h(IconTriangeDown)
        ])
      ]),
      children
    ])
  }
}
