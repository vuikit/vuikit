import { ElSelect } from '../elements'

import { get } from '@vuikit/core/utils/misc'
import { assign } from '@vuikit/core/utils/lang'
import { mergeData } from '@vuikit/core/utils/vue'

export default assign({}, ElSelect, {
  name: 'VkFormSelect',
  props: ['value'],
  render (h, { props, data, children }) {

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input

      delete data.on.input
      data.on.change = e => {
        const selectedVal = Array.prototype.filter
          .call(e.target.options, opt => opt.selected)
          .map(opt => '_value' in opt ? opt._value : opt.value)

        const selected = e.target.multiple
          ? selectedVal
          : selectedVal[0]

        callback(selected)
      }
    }

    return h(ElSelect, mergeData(data, {
      props,
      // using v-model as it does some magic
      // to set the options selection properly
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: props.value
      }]
    }), children)
  }
})
