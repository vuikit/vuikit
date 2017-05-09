import icons from './icons'
import svg from './svg'

export default {
  functional: true,
  render (h, { props, data, listeners }) {
    const icon = icons.get(props.icon)

    if (icon) {
      return h('span', {
        ...data,
        class: 'uk-icon',
        on: listeners
      }, [
        h(svg, {
          props: {
            ...icon,
            ratio: props.ratio
          }
        })
      ])
    }
  },
  register (icon) {
    icons.register(icon)
  }
}
