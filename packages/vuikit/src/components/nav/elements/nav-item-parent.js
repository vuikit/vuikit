import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    href: true,
    target: true,
    title: {
      type: String,
      required: true
    }
  },
  render (h, { props, data, children }) {
    const { title, href, target } = props

    return h('li', mergeData(data, {
      class: 'uk-parent'
    }), [
      h('a', {
        attrs: { href, target }
      }, [ title ]),
      h('ul', {
        class: 'uk-nav-sub'
      }, children)
    ])
  }
}
