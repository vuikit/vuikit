<template>
  <ui-drop
    :show="show"
    :position="position"
    :target="$target"
    :boundary="$boundary"
    @mouseleave="onMouseleave"
  >
    <slot />
  </ui-drop>
</template>

<script>
import UiDrop from './ui/drop'
import vPosition from './ui/v-position'
import { isString, get } from '@vuikit/util'

const isRtl = document.documentElement.getAttribute('dir') === 'rtl'

export default {
  components: {
    UiDrop
  },
  directives: {
    vkDropPosition: vPosition
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
    onMouseleave (e) {
      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el ||
        this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }

      this.$emit('mouseleave', e)
    }
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
