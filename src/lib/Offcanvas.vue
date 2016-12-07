<template>
  <transition
    :name="transition"
    @beforeEnter="beforeEnter"
    @beforeLeave="beforeLeave">
    <div v-show="show" class="uk-offcanvas"
      @click="e => {
        if (e.target !== this.$el && this.$el.contains(e.target)) {
          this.$emit('clickIn', e)
        } else {
          this.$emit('clickOut', e)
        }
      }">
      <div ref="bar" class="uk-offcanvas-bar" :class="{
        'uk-offcanvas-bar-flip': flip
      }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { on, offAll, addClass, removeClass } from '../helpers/dom'

const html = document.documentElement
const body = document.body
let scrollPos = {}

export default {
  name: 'VkOffcanvas',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-offcanvas-transition'
    }
  },
  methods: {
    beforeEnter () {
      // save scroll position before applying any transition
      scrollPos = { x: window.pageXOffset, y: window.pageYOffset }
      // apply transitions on nextTick as the bar offsetWidth
      // will return 0 if is not displayed
      this.$nextTick(() => {
        const scrollbarWidth = window.innerWidth - body.offsetWidth
        addClass(body, 'uk-offcanvas-page')
        addClass(body, 'uk-offcanvas-page-open')
        setBodyMargin(this.flip, this.$refs.bar.offsetWidth)
        body.style.width = window.innerWidth - scrollbarWidth + 'px'
        body.style.height = window.innerHeight + 'px'
        body.offsetHeight // force redraw
        // apply margin in order to emulate the
        // scroll position despite fixed display
        html.style['margin-top'] = scrollPos.y * -1 + 'px'
      })
    },
    beforeLeave () {
      // trigger transitons
      removeClass(body, 'uk-offcanvas-page-open')
      body.style['margin-left'] = ''
      body.style['margin-right'] = ''
    },
    afterLeave () {
      // reset all to previous state
      removeClass(body, 'uk-offcanvas-page')
      body.style.width = ''
      body.style.height = ''
      html.style['margin-top'] = ''
      window.scrollTo(scrollPos.x, scrollPos.y)
    }
  },
  mounted () {
    // keyboard events
    on(document, 'keyup', e => {
      if (this.show && e.keyCode === 27) {
        e.preventDefault()
        this.$emit('keyEsc', e)
      }
    }, this._uid)
  },
  beforeDestroy () {
    offAll(this._uid)
  }
}

function setBodyMargin (flip, barWidth) {
  const lngDir = html.getAttribute('dir') === 'rtl'
    ? 'right'
    : 'left'
  const rtl = lngDir === 'right'
  const dir = (flip ? -1 : 1) * (rtl ? -1 : 1)
  const margin = (rtl ? -1 : 1) * (barWidth * dir)
  body.style[rtl ? 'margin-right' : 'margin-left'] = margin + 'px'
}
</script>
