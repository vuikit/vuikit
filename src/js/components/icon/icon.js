import svg from './svg'
const icons = {}

export default {
  functional: true,
  render (h, { props, data, listeners }) {
    const isLink = props.link !== undefined
    const icon = icons[props.icon]

    if (icon) {
      return h(isLink ? 'a' : 'span', {
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
    if (!icons[icon.name]) {
      icons[icon.name] = icon
    }
  }
}
