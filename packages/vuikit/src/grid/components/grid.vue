<template>
  <ElGrid
    v-bind="pickComponentProps($props, 'ElGrid')"
    v-vk-margin="{ margin, firstColumn, onUpdate }"
  >
    <slot/>
  </ElGrid>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'
import { toggleClass } from 'vuikit/src/_core/utils/class'

import { ElGrid } from '../elements'
import { Margin as VkMargin } from 'vuikit/src/margin'

import mixinProps from 'vuikit/src/_core/mixins/props'

export default {
  name: 'VkGrid',
  mixins: [mixinProps],
  components: { ElGrid },
  directives: { VkMargin },
  props: assign({}, ElGrid.props, {
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
