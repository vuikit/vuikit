import { warn } from 'vuikit/src/util/debug'
import { query } from 'vuikit/src/util/selector'

import { events } from '../transitions/_common'
import { ElementOffcanvas, ElementOffcanvasBar } from '../elements'

import TransitionNone from '../transitions/none'
import TransitionPush from '../transitions/push'
import TransitionSlide from '../transitions/slide'
import TransitionReveal from '../transitions/reveal'

const Transitions = {
  none: TransitionNone,
  push: TransitionPush,
  slide: TransitionSlide,
  reveal: TransitionReveal
}

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flipped: {
      type: Boolean,
      default: false
    },
    stuck: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide',
      validator: val => /^(none|slide|push|reveal)$/.test(val)
    }
  },
  mounted () {
    this.$refs.content = query('.uk-offcanvas-content')
    this.$refs.bar = this.$el.querySelector('.uk-offcanvas-bar')

    if (process.env.NODE_ENV !== 'production' && !this.$refs.content) {
      warn('Offcanvas content element not detected -> make sure to wrap the offcanvas content with `vk-offcanvas-content` component or a custom `.uk-offcanvas-content` node.', this)
    }

    this.$el.__vkOffcanvas = this
  },
  beforeDestroy () {
    if (this.show) {
      events.afterLeave(this.$el)
    }
  },
  render (h) {
    const nodes = this.$slots.default || []

    // bar could be provided from the outside
    const customBar = findBar(nodes)
    const bar = customBar || h(ElementOffcanvasBar, nodes)

    const content = h(ElementOffcanvas, {
      key: this.mode,
      class: {
        'uk-offcanvas-overlay': this.overlay
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      this.mode === 'reveal'
        ? h('div', {
          class: 'uk-offcanvas-reveal',
          ref: 'reveal'
        }, [ bar ])
        : bar
    ])

    return h(Transitions[this.mode], [ content ])
  }
}

function findBar (nodes) {
  return nodes
    .filter(n => n.tag && n.data && /offcanvas-bar/.test(getNodeClass(n)))[0]
}

function getNodeClass (node) {
  return [...(node.data.class || []), node.data.staticClass].join(' ')
}
