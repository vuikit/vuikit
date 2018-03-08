import Element from './navbar'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { expanded } = props

    return h('nav', mergeData(data, {
      class: 'uk-navbar-container'
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-expand': expanded
        }]
      }, [
        h(Element, {
          props: {
            tag: 'div',
            container: false
          }
        }, children)
      ])
    ])
  }
}
