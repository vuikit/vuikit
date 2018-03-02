import { resolveSlots } from 'vuikit/src/util/vue'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    container: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'nav'
    }
  },
  render (h, { props, data, children }) {
    const { container, transparent, tag } = props

    const slots = resolveSlots(children)

    return h(tag, mergeData(data, {
      class: ['uk-navbar', {
        'uk-navbar-container': container,
        'uk-navbar-transparent': transparent
      }]
    }), [
      // left slot (default)
      (slots.left || slots.default) && h('div', { class: 'uk-navbar-left' }, [
        slots.left, slots.default
      ]),

      (slots.center || slots['center-left'] || slots['center-right']) && h('div', {
        class: 'uk-navbar-center'
      }, [
        // center-left slot
        slots['center-left'] && h('div', {
          class: 'uk-navbar-center-left'
        }, [ h('div', slots['center-left']) ]),
        // center slot
        slots.center && slots.center,
        // center-right slot
        slots['center-right'] && h('div', {
          class: 'uk-navbar-center-right'
        }, [ h('div', slots['center-right']) ])
      ]),

      // right slot
      slots.right && h('div', { class: 'uk-navbar-right' }, slots.right)
    ])
  }
}
