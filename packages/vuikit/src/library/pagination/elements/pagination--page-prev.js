import Icon from './pagination--icon-prev'
import { mergeData } from 'vuikit/src/util/vue'
import { ElementIcon } from 'vuikit/src/library/icon'

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
        'uk-margin-auto-right': expanded
      }
    }), [
      h('a', { on: listeners }, [
        h(ElementIcon, {
          class: ['uk-pagination-prev', {
            'uk-margin-small-right': title
          }]
        }, [ h(Icon) ]),
        title
      ])
    ])
  }
}
