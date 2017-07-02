import Svg from '../icon/svg'
import Icon from 'icons/components/spinner'

export default {
  name: 'VkSpinner',
  functional: true,
  props: {
    ratio: {
      default: 1
    }
  },
  render (h, { props }) {
    const { ratio } = props

    // dimensions
    let width = Icon.width
    let height = Icon.height

    // ratio
    if (ratio !== 1) {
      width = width * ratio
      height = height * ratio
    }

    return h('div', {
      staticClass: 'uk-spinner uk-icon'
    }, [
      h(Svg, {
        props: {
          ...Icon,
          width,
          height
        }
      })
    ])
  }
}
