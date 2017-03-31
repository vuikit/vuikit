<template>
  <transition
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    @after-leave="remove">
    <div v-show="active" class="uk-tooltip" style="display: block;">
      <div class="uk-tooltip-inner" v-text="content"></div>
    </div>
  </transition>
</template>

<script>
import PopperMixin from 'lib/mixins/popper'
import { on, offAll } from 'src/js/util/index'

let onMouseenter
let onMouseleave

export default {
  name: 'VkTooltip',
  mixins: [PopperMixin],
  props: {
    /* [top|right|bottom|left]-[left|center|right|justify] */
    position: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    },
    animation: {
      type: String,
      default: 'uk-animation-scale-up'
    },
    delay: {
      type: [Number, String],
      default: 0
    },
    modifiers: {
      type: Object,
      default: () => ({
        offset: {
          offset: '0 5'
        }
      })
    }
  },
  data: () => ({
    active: false,
    flipped: false
  }),
  mounted () {
    // initially the tooltip is off document
    this.remove()

    onMouseenter = () => {
      setTimeout(_ => {
        document.body.appendChild(this.$el)
        this.active = true
        this.$emit('show')
      }, parseInt(this.delay))
    }

    onMouseleave = e => {
      // ignore childs and tooltip hover triggers
      if (e.relatedTarget === this.targetElement || e.relatedTarget === this.$el ||
        this.targetElement.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }

      this.active = false
      offAll(this.$el, this._uid)
      this.$emit('hide')
    }

    on(this.$el, 'mouseleave', onMouseleave, this._uid)
    on(this.targetElement, 'mouseleave', onMouseleave, this._uid)
    on(this.targetElement, 'mouseenter', onMouseenter, this._uid)
    on(this.targetElement, 'focus', onMouseenter, this._uid)
    on(this.targetElement, 'blur', onMouseleave, this._uid)
  },
  methods: {
    remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  beforeDestroy () {
    if (this.targetElement) {
      offAll(this.targetElement, this._uid)
    }
    this.active = false
    this.remove()
  }
}
</script>
