<template>
  <component :is="`vk-offcanvas-transition-${transition}`">
    <div
      v-show="show"
      class="uk-offcanvas"
      style="display: block;"
    >
      <div
        ref="bar"
        class="uk-offcanvas-bar"
      >
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<script>
import { warn } from '@vuikit/core/helpers/debug'

import VkOffcanvasTransitionNone from './transitions/none'
import VkOffcanvasTransitionPush from './transitions/push'
import VkOffcanvasTransitionSlide from './transitions/slide'
import VkOffcanvasTransitionReveal from './transitions/reveal'

export default {
  name: 'Offcanvas',
  components: {
    VkOffcanvasTransitionNone,
    VkOffcanvasTransitionPush,
    VkOffcanvasTransitionSlide,
    VkOffcanvasTransitionReveal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'slide',
      validator: mode => mode.match(/none|slide|push|reveal/)
    }
  },
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  mounted () {
    this.$refs.content = document.body.querySelector(`.uk-offcanvas-content`)

    if (!this.$refs.content) {
      warn('Offcanvas content is not detected, make sure to wrap the content with VkOffcanvasContent or a custom div.uk-offcanvas-content.', this)
      this.$destroy()
    }
  }
}
</script>
