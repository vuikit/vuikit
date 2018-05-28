import { ElRange } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'

export default assign({}, ElRange, {
  name: 'VkFormRange',
  props: ['value'],
  render (h, { props, data, _n: toNumber }) {
    data.domProps = {
      value: props.value
    }

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input
      const number = get(data, 'model.modifiers.number')

      // override events
      delete data.on.input
      delete data.model
      data.on.__r = e => {
        callback(number
          ? toNumber(e.target.value)
          : e.target.value
        )
      }
    }

    return h(ElRange, data)
  }
})
