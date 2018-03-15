import Icon from './assets/icon-prev'
import { mergeData } from 'vuikit/src/util/vue'
import ElementIcon from 'vuikit/src/components/icon/elements/icon'

export default {
  functional: true,
  props: {
    label: {
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
    const { label, expanded, disabled } = props

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
            'uk-margin-small-right': label
          }]
        }, [ h(Icon) ]),
        label && label
      ])
    ])
  }
}
