<template>
  <transition
    :css="false"
    @enter="transitionEnd"
    @leave="transitionEnd"
    @before-enter="beforeShow"
    @after-enter="afterEnter"
    @before-leave="beforeHide"
    @after-leave="hidden">
    <div
      v-show="show"
      class="uk-offcanvas"
      style="display: block;">
      <div v-if="mode === 'reveal'"
        :class="[clsMode]">
        <div ref="panel" class="uk-offcanvas-bar" :class="{
          'uk-offcanvas-bar-flip': flip
        }">
          <slot></slot>
        </div>
      </div>
      <div v-else ref="panel" class="uk-offcanvas-bar" :class="{
        'uk-offcanvas-bar-flip': flip
      }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalMixin from '~/mixins/modal'
import { warn } from '~/helpers/debug'
import { on, addClass, removeClass, css } from '@vuikit/util'
import { forceRedraw, toMs } from '~/helpers/util'

const doc = document.documentElement
const body = document.body
let scroll

export default {
  name: 'Offcanvas',
  mixins: [ModalMixin],
  props: {
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'slide' // none|slide|push|reveal
    }
  },
  data: () => ({
    defaults: {
      clsMode: 'uk-offcanvas',
      clsFlip: 'uk-offcanvas-flip',
      clsOverlay: 'uk-offcanvas-overlay',
      clsSidebarAnimation: 'uk-offcanvas-bar-animation',
      clsContentAnimation: 'uk-offcanvas-content-animation'
    },
    clsPage: 'uk-offcanvas-page',
    clsPageAnimation: 'uk-offcanvas-page-animation',
    clsContainer: 'uk-offcanvas-container',
    clsContent: 'uk-offcanvas-content'
  }),
  computed: {
    clsFlip () {
      return this.flip
        ? this.defaults.clsFlip
        : ''
    },
    clsOverlay () {
      return this.overlay
        ? this.defaults.clsOverlay
        : ''
    },
    clsMode () {
      return `${this.defaults.clsMode}-${this.mode}`
    },
    clsSidebarAnimation () {
      return this.mode === 'none' || this.mode === 'reveal'
        ? ''
        : this.defaults.clsSidebarAnimation
    },
    clsContentAnimation () {
      return this.mode !== 'push' && this.mode !== 'reveal'
        ? ''
        : this.defaults.clsContentAnimation
    },
    transitionElement () {
      return this.mode === 'reveal'
        ? this.$refs.panel.parentNode
        : this.$refs.panel
    },
    transitionDuration () {
      return toMs(css(this.transitionElement, 'transition-duration'))
    }
  },
  methods: {
    afterEnter (el) {
      this._afterEnter()
      this.$emit('displayed')
    },
    getRefElement (ref) {
      const context = this.$vnode.context
      const target = context.$refs[ref]
      if (target) {
        return target._isVue
          ? target.$el
          : target
      }
      return false
    },
    beforeShow () {
      scroll = scroll || { x: window.pageXOffset, y: window.pageYOffset }

      css(doc, 'overflow-y', (!this.clsContentAnimation || this.flip) && this.getScrollbarWidth() && this.overlay ? 'scroll' : '')

      // set fixed with so the page can slide-out without shinking
      css(doc, 'width', window.innerWidth - this.getScrollbarWidth() + 'px')

      addClass(doc, `${this.clsPage}`)
      addClass(body, `${this.clsContainer} ${this.clsFlip} ${this.clsOverlay}`)
      forceRedraw(body)

      addClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.mode !== 'reveal' ? this.clsMode : ''}`)
      addClass(this.$el, this.clsOverlay)
      addClass(this.$refs.content, this.clsContentAnimation)

      // toggle element
      addClass(this.$el, this.clsOverlay)
      css(this.$el, 'display', 'block')
      forceRedraw(this.$el)
      addClass(this.$el, 'uk-open')
    },
    beforeHide () {
      removeClass(this.$refs.content, this.clsContentAnimation)
      removeClass(this.$el, 'uk-open')
    },
    transitionEnd: function (el, done) {
      setTimeout(done, this.transitionDuration)
    },
    hidden () {
      if (!this.overlay) {
        scroll = { x: window.pageXOffset, y: window.pageYOffset }
      }

      css(doc, 'width', '')
      removeClass(doc, `${this.clsPage}`)

      removeClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.clsMode}`)
      removeClass(this.$el, this.clsOverlay)
      css(this.$el, 'display', 'none')
      forceRedraw(this.$el)
      removeClass(body, `${this.clsContainer} ${this.clsFlip} ${this.clsOverlay}`)

      body.scrollTop = scroll.y

      css(doc, 'overflow-y', '')
      css(this.$refs.content, 'width', '')
      css(this.$refs.content, 'height', '')
      forceRedraw(this.$refs.content)

      window.scrollTo(scroll.x, scroll.y)
      scroll = null

      this._afterLeave()
      this.$emit('hidden')
    }
  },
  mounted () {
    this.$refs.content = document.body.querySelector(`.${this.clsContent}`)

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap it with OffcanvasContent.', this)
      this.$destroy()
      return
    }

    const clickHandler = e => {
      if (e.target === this.$refs.panel || this.$refs.panel.contains(e.target)) {
        this.$emit('click-in', e)
      }
    }

    on(this.$el, 'click', clickHandler, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid)
    }
  },
  beforeDestroy () {
    removeClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageOverlay}`)
    doc.style['margin-left'] = ''
    this._afterLeave()
  }
}
</script>
