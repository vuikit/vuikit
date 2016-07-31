<template>
  <div :class="{
      'uk-dropdown': !blank,
      'uk-dropdown-blank': blank,
      'uk-dropdown-small': !fixWidth,
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
import * as Tether from '../utils/tether'
import props from './props'
import { query } from '../../util'

export default {
  name: 'VkDropdown',
  props,
  mounted () {
    if (this.targetNode) {
      this.initEvents()
      this.initTether()
    } else {
      this.$destroy()
    }
  },
  data: () => ({
    boundEvents: []
  }),
  computed: {
    targetNode () {
      return (typeof this.target === 'string')
        ? query(this.target)
        : this.target.elm
    }
  },
  methods: {
    initTether () {
      this.$tether = Tether.init(
        this.$el,
        this.targetNode,
        this.show,
        this.position,
        this.offset,
        this.offsetTarget,
        this.constrainToParent,
        this.constrainToWindow,
        this.tetherOptions
      )
    },
    initEvents () {
      // click events
      let clickEvents = ['click']
      if ('ontouchstart' in document.documentElement) {
        clickEvents.push('touchstart')
      }
      const clickHandler = event => {
        if (this.show) {
          // clicking target
          if (event.target === this.targetNode || this.targetNode.contains(event.target)) {
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
      for (let i = 0; i < clickEvents.length; ++i) {
        this._on(document, clickEvents[i], clickHandler)
      }
      this._on(this.targetNode, 'mouseover', event => {
        // ignore childs triggers
        if (this.targetNode.contains(event.fromElement)) {
          return
        }
        this.$emit('targetHoverIn', event)
      })
      this._on(this.targetNode, 'mouseout', event => {
        // ignore childs triggers
        if (event.relatedTarget === this.targetNode || this.targetNode.contains(event.relatedTarget)) {
          return
        }
        this.$emit('targetHoverOut', event)
      })
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
      value
        ? this.$tether.enable()
        : this.$tether.disable()
    }
  },
  beforeDestroy () {
    if (this.$tether !== undefined) {
      this.$tether.destroy()
    }
    this.removeEvents()
  }
}
</script>
