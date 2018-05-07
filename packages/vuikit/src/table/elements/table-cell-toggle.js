import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    return h('span', mergeData(data, {
      class: ['vk-table-column-toggle', {
        'vk-table-column-toggle--success': props.state
      }]
    }))
  }
}
