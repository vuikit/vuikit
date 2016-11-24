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
  render (h) {
    const directives = [{
      name: 'show', value: this.show
    }]
    return (
      <transition
        name={ this.transition }
        onBeforeEnter={ this.onBeforeEnter }
        onBeforeLeave={ this.onBeforeLeave }
        afterLeave={ this.onAfterLeave }>
        <div {...{ directives }} staticClass="uk-offcanvas"
          aria-hidden={ this.show
            ? 'false'
            : 'true'
          }
          on-click={e => {
            if (e.target !== this.$el && this.$el.contains(e.target)) {
              this.$emit('clickIn', e)
            } else {
              this.$emit('clickOut', e)
            }
          }}>
          <div ref="bar" staticClass="uk-offcanvas-bar" class={{
            'uk-offcanvas-bar-flip': this.flip
          }}>
            { this.$slots.default }
          </div>
        </div>
      </transition>
    )
  },
  methods: {
    onBeforeEnter () {
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
    onBeforeLeave () {
      // trigger transitons
      removeClass(body, 'uk-offcanvas-page-open')
      body.style['margin-left'] = ''
      body.style['margin-right'] = ''
    },
    onAfterLeave () {
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
