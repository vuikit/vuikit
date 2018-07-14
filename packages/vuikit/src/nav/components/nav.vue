<template>
  <ElNav v-bind="pickComponentProps($props, 'ElNav')">
    <slot/>
  </ElNav>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'
import mixinProps from 'vuikit/src/_core/mixins/props'
import * as elements from '../elements'

export default {
  name: 'VkNav',
  mixins: [mixinProps],
  components: assign({}, elements),
  props: assign({}, elements.ElNav.props)
}
</script>
