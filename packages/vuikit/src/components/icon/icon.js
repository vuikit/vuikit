import Element from './elements/icon'

export default {
  name: 'VkIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    viewBox: String,
    ratio: [String, Number],
    width: [String, Number],
    height: [String, Number]
  },
  render (h, { data, props, children }) {
    return h(Element, data, [
      h(`icon-${props.icon}`, { props })
    ])
  }
}
