import Dropdown from './Dropdown.vue'
import { merge } from 'lodash'

export default {
  name: 'VkDropdown',
  functional: true,
  render (h, { slots, data }) {
    const $slots = slots()
    if ($slots.trigger) {
      return [
        $slots.trigger,
        h(Dropdown, merge(data, {
          attrs: {
            target: $slots.trigger[0]
          }
        }), () => $slots.default)
      ]
    } else {
      return h(Dropdown, data, () => $slots.default)
    }
  }
}
