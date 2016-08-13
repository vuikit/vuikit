import { debounce } from 'lodash'
import { on, offAll, css, addClass, removeClass } from '../helpers/dom'
import render from './render'

// active modal ref
let currentlyActive
let activeCount

export default {
  name: 'VkModal',
  render,
  props: {
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
  computed: {
    isOpen () {
      // return v-show directive value
      const data = this.$vnode.data
      const show = data.directives && data.directives.find(dir => dir.name === 'show')
      return !data.directives || !show
        ? false
        : show.value
    },
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
    beforeEnter () {
      const html = document.documentElement
      this.$nextTick(() => {
        addClass(this.$el, 'uk-open')
        addClass(html, 'uk-modal-page')
        this.resize(true)
      })
    },
    afterEnter () {
      if (currentlyActive) {
        currentlyActive.$emit('inactive')
      }
      currentlyActive = this
    },
    beforeLeave () {
      removeClass(this.$el, 'uk-open')
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
    // the namespace every time
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
        if (this.isOpen && event.keyCode === 27) {
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
      if (!this.isOpen && !force) {
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
  beforeDestroy () {
    offAll(this._uid)
  }
}
