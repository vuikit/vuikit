import { warn } from 'src/js/util'
import svg from './svg'
const icons = {}

export default {
  functional: true,
  props: ['icon', 'link', 'ratio'],
  render (h, { props, data, listeners }) {
    const isLink = props.link !== undefined
    const icon = icons[props.icon]

    if (!icon) {
      warn(`VkIcon: the icon '${props.icon}' is not registered`)
      return
    }

    // add class
    data.class = ['uk-icon', data.class]

    return h(isLink ? 'a' : 'span', {
      on: listeners,
      attrs: {
        href: isLink ? '' : false
      },
      ...data
    }, [
      h(svg, {
        props: {
          ...icon,
          ratio: props.ratio
        }
      })
    ])
  },
  register (icon) {
    if (!icons[icon.name]) {
      icons[icon.name] = icon
    }
  }
}
