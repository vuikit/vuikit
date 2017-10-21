<template>
  <div
    :style="$style"
    :class="['uk-drop', { 'uk-open': show }]"
    @mouseleave="onMouseleave"
    v-position="{
      flip,
      target: $target,
      clsPos: 'uk-drop',
      position: $position,
      boundary: $boundary
    }"
  >
    <slot />
  </div>
</template>

<script>
import Position from '~/directives/position'
import { isString, get, includes } from '@vuikit/util'
import { getPositionAxis } from '~/helpers/position'

const isRtl = document.documentElement.getAttribute('dir') === 'rtl'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
]

export default {
  name: 'Drop',
  directives: {
    Position
  },
  props: {
    target: {},
    boundary: {},
    show: {
      type: Boolean,
      required: true
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: `bottom-${isRtl ? 'right' : 'left'}`,
      validator: pos => includes(positions, pos)
    }
  },
  computed: {
    $position () {
      return this.position.replace('justify', 'center')
    },
    $dir () {
      return this.position.split('-')[0]
    },
    $align () {
      return this.position.split('-')[1]
    },
    $style () {
      const style = {}
      const isJustified = this.$align === 'justify'

      if (!this.target || !isJustified) {
        return style
      }

      const rect = this.target.getBoundingClientRect()
      const prop = getPositionAxis(this.position) === 'y'
        ? 'width'
        : 'height'

      style[prop] = `${rect[prop]}px`

      return style
    },
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
