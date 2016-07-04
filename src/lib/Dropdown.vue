<template>
  <div :class="{
      'uk-dropdown': !blank,
      'uk-dropdown-blank': blank,
      'uk-dropdown-small': !fixedWidth,
      'uk-dropdown-scrollable': scrollable
    }"
    :style="{
      display: show
        ? 'block'
        : 'none'
    }">
    <slot></slot>
  </div>
</template>

<script>
import Tether from 'tether'
import { merge } from 'lodash'

const MIRROR_ATTACH = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
  middle: 'middle',
  center: 'center'
}

const sortAttach = function (str) {
  let [first, second] = str.split(' ')
  if (['left', 'right'].indexOf(first) >= 0) {
    [first, second] = [second, first]
  }
  return [first, second].join(' ')
}

let clickEvents = ['click']
if ('ontouchstart' in document.documentElement) {
  clickEvents.push('touchstart')
}

export default {
  compiled () {
    this.setupEvents()
    this.initTether()
  },
  props: {
    target: {
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: true
    },
    openOn: {
      type: [String, Boolean],
      default: 'click' // hover, focus, always, false
    },
    position: {
      type: String,
      default: 'bottom left'
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    offset: {
      type: String,
      default: '0 0'
    },
    offsetTarget: {
      type: String,
      default: '0 0'
    },
    constrainToWindow: {
      type: Boolean,
      default: true
    },
    constrainToParent: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    // inherited from openDelay and closeDelay
    // if not explicitly defined
    focusDelay: {
      type: Number,
      default: 0
    },
    blurDelay: {
      type: Number,
      default: 0
    },
    hoverOpenDelay: {
      type: Number,
      default: 0
    },
    hoverCloseDelay: {
      type: Number,
      default: 0
    },
    tetherOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    boundEvents: []
  }),
  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
    toggle () {
      this.show = !this.show
    },
    repose () {
      if (this.show) {
        this.$tether.position()
      }
    },
    initTether () {
      let dropAttach = this.position.split(' ')
      dropAttach[0] = MIRROR_ATTACH[dropAttach[0]]
      dropAttach = dropAttach.join(' ')

      let constraints = []
      if (this.constrainToParent) {
        constraints.push({
          to: 'scrollParent',
          pin: 'top, bottom',
          attachment: 'together none'
        })
      } else {
        // To get 'out of bounds' classes
        constraints.push({
          to: 'scrollParent'
        })
      }

      if (this.constrainToWindow !== false) {
        constraints.push({
          to: 'window',
          attachment: 'together'
        })
      } else {
        // To get 'out of bounds' classes
        constraints.push({
          to: 'window'
        })
      }

      const opts = {
        element: this.$el,
        target: this.target,
        attachment: sortAttach(dropAttach),
        targetAttachment: sortAttach(this.position),
        classPrefix: 'vk-tether',
        offset: this.offset,
        targetOffset: this.offsetTarget,
        enabled: this.show,
        constraints,
        addTargetClasses: false
      }

      this.$tether = new Tether(merge({}, opts, this.tetherOptions))
    },
    setupEvents () {
      if (!this.openOn) {
        return
      }
      if (this.openOn === 'always') {
        // dont't delay execution
        // by using setTimeout
        setTimeout(this.open())
        return
      }
      const events = this.openOn.split(' ')
      // Click Events
      if (events.indexOf('click') >= 0) {
        const openHandler = (event) => {
          this.toggle()
          event.preventDefault()
        }
        const closeHandler = (event) => {
          if (!this.show) {
            return
          }
          // Clicking inside dropdown
          if (event.target === this.$el || this.$el.contains(event.target)) {
            return
          }
          // Clicking target
          if (event.target === this.target || this.target.contains(event.target)) {
            return
          }
          this.show = false
        }
        for (let i = 0; i < clickEvents.length; ++i) {
          const clickEvent = clickEvents[i]
          this._on(this.target, clickEvent, openHandler)
          this._on(document, clickEvent, closeHandler)
        }
      }
      // InOut Events
      let inTimeout = null
      let outTimeout = null
      const inHandler = (event) => {
        if (outTimeout !== null) {
          clearTimeout(outTimeout)
        } else {
          inTimeout = setTimeout(() => {
            this.open()
            inTimeout = null
          }, (event.type === 'focus'
            ? this.focusDelay
            : this.hoverOpenDelay) || this.openDelay)
        }
      }
      const outHandler = (event) => {
        if (inTimeout !== null) {
          clearTimeout(inTimeout)
        } else {
          outTimeout = setTimeout(() => {
            this.close()
            outTimeout = null
          }, (event.type === 'blur'
            ? this.blurDelay
            : this.hoverCloseDelay) || this.closeDelay)
        }
      }
      if (events.indexOf('hover') >= 0) {
        this._on(this.target, 'mouseover', inHandler)
        this._on(this.$el, 'mouseover', inHandler)
        this._on(this.target, 'mouseout', outHandler)
        this._on(this.$el, 'mouseout', outHandler)
      }
      if (events.indexOf('focus') >= 0) {
        this._on(this.target, 'focus', inHandler)
        this._on(this.$el, 'focus', inHandler)
        this._on(this.target, 'blur', outHandler)
        this._on(this.$el, 'blur', outHandler)
      }
    },
    removeEvents () {
      for (let i = 0; i < this.boundEvents.length; ++i) {
        const { element, event, handler } = this.boundEvents[i]
        element.removeEventListener(event, handler)
      }
    },
    // add event listener shorthand
    _on (element, event, handler) {
      this.boundEvents.push({ element, event, handler })
      element.addEventListener(event, handler)
    }
  },
  watch: {
    show (value) {
      // toggle tether
      if (value) {
        this.$tether.enable()
      } else {
        this.$tether.disable()
      }
      // trigger events
      this.$nextTick(() => this.$emit(value
        ? 'show'
        : 'hide'
      ))
    }
  },
  beforeDestroy () {
    this.removeEvents()
    this.$tether.destroy()
    this.$remove()
  }
}
</script>
