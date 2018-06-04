import { ElCheckbox } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default assign({}, ElCheckbox, {
  name: 'VkFormCheckbox',
  props: {
    label: String
  },
  render (h, { props, data, _q: looseEqual, _i: looseIndexOf }) {
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
      delete def.on.input

      const trueValue = get(attrs, 'true-value', true)
      const falseValue = get(attrs, 'false-value', false)

      def.on.change = e => {
        callback()
      }

      if (def.model) {
        let toggle = def.model.value

        def.domProps = {
          checked: Array.isArray(toggle)
            ? looseIndexOf(toggle, null) > -1
            : looseEqual(toggle, trueValue)
        }

        def.on.change = $event => {
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

    const checkbox = h(ElCheckbox, def)

    if (label) {
      return h('label', [
        checkbox,
        ` ${label}`
      ])
    }

    return checkbox
  }
})
