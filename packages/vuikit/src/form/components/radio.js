import { ElRadio } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'

export default assign({}, ElRadio, {
  name: 'VkFormRadio',
  props: {
    label: String
  },
  render (h, { props, data, _q: looseEqual }) {
    const { label } = props
    const { attrs = {} } = data

    data.domProps = {
      checked: attrs.checked
    }

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input

      // override input
      data.on.input = e => {
        callback(e.target.value)
      }

      if (data.model) {
        data.domProps.checked = looseEqual(data.model.value, attrs.value)
      }
    }

    const radio = h(ElRadio, data)

    if (label) {
      return h('label', [
        radio,
        ` ${label}`
      ])
    }

    return radio
  }
})
