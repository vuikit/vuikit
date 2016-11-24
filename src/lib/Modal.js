import { on, offAll, addClass, removeClass, css } from '../helpers/dom'
import { debounce } from 'lodash'

const html = document.documentElement
const body = document.body
const lngDir = html.getAttribute('dir') === 'rtl'
  ? 'right'
  : 'left'
const paddingDir = 'padding-' + (lngDir === 'left'
  ? 'right'
  : 'left')

let active
let activeCount

// init global events
const events = ['resize', 'orientationchange']
for (let i = 0; i < events.length; ++i) {
  on(window, events[i], debounce(e =>
    active && active.resize(),
  150))
}

on(document, 'keyup', e => {
  if (active && e.keyCode === 27) {
    e.preventDefault()
    active.$emit('keyEsc')
  }
})

export default {
  name: 'VkModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
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
    },
    transition: {
      type: String,
      default: 'vk-modal-transition'
    }
  },
  render (h) {
    const directives = [{
      name: 'show', value: this.show
    }]
    return (
      <transition
        name={ this.transition }
        onBeforeEnter={ this.onBeforeEnter }
        onAfterEnter={ this.onAfterEnter }
        onBeforeLeave={ this.onBeforeLeave }
        onAfterLeave={ this.onAfterLeave }>
        <div staticClass="uk-modal" {...{ directives }}
        style="display: block;"
        aria-hidden={ this.show
          ? 'false'
          : 'true'
        }>
          <div ref="dialog" staticClass="uk-modal-dialog" class={{
            'uk-modal-dialog-large': this.large,
            'uk-modal-dialog-lightbox': this.lightbox,
            'uk-modal-dialog-blank': this.blank
          }}>
            { this.$slots.default }
          </div>
        </div>
      </transition>
    )
  },
  mounted () {
    // init events
    const clickHandler = event => {
      const dialog = this.$refs.dialog
      // click in/out modal dialog
      if (event.target === dialog || dialog.contains(event.target)) {
        this.$emit('clickIn', event)
      } else {
        this.$emit('clickOut', event)
      }
    }

    on(this.$el, 'click', clickHandler, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid)
    }

    // move dom to body
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    offAll(this._uid)
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    onBeforeEnter () {
      this.$nextTick(() => {
        addClass(html, 'uk-modal-page')
        this.resize()
      })
    },
    onAfterEnter () {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive')
      }
      // change current active modal
      active = this
      activeCount++
    },
    onBeforeLeave () {
    },
    onAfterLeave () {
      activeCount--
      // if no active modals left
      if (!activeCount) {
        removeClass(html, 'uk-modal-page')
        body.style[paddingDir] = ''
      }
      if (active === this) {
        active = null
      }
    },
    resize () {
      const bodyWidth = body.offsetWidth
      const dialog = this.$refs.dialog
      const scrollbarWidth = window.innerWidth - bodyWidth
      body.style[paddingDir] = scrollbarWidth
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
  }
}
