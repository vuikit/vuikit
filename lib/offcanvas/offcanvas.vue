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
import { on, addClass, removeClass } from 'helpers/dom'
import ModalMixin from 'lib/_mixins/modal'
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
      addClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageAnimation} ${this.clsPageOverlay}`)
      addClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.clsMode}`)
      addClass(this.$el, this.clsOverlay)
      this.$el.style.display = 'block'
      this.$el.offsetHeight // force redraw
    },
    afterEnter () {
      this._afterEnter()
      addClass(this.$el, 'uk-open')
      this._afterEnter()
    },
    beforeLeave () {
      removeClass(doc, this.clsPageAnimation)
      doc.style['margin-left'] = ''
      removeClass(this.$el, 'uk-open')

      // if (this.mode === 'none' || this.getActive() && this.getActive() !== this) {
      //     this.panel.trigger(transitionend);
      // }
    },
    afterLeave () {
      this._afterLeave()
      removeClass(doc, `${this.clsPage} ${this.clsFlip} ${this.clsPageOverlay}`)
      removeClass(this.$refs.panel, `${this.clsSidebarAnimation} ${this.clsMode}`)
      removeClass(this.$el, `${this.clsOverlay}`)
      this.$el.style.display = ''
      this.$el.offsetHeight // force redraw
    }
  },
  mounted () {
    const clickHandler = e => {
      if (e.target === this.$refs.panel || this.$refs.panel.contains(e.target)) {
        this.$emit('clickIn', e)
      }
    }

    on(this.$el, 'click', clickHandler, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(this.$el, 'touchstart', clickHandler, this._uid)
    }
  }
}
</script>
