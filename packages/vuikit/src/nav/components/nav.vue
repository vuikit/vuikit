<template>
  <VkNavEl v-bind="pickComponentProps($props, 'VkNavEl')">
    <slot/>
  </VkNavEl>
</template>

<script>
import mixinProps from 'vuikit/src/_core/mixins/props'
import { VkNavEl } from '../elements'

export default {
  mixins: [mixinProps],
  components: { VkNavEl },
  props: VkNavEl.props
}
</script>
