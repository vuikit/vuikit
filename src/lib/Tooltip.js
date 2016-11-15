import Popper from 'popper.js'
import { on, offAll } from '../helpers/dom'

let onMouseEnter
let onMouseLeave

const POSITION_MIRROR = {
  top: 'bottom',
  right: 'left',
  left: 'right',
  bottom: 'top'
}

export default {
  props: {
    target: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    offset: {
      type: String,
      default: '0 5'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    active: false,
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
    },
    classes () {
      const placement = this.placement.split('-')
      let position = placement[0]
      if (this.flipped) {
        position = POSITION_MIRROR[placement[0]]
      }
      if (placement[1]) {
        position += '-' + placement[1]
          .replace('start', 'left')
          .replace('end', 'right')
      }
      return {
        'uk-active': this.active,
        [`uk-tooltip-${position}`]: true
      }
    }
  },
  render (h) {
    return (
      <div staticClass="uk-tooltip" class={ this.classes } style={{
        'transition-delay': this.delay + 'ms'
      }}>
        <div class="uk-tooltip-inner">
          { this.$slots.default }
        </div>
      </div>
    )
  },
  mounted () {
    // save the target reference
    this.$targetElement = this.target
      ? this.$vnode.context.$refs[this.target] || document.querySelector(this.target)
      : this.$el.parentNode

    onMouseEnter = () => {
      document.body.appendChild(this.$el)
      this.active = true
      this.$emit('show')
      new Popper(this.$targetElement, this.$el, this.popperOptions)
        .onCreate(data => { this.flipped = data.flipped })
        .onUpdate(data => { this.flipped = data.flipped })
    }

    onMouseLeave = () => {
      this.active = false
      offAll(this.$el, this._uid)
      this.remove()
      this.$emit('hide')
    }

    on(this.$targetElement, 'mouseenter', onMouseEnter, this._uid)
    on(this.$targetElement, 'focus', onMouseEnter, this._uid)
    on(this.$targetElement, 'mouseleave', onMouseLeave, this._uid)
    on(this.$targetElement, 'blur', onMouseLeave, this._uid)

    // remove tooltip from dom at start
    this.remove()
  },
  beforeDestroy () {
    if (this.$targetElement) {
      offAll(this.$targetElement, this._uid)
    }
    this.active = false
    this.remove()
  },
  methods: {
    remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
}
