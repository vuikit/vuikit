import { mergeData } from 'vuikit/src/_core/utils/vue'
import { ElIcon } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    icon: {},
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners, children }) {
    const { active, disabled, title, icon } = props

    delete data.on

    return h('li', mergeData(data, {
      class: {
        'uk-active': active && !disabled,
        'uk-disabled': disabled
      }
    }), [
      h('a', { on: listeners }, [
        title,
        icon && h(ElIcon, {
          class: 'uk-margin-small-left'
        }, [ icon ])
      ]),
      children
    ])
  }
}
