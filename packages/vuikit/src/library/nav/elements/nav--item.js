import { mergeData } from 'vuikit/src/util/vue'
import { ElementIcon } from 'vuikit/src/library/icon'

export default {
  functional: true,
  props: {
    icon: {},
    href: String,
    target: String,
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data }) {
    const { active, icon, title, href, target } = props

    let content = title

    if (icon) {
      content = [
        h(ElementIcon, {
          class: 'uk-margin-small-right'
        }, [ icon ]),
        h('span', {
          class: 'uk-text-middle'
        }, title)
      ]
    }

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href, target }
      }, content)
    ])
  }
}
