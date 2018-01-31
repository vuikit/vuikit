import { on, off, one } from 'vuikit/core/util/dom/event'
import { addClass, removeClass } from 'vuikit/core/util/class'

const doc = document.documentElement

let active
let activeModals

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // determines if the modal should be closed
    // when a key is pressed. Accepts a key number,
    // or false to disable
    closeOnKey: {
      type: [Number, Boolean],
      default: 27 // esc key
    },
    // determines if the modal should be closed
    // when the background is clicked
    closeOnBg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    beforeEnter () {
      addClass(doc, 'uk-modal-page')
    },
    enter (el, done) {
      // redraw workaround, necessary so the browser
      // doesn't try to apply it all in one step, not
      // giving enough time for the transition to init
      el.offsetWidth // eslint-disable-line

      // once uk-open transition finished
      one(el, 'transitionend', done, e => e.target === el)

      // fix for appear transition,
      // force it to be executed right after
      setTimeout(() => addClass(el, 'uk-open'), 0)
    },
    afterEnter () {
      activeModals++

      if (active) {
        // close any active modal
        active.$emit('update:show', false)
      }

      // change current active modal
      active = this
    },
    beforeLeave (el) {
      removeClass(el, 'uk-open')
    },
    leave (el, done) {
      // once uk-open transition finished
      one(el, 'transitionend', done, e => e.target === el)
    },
    afterLeave () {
      activeModals--

      if (!activeModals) {
        // remove page class if not active modals left
        removeClass(doc, 'uk-modal-page')
      }

      // if the closing modal is the active one,
      // unset it
      if (active === this) {
        active = null
      }
    }
  },
  mounted () {
    // append modal at $root as the styles
    // could be scoped to the app dom
    this.$root.$el.appendChild(this.$el)

    on(doc, 'keyup', e => {
      if (this.closeOnKey && e.keyCode === this.closeOnKey) {
        e.preventDefault()
        this.$emit('update:show', false)
      }
    }, this._uid)
  },
  beforeDestroy () {
    off(doc, 'key', this._uid)
    off(window, 'resize', this._uid)

    // if a page holding a modal is destroyed
    // there is no time for graceful hiding,
    // thus we must force it
    this.$root.$el.removeChild(this.$el)
    this.afterLeave()
  }
}
