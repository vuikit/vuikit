import Popper from 'popper.js'
import { on, offAll } from '../helpers/dom'

let onClick
let onTargetClick
let onMouseEnter
let onMouseLeave

export default {
  name: 'VkDropdown',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    blank: {
      type: Boolean,
      default: false
    },
    fixWidth: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    offset: {
      type: String,
      default: '0 5'
    }
  },
  data: () => ({
    flipped: false
  }),
  computed: {
    popperOptions () {
      return {
        placement: this.placement,
        modifiers: {
          offset: {
            offset: this.offset
          }
        }
      }
    }
  },
  render (h) {
    const directives = [{
      name: 'show', value: this.show
    }]
    return (
      <transition name={ this.transition }>
        <div {...{ directives }} class={{
          'uk-dropdown': !this.blank,
          'uk-dropdown-blank': this.blank,
          'uk-dropdown-small': !this.fixWidth,
          'uk-dropdown-scrollable': this.scrollable
        }}
        aria-hidden={ this.show
          ? 'false'
          : 'true'
        }>
          { this.$slots.default }
        </div>
      </transition>
    )
  },
  watch: {
    show () {
      new Popper(this.$targetElement, this.$el, this.popperOptions)
        .onCreate(data => { this.flipped = data.flipped })
        .onUpdate(data => { this.flipped = data.flipped })
    }
  },
  mounted () {
    // save the target reference
    this.$targetElement = this.target
      ? this.$vnode.context.$refs[this.target] || document.querySelector(this.target)
      : this.$el.parentNode
    // init popper
    document.body.appendChild(this.$el)

    onTargetClick = event => {
      this.$emit('targetClick', event)
    }

    onMouseEnter = event => {
      // ignore childs triggers
      if (this.$targetElement.contains(event.fromElement)) {
        return
      }
      this.$emit('targetHoverIn', event)
    }

    onMouseLeave = event => {
      // ignore childs triggers
      if (event.relatedTarget === this.$targetElement || this.$targetElement.contains(event.relatedTarget)) {
        return
      }
      this.$emit('targetHoverOut', event)
    }

    onClick = event => {
      if (this.show) {
        // clicking target
        if (event.target === this.$targetElement || this.$targetElement.contains(event.target)) {
          return
        }
        // click in/out dropdown
        if (event.target === this.$el || this.$el.contains(event.target)) {
          this.$emit('clickIn', event)
        } else {
          this.$emit('clickOut', event)
        }
      }
    }

    on(this.$targetElement, 'mouseenter', onMouseEnter, this._uid)
    on(this.$targetElement, 'mouseleave', onMouseLeave, this._uid)
    on(this.$targetElement, 'click', onTargetClick, this._uid)
    on(document, 'click', onClick, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClick, this._uid)
    }
  },
  methods: {
    remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  beforeDestroy () {
    offAll(this._uid)
    this.remove()
  }
}
