import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
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
    },
    icon: {}
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
        icon && h('span', {
          class: 'uk-icon uk-margin-small-left'
        }, [ icon ])
      ]),
      children
    ])
  }
}
