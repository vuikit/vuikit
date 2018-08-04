import { VkRadioEl } from '../elements'

import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, get } from 'vuikit/src/_core/utils/object'

export default assign({}, VkRadioEl, {
  props: {
    label: String
  },
  render (h, { props, data, _q: looseEqual }) {
    const { label } = props
    const { attrs = {} } = data

    const def = mergeData({}, data, {
      domProps: {
        checked: attrs.checked
      }
    })

    // workaround for v-model/@input support
    if (get(def, 'on.input')) {
      const callback = def.on.input

      // override input
      def.on.input = e => {
        callback(e.target.value)
      }

      if (def.model) {
        def.domProps.checked = looseEqual(def.model.value, attrs.value)
      }
    }

    const radio = h(VkRadioEl, def)

    if (label) {
      return h('label', [
        radio,
        ` ${label}`
      ])
    }

    return radio
  }
})
