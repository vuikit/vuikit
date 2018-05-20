import { ElInput } from '../elements'

import { get } from '@vuikit/core/utils/misc'
import { assign } from '@vuikit/core/utils/lang'
import { mergeData } from '@vuikit/core/utils/vue'

export default assign({}, ElInput, {
  name: 'VkFormInput',
  props: ['value'],
  render (h, { props, data }) {

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input

      // override input
      data.on.input = e => {
        if (e.target.composing) return
        callback(e.target.value)
      }
    }

    return h(ElInput, mergeData(data, {
      props,
      domProps: {
        value: props.value
      }
    }))
  }
})
