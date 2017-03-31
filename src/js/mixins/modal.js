import { on, offAll } from 'src/js/util/index'

const doc = document.documentElement
const body = document.body

let active
let activeCount

on(doc, 'click', e => {
  if (active && !active.$refs.panel.contains(e.target)) {
    active.$emit('click-out', e)
  }
})

on(doc, 'keyup', e => {
  if (e.keyCode === 27 && active) {
    e.preventDefault()
    active.$emit('key-esc', e)
  }
})

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    active,
    activeCount
  }),
  mounted () {
    // move dom to body
    body.appendChild(this.$el)
  },
  methods: {
    _beforeEnter () {
      if (!active) {
        body.style['overflow-y'] = this.getScrollbarWidth() && this.overlay ? 'scroll' : ''
      }
    },
    _afterEnter () {
      // if any previous modal active
      // emit event for further actions
      if (active) {
        active.$emit('inactive')
      }
      // change current active modal
      active = this
      activeCount++
    },
    _afterLeave () {
      activeCount--
      // if no active modals left
      if (!activeCount) {
        body.style['overflow-y'] = ''
      }
      if (active === this) {
        active = null
      }
    },
    getScrollbarWidth () {
      const width = doc.style.width
      doc.style.width = ''
      const scrollbarWidth = window.innerWidth - doc.offsetWidth

      if (width) {
        doc.style.width = width
      }

      return scrollbarWidth
    }
  },
  beforeDestroy () {
    offAll(this._uid)
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
