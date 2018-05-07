import { mergeData } from '@vuikit/utils/vue'
import { ElIcon } from 'vuikit/src/icon'
import IconChevronDown from '@vuikit/icons/chevron-down'

export default {
  functional: true,
  props: ['title'],
  render (h, { data, props }) {
    return h('a', mergeData(data, {
      class: 'uk-link uk-link-reset uk-display-inline'
    }), [
      props.title,
      h(ElIcon, [
        h(IconChevronDown, {
          props: { ratio: 0.8, width: 18, height: 18 }
        })
      ])
    ])
  }
}
