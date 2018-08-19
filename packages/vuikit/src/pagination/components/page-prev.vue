<template>
  <ElPagePrev
    :disabled="$parent.prevPage < 1"
    @click="$parent.update($parent.prevPage)"
    v-bind="$attrs"
  />
</template>

<script>
import { ElPagePrev } from '../elements'

export default {
  name: 'VkPaginationPagePrev',
  inheritAttrs: false,
  components: { ElPagePrev }
}
</script>
