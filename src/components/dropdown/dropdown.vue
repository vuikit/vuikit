<template>
  <ui-drop
    :show="show"
    :target="$target"
    :position="position"
    :boundary="$boundary"
    clsPrefix="uk-dropdown"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseenter"
  >
    <slot />
  </ui-drop>
</template>

<script>
import UiDrop from '../drop/ui/drop'
import DropPosition from '../drop/ui/v-drop-position'
import { isString, get, on, offAll } from '@vuikit/util'

const isRtl = document.documentElement.getAttribute('dir') === 'rtl'

export default {
  components: {
    UiDrop
  },
  directives: {
    DropPosition
  },
  props: {
    target: {},
    boundary: {},
    show: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      default: `bottom-${isRtl ? 'right' : 'left'}`
    },
    delayShow: {
      type: Number,
      default: 150
    },
    delayHide: {
      type: Number,
      default: 800
    }
  },
  computed: {
    $target: {
      get () {
        const target = isString(this.target)
          ? get(this.$vnode.context, this.target)
          : this.target

        return target || (this.$el && this.$el.previousElementSibling)
      },
      cache: false
    },
    $boundary: {
      get () {
        const boundary = isString(this.boundary)
          ? get(this.$vnode.context, this.boundary)
          : this.boundary

        return boundary || window
      },
      cache: false
    }
  },
  methods: {
    onMouseenter (e) {
      // ignore childs triggers
      if (this.$target.contains(e.fromElement)) {
        return
      }

      // cancel any delayed hiding
      clearTimeout(this.$hideTimeout)

      this.$showTimeout = setTimeout(() => {
        this.$emit('mouseenter', e)
      }, this.delayShow)
    },
    onMouseleave (e) {
      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el ||
        this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }

      // cancel any delayed showing
      clearTimeout(this.$showTimeout)

      this.$hideTimeout = setTimeout(() => {
        this.$emit('mouseleave', e)
      }, this.delayHide)
    },
    onClickOut (e) {
      const clikedOnTarget = e.target === this.$target || this.$target.contains(e.target)
      const clickedOnDrop = e.target === this.$el || this.$el.contains(e.target)

      if (!this.show || clikedOnTarget) {
        return
      }

      if (clickedOnDrop) {
        this.$emit('click-in', e)
      } else {
        this.$emit('click-out', e)
      }
    }
  },
  mounted () {
    on(this.$target, 'mouseleave', this.onMouseleave, this._uid)
    on(this.$target, 'mouseenter', this.onMouseenter, this._uid)

    on(document, 'click', this.onClickOut, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', this.onClickOut, this._uid)
    }
  },
  beforeDestroy () {
    offAll(this._uid)
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
