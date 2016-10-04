import Popper from 'popper.js'
import { on, offAll, transitionEndEvent } from '../helpers/dom'

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
    const tooltipElement = this.$el
    const targetElement = tooltipElement.parentNode
    this.targetElement = targetElement

    onMouseEnter = () => {
      document.body.appendChild(tooltipElement)
      this.active = true
      this.$emit('show')
      new Popper(targetElement, tooltipElement, this.popperOptions)
        .onCreate(data => { this.flipped = data.flipped })
        .onUpdate(data => { this.flipped = data.flipped })
    }

    onMouseLeave = () => {
      let onTransitionEnd = () => {
        offAll(tooltipElement, this._uid)
        if (tooltipElement.parentNode && !tooltipElement.classList.contains('uk-active')) {
          document.body.removeChild(tooltipElement)
          this.$emit('hide')
        }
      }
      this.active = false
      on(tooltipElement, transitionEndEvent, onTransitionEnd)
    }

    on(targetElement, 'mouseenter', onMouseEnter, this._uid)
    on(targetElement, 'focus', onMouseEnter, this._uid)
    on(targetElement, 'mouseleave', onMouseLeave, this._uid)
    on(targetElement, 'blur', onMouseLeave, this._uid)

    // remove tooltip from dom at start
    targetElement.removeChild(tooltipElement)
  },
  beforeDestroy () {
    this.active = false
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el)
    }
    if (this.targetElement) {
      offAll(this.targetElement, this._uid)
    }
  }
}
