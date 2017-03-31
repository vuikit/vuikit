<template>
  <transition
    enter-to-class="uk-open"
    leave-active-class="uk-offcanvas-bar-animation"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave">
    <div v-show="show"
      class="uk-offcanvas"
      style="display: block;">
      <div ref="panel" class="uk-offcanvas-bar" :class="{
        'uk-offcanvas-bar-flip': flip
      }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalMixin from 'lib/mixins/modal'
import { on, addClass, removeClass } from 'src/js/util/index'

const doc = document.documentElement

export default {
  name: 'VkOffcanvas',
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
      default: 'slide'
    }
  },
  data: () => ({
    clsPage: 'uk-offcanvas-page',
    clsFlip: 'uk-offcanvas-flip',
    clsPageAnimation: 'uk-offcanvas-page-animation',
    clsSidebarAnimation: 'uk-offcanvas-bar-animation',
    clsMode: 'uk-offcanvas',
    clsOverlay: 'uk-offcanvas-overlay',
    clsPageOverlay: 'uk-offcanvas-page-overlay'
  }),
  created () {
    this.clsFlip = this.flip ? this.clsFlip : ''
    this.clsOverlay = this.overlay ? this.clsOverlay : ''
    this.clsPageOverlay = this.overlay ? this.clsPageOverlay : ''
    this.clsMode = `${this.clsMode}-${this.mode}`

    if (this.mode === 'none' || this.mode === 'reveal') {
      this.clsSidebarAnimation = ''
    }
    if (this.mode !== 'push' && this.mode !== 'reveal') {
      this.clsPageAnimation = ''
    }
  },
  methods: {
    beforeEnter () {
      this._beforeEnter()
      // set fixed with so the page can slide-out without shinking
      doc.style.width = window.innerWidth - this.getScrollbarWidth() + 'px'
      // add page classes
      addClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageOverlay}`)
      // add offcanvas style
      addClass(this.$el, this.clsOverlay)
      this.$el.style.display = 'block'
      // add offcanvas-bar classes
      addClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.clsMode}`)
    },
    afterEnter () {
      this._afterEnter()
      addClass(doc, this.clsPageAnimation)
      addClass(this.$el, 'uk-open')
    },
    beforeLeave () {
      removeClass(doc, this.clsPageAnimation)
      doc.style['margin-left'] = ''
      removeClass(this.$el, 'uk-open')
    },
    afterLeave () {
      this._afterLeave()
      doc.style.width = ''
      removeClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageOverlay}`)
      removeClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.clsMode}`)
      removeClass(this.$el, `${this.clsOverlay}`)
      this.$el.style.display = ''
    }
  },
  mounted () {
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
    removeClass(doc, this.clsPageAnimation)
    removeClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageOverlay}`)
    doc.style['margin-left'] = ''
    this._afterLeave()
  }
}
</script>
