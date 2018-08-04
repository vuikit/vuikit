<template>
  <VkGridEl
    v-bind="pickComponentProps($props, 'VkGridEl')"
    v-vk-margin="{ margin, firstColumn, onUpdate }"
  >
    <slot/>
  </VkGridEl>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'
import { toggleClass } from 'vuikit/src/_core/utils/class'

import { VkGridEl } from '../elements'
import { VkMargin } from 'vuikit/src/margin'

import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  name: 'VkGrid',
  mixins: [mixinProps],
  components: { VkGridEl },
  directives: { VkMargin },
  props: assign({}, VkGridEl.props, {
    margin: {
      type: String,
      default: 'uk-grid-margin'
    },
    firstColumn: {
      type: String,
      default: 'uk-first-column'
    }
  }),
  methods: {
    onUpdate (el, { stacks }) {
      toggleClass(el, 'uk-grid-stack', stacks)
    }
  }
}
</script>
