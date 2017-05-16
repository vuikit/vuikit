import svg from './svg'
const icons = {}

export default {
  functional: true,
  props: ['icon', 'link', 'ratio'],
  render (h, { props, data, listeners }) {
    const isLink = props.link !== undefined
    const icon = icons[props.icon]

    if (icon) {
      return h(isLink ? 'a' : 'span', {
        class: 'uk-icon',
        on: listeners,
        attrs: {
          href: isLink ? '' : false,
          icon: null,
          ratio: null
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
    }
  },
  register (icon) {
    if (!icons[icon.name]) {
      icons[icon.name] = icon
    }
  }
}
