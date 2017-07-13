import { warn, isString } from '@vuikit/util/es'
import svg from './svg'
const icons = {}

export default {
  functional: true,
  props: {
    icon: {
      type: [String, Object],
      required: true
    },
    link: {
      type: Boolean,
      default: false
    },
    linkReset: {
      type: Boolean,
      default: false
    },
    ratio: {
      default: 1
    },
    button: {
      type: Boolean,
      default: false
    },
    viewBox: String,
    width: Number,
    height: Number
  },
  render (h, { props, data, listeners }) {
    const { icon, ratio, link, linkReset, button } = props
    const iconObj = isString(icon)
      ? icons[icon]
      : icon

    if (!iconObj) {
      warn(`the icon '${icon}' is not registered`)
      return
    }

    // determine tag
    const tag = link || linkReset || button
      ? 'a'
      : 'span'

    // add custom class
    data.class = ['uk-icon', data.class, {
      'uk-icon-button': button,
      'uk-icon-link': linkReset
    }]

    // dimensions
    let width = props.width || iconObj.width
    let height = props.height || iconObj.height
    const viewBox = props.viewBox || iconObj.viewBox

    // ratio
    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h(tag, {
      on: listeners,
      attrs: {
        href: tag === 'a'
          ? ''
          : false
      },
      ...data
    }, [
      h(svg, {
        props: {
          meta: `icon-${iconObj.name} ratio-${ratio}`,
          data: iconObj.data,
          viewBox,
          width,
          height
        }
      })
    ])
  },
  register (iconObj) {
    if (!icons[iconObj.name]) {
      icons[iconObj.name] = iconObj
    }
  }
}
