<template>
  <ElPagePrev
    :disabled="$parent.prevPage < 1"
    @click="$parent.update(1)"
    v-bind="$attrs"
  />
</template>

<script>
import { ElPagePrev } from '../elements'

export default {
  name: 'VkPaginationPageFirst',
  inheritAttrs: false,
  components: { ElPagePrev }
}
</script>
