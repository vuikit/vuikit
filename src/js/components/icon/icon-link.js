import icons from './icons'
import svg from './svg'

export default {
  functional: true,
  render (h, { props, data, listeners }) {
    const icon = icons.get(props.icon)

    if (icon) {
      return h('a', {
        ...data,
        class: 'uk-icon',
        on: listeners
      }, [
        h(svg, {
          props: icon
        })
      ])
    }
  },
  register (icon) {
    icons.register(icon)
  }
}
