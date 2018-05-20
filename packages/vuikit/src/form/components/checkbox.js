import { ElCheckbox } from '../elements'

import { get } from '@vuikit/core/utils/misc'
import { assign } from '@vuikit/core/utils/lang'

export default assign({}, ElCheckbox, {
  name: 'VkFormCheckbox',
  props: {
    label: String
  },
  render (h, { props, data, _q: looseEqual, _i: looseIndexOf }) {
    const { label } = props
    const { attrs = {} } = data

    data.domProps = {
      checked: attrs.checked
    }

    // workaround for v-model/@input support
    if (get(data, 'on.input')) {
      const callback = data.on.input
      delete data.on.input

      const trueValue = get(attrs, 'true-value', true)
      const falseValue = get(attrs, 'false-value', false)

      data.on.change = e => {
        callback()
      }

      if (data.model) {
        let toggle = data.model.value

        data.domProps = {
          checked: Array.isArray(toggle)
            ? looseIndexOf(toggle, null) > -1
            : looseEqual(toggle, trueValue)
        }

        data.on.change = $event => {
          const $$a = toggle
          const $$el = $event.target
          const $$c = $$el.checked ? trueValue : falseValue

          if (Array.isArray($$a)) {
            const $$v = null
            const $$i = looseIndexOf($$a, $$v)

            if ($$el.checked) {
              $$i < 0 && (toggle = $$a.concat([ $$v ]))
            } else {
              $$i > -1 && (toggle = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            toggle = $$c
          }

          callback(toggle)
        }
      }
    }

    const checkbox = h(ElCheckbox, data)

    if (label) {
      return h('label', [
        checkbox,
        ` ${label}`
      ])
    }

    return checkbox
  }
})
