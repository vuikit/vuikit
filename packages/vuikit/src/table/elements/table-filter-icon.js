import IconClose from '@vuikit/icons/close'
import IconSearch from '@vuikit/icons/search'
import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props }) {
    return h('a', mergeData(data, {
      class: 'uk-icon uk-form-icon'
    }), [
      props.active
        ? h(IconClose)
        : h(IconSearch)
    ])
  }
}
