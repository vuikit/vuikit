import { mergeData } from 'vuikit/src/util/vue'
import { renderSlots } from './_common'

export default {
  functional: true,
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, slots }) {
    const { expanded, transparent } = props

    return h('nav', mergeData(data, {
      class: 'uk-navbar-container'
    }), [
      h('div', {
        class: ['uk-container', {
          'uk-container-expand': expanded
        }]
      }, [
        h('div', {
          class: ['uk-navbar', {
            'uk-navbar-transparent': transparent
          }]
        }, renderSlots(h, slots()))
      ])
    ])
  }
}
