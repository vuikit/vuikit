import Icon from './pagination--icon-next'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { elements as IconElements } from 'vuikit/src/icon'

const { ElIcon } = IconElements

export default {
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    expanded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners }) {
    const { title, expanded, disabled } = props

    delete data.on

    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled,
        'uk-margin-auto-left': expanded
      }
    }), [
      h('a', { on: listeners }, [
        title,
        h(ElIcon, {
          class: ['uk-pagination-prev', {
            'uk-margin-small-left': title
          }]
        }, [ h(Icon) ])
      ])
    ])
  }
}
