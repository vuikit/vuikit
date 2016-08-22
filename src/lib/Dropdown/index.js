import * as Tether from '../../helpers/tether'
import { on, offAll } from '../../helpers/dom'
import render from './render'

export default {
  name: 'VkDropdown',
  render,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    target: {
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    },
    fixWidth: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom left'
    },
    transition: {
      type: String,
      default: 'vk-transition-dropdown'
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
    tetherOptions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    targetNode () {
      return (typeof this.target === 'string')
        ? document.querySelector(this.target)
        : this.target
    }
  },
  mounted () {
    if (this.targetNode) {
      this.init()
    }
  },
  methods: {
    init () {
      this.initEvents()
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
        this.on(document, clickEvents[i], clickHandler)
      }
      this.on(this.targetNode, 'mouseover', event => {
        // ignore childs triggers
        if (this.targetNode.contains(event.fromElement)) {
          return
        }
        this.$emit('targetHoverIn', event)
      })
      this.on(this.targetNode, 'mouseout', event => {
        // ignore childs triggers
        if (event.relatedTarget === this.targetNode || this.targetNode.contains(event.relatedTarget)) {
          return
        }
        this.$emit('targetHoverOut', event)
      })
    },
    // just a shortcut to avoid setting up
    // the namespace every time
    on (el, event, handler) {
      on(el, event, handler, this._uid)
    }
  },
  beforeDestroy () {
    if (this.$tether !== undefined) {
      this.$tether.destroy()
    }
    offAll(this._uid)
    this.$el.parentNode.removeChild(this.$el)
  }
}
