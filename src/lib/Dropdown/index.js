import Dropdown from './Dropdown.vue'
import { merge } from 'lodash'

export default {
  name: 'VkDropdown',
  functional: true,
  render (h, { slots, data }) {
    const $slots = slots()
    if ($slots.target) {
      return [
        $slots.target,
        h(Dropdown, merge(data, {
          attrs: {
            target: $slots.target[0]
          }
        }), () => $slots.default)
      ]
    } else {
      return h(Dropdown, data, () => $slots.default)
    }
  }
}
