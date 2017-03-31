<template>
  <transition
    enter-to-class="uk-open"
    leave-class="uk-open"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div class="uk-modal"
      v-show="show"
      style="display: block;"
      :class="{
        'uk-modal-lightbox': lightbox,
        'uk-modal-container': container,
        'uk-modal-full': full
      }">
        <modal-content></modal-content>
    </div>
  </transition>
</template>

<script>
import { on, css, hasClass, addClass, removeClass } from 'src/js/util/index'
import ModalMixin from 'lib/mixins/modal'
const doc = document.documentElement

export default {
  name: 'VkModal',
  mixins: [ModalMixin],
  components: {
    'modal-content': {
      functional: true,
      render (h, { parent: vm }) {
        return vm.dialogIsOverriden
          ? vm.$slots.default
          : h('vk-modal-dialog', vm.$slots.default)
      }
    }
  },
  props: {
    center: {
      type: Boolean,
      default: false
    },
    container: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // if dialog is passed as slot is considered overriden
    dialogIsOverriden () {
      return this.$slots.default[0] &&
        this.$slots.default[0].data &&
        this.$slots.default[0].data.staticClass === 'uk-modal-dialog'
    }
  },
  mounted () {
    // execute transition hooks if visible on load
    if (this.show) {
      this.beforeEnter()
      this.afterEnter()
    }

    // set refs programatically
    this.$refs.panel = this.$el.querySelector('.uk-modal-dialog')
    this.$refs.close = this.$el.querySelector('button.uk-close')

    // place close-top outside the dialog
    if (this.$refs.close && hasClass(this.$refs.close, 'vk-modal-close-top')) {
      removeClass(this.$refs.close, 'vk-modal-close-top')
      const bar = document.createElement('div')
      addClass(bar, 'uk-modal-bar')
      addClass(bar, 'uk-position-top')
      bar.appendChild(this.$refs.close)
      this.$el.appendChild(bar)
    }

    // place caption bottom outside the dialog
    const caption = this.$el.querySelector('.vk-modal-caption-bottom')
    if (caption) {
      addClass(caption, 'uk-modal-bar')
      addClass(caption, 'uk-position-bottom')
      removeClass(caption, 'vk-modal-caption-bottom')
      this.$el.appendChild(caption)
    }

    // update close style if full
    if (this.full) {
      removeClass(this.$refs.close, 'uk-modal-close-default')
      addClass(this.$refs.close, 'uk-modal-close-full')
    }

    // init events
    const clickHandler = e => {
      if (e.target === this.$refs.panel || this.$refs.panel.contains(e.target)) {
        this.$emit('click-in', e)
      }
    }

    on(this.$el, 'click', clickHandler, this._uid)
    if ('ontouchstart' in doc) {
      on(this.$el, 'touchstart', clickHandler, this._uid)
    }
  },
  methods: {
    beforeEnter () {
      this._beforeEnter()
      this.$nextTick(() => {
        addClass(doc, 'uk-modal-page')
        this.resize()
      })
    },
    afterEnter () {
      this._afterEnter()
      addClass(this.$el, 'uk-open')
    },
    afterLeave () {
      this._afterLeave()
      // if no active modals left
      if (!this.activeCount) {
        removeClass(doc, 'uk-modal-page')
      }
    },
    resize () {
      if (css(this.$el, 'display') === 'block' && this.center) {
        removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle')

        const dialog = this.$refs.panel
        const dh = dialog.offsetHeight
        const marginTop = css(dialog, 'margin-top')
        const marginBottom = css(dialog, 'margin-bottom')
        const pad = parseInt(marginTop, 10) + parseInt(marginBottom, 10)

        if (window.innerHeight > (dh + pad)) {
          addClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle')
        } else {
          removeClass(this.$el, 'uk-flex uk-flex-center uk-flex-middle')
        }
        this.$el.style.display = hasClass(this.$el, 'uk-flex') ? '' : 'block'
      }
    }
  }
}
</script>
