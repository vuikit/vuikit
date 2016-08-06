<template>
  <transition name="vk-modal"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave">
    <div class="uk-modal" v-show="show" v-keep-display>
      <div ref="dialog" :class="{
        'uk-modal-dialog': true,
        'uk-modal-dialog-large': large,
        'uk-modal-dialog-lightbox': lightbox,
        'uk-modal-dialog-blank': blank
      }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { debounce } from 'lodash'
import { on, offAll, css, addClass, removeClass } from './helpers/dom'

// active modal ref
let currentlyActive
let activeCount

export default {
  name: 'VkModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // vertically center the modal
    center: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    // avoids style.display being removed by v-show
    keepDisplay: {
      update (el) {
        el.style.display = 'block'
      }
    }
  },
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
    afterEnter () {
      if (currentlyActive) {
        currentlyActive.$emit('inactive')
      }
      currentlyActive = this
    },
    beforeLeave () {
      removeClass(this.$el, 'uk-open')
      currentlyActive = null
    },
    afterLeave () {
      const html = document.documentElement
      const body = document.body
      activeCount > 0
        ? activeCount--
        : activeCount = 0
      if (!activeCount) {
        removeClass(html, 'uk-modal-page')
        body.style[this.paddingDir] = ''
      }
      if (currentlyActive === this) {
        currentlyActive = false
      }
    },
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
          event.preventDefault()
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
      const dialog = this.$refs.dialog
      body.style[this.paddingDir] = scrollbarWidth
      this.$el.style['overflow-y'] = scrollbarWidth
        ? 'scroll'
        : 'auto'
      if (this.center) {
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
      } else {
        dialog.style.top = ''
      }
    }
  },
  watch: {
    show (state) {
      if (state) {
        const html = document.documentElement
        this.$nextTick(() => {
          this.resize(true)
          addClass(this.$el, 'uk-open')
          addClass(html, 'uk-modal-page')
        })
      }
    }
  },
  beforeDestroy () {
    offAll(this._uid)
  }
}
</script>
