import { VkInputEl } from '../elements'

import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, get } from 'vuikit/src/_core/utils/object'

export default assign({}, VkInputEl, {
  props: ['value'],
  render (h, { props, data }) {
    const def = mergeData({}, data, {
      props,
      domProps: {
        value: props.value
      }
    })

    // workaround for v-model/@input support
    if (get(def, 'on.input')) {
      const callback = def.on.input

      // override input
      def.on.input = e => {
        if (e.target.composing) return
        callback(e.target.value)
      }
    }

    return h(VkInputEl, def)
  }
})
