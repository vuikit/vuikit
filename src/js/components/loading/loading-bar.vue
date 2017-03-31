<template>
  <div class="vk-loading-bar"
    :style="{ width: `${width}%` }"
    :class="{
      'vk-loading-bar-warning': state === 'timeout',
      'vk-loading-bar-danger': state === 'error'
    }">
  </div>
</template>

<script>
import TWEEN from 'tween.js'
import { toInteger } from 'src/js/util/index'

export default {
  name: 'VkLoadingBar',
  props: {
    progress: {
      type: Number,
      default: 0,
      required: true
    },
    state: {
      type: String,
      default: '' // timeout|error
    }
  },
  data: () => ({
    width: 0
  }),
  created () {
    this.$watch('progress', progress => {
      progress = this.normalize(progress)
      progress > this.width
        ? this.animate(progress)
        : this.width = progress
    }, {
      immediate: true
    })
  },
  methods: {
    // within 0-100 range
    normalize (value) {
      return Math.max(Math.min(toInteger(value), 100), 0)
    },
    animate (progress) {
      let animationFrame
      function animate (time) {
        TWEEN.update(time)
        animationFrame = window.requestAnimationFrame(animate)
      }
      new TWEEN.Tween(this)
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ width: progress }, 500)
        .onComplete(function () {
          window.cancelAnimationFrame(animationFrame)
          this.$emit('animation-complete', this.width)
        })
        .start()
      animationFrame = window.requestAnimationFrame(animate)
    }
  }
}
</script>
