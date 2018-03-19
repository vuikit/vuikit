import { mergeData } from 'vuikit/src/util/vue'
import { renderSlots } from './_common'

export default {
  functional: true,
  props: {
    container: {
      type: Boolean,
      default: true
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, slots }) {
    const { container, transparent } = props

    return h('nav', mergeData(data, {
      class: ['uk-navbar', {
        'uk-navbar-container': container && !transparent,
        'uk-navbar-transparent': transparent
      }]
    }), renderSlots(h, slots()))
  }
}
