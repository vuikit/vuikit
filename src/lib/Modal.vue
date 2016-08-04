<template>
  <div :class="{
    'uk-modal': true,
    'uk-open': show
  }"
  :style="{
    display: show
      ? 'block'
      : 'none'
  }"
  :aria-hidden="show
    ? 'false'
    : 'true'
  ">
    <div ref="dialog" :class="{
        'uk-modal-dialog': true,
        'uk-modal-dialog-large': large
      }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { on, offAll, css, addClass, removeClass } from './helpers/dom'

// the active modal ref
let currentlyActive

export default {
  name: 'VkModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    // vertically center the modal
    center: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    boundEvents: []
  }),
  computed: {
    languageDir () {
      const html = document.documentElement
      return html.getAttribute('dir') === 'rtl'
        ? 'right'
        : 'left'
    },
    paddingDir () {
      return 'padding-' + (this.languageDir === 'left'
        ? 'right'
        : 'left')
    }
  },
  mounted () {
    this.initEvents()
  },
  methods: {
    // just a shortcut to avoid setting up
    // the namespace all the time
    on (el, event, handler) {
      on(el, event, handler, this._uid)
    },
    initEvents () {
      // window events
      const windowEvents = ['resize', 'orientationchange']
      const windowHandler = debounce(event => {
        this.resize()
      }, 150)
      for (let i = 0; i < windowEvents.length; ++i) {
        this.on(window, windowEvents[i], windowHandler)
      }
      // keyboard events
      this.on(document, 'keyup', (event) => {
        if (this.show && event.keyCode === 27) {
          this.$emit('keyEsc')
        }
      })
      // click events
      let clickEvents = ['click']
      if ('ontouchstart' in document.documentElement) {
        clickEvents.push('touchstart')
      }
      const clickHandler = event => {
        // click in/out modal dialog
        if (event.target === this.$refs.dialog || this.$refs.dialog.contains(event.target)) {
          this.$emit('clickIn', event)
        } else {
          this.$emit('clickOut', event)
        }
      }
      for (let i = 0; i < clickEvents.length; ++i) {
        this.on(this.$el, clickEvents[i], clickHandler)
      }
    },
    resize (force) {
      if (!this.show && !force) {
        return
      }

      const body = document.body
      const bodyWidth = body.offsetWidth
      const scrollbarWidth = window.innerWidth - bodyWidth

      body.style[this.paddingDir] = scrollbarWidth
      this.$el.style['overflow-y'] = scrollbarWidth
        ? 'scroll'
        : 'auto'

      if (this.center) {
        const dialog = this.$refs.dialog
        const dh = dialog.offsetHeight
        const marginTop = css(dialog, 'margin-top')
        const marginBottom = css(dialog, 'margin-bottom')
        const pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10)

        if ((dh + pad) < window.innerHeight) {
          const top = (window.innerHeight / 2 - dh / 2) - pad
          dialog.style.top = `${top}px`
        } else {
          dialog.style.top = ''
        }
      }
    }
  },
  watch: {
    show (state) {
      const html = document.documentElement
      const body = document.body
      if (state) {
        if (currentlyActive) {
          currentlyActive.$emit('inactive')
        }
        currentlyActive = this
        addClass(html, 'uk-modal-page')
        this.$nextTick(() => this.resize(true))
      } else {
        removeClass(html, 'uk-modal-page')
        body.style[this.paddingDir] = ''
        currentlyActive = null
      }
    }
  },
  beforeDestroy () {
    offAll(this._uid)
  }
}
</script>
