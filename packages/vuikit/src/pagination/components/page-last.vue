<template>
  <ElPageNext
    :disabled="$parent.nextPage > $parent.lastPage"
    @click="$parent.update($parent.lastPage)"
    v-bind="$attrs"
  />
</template>

<script>
import { ElPageNext } from '../elements'

export default {
  name: 'VkPaginationPageLast',
  inheritAttrs: false,
  components: { ElPageNext }
}
</script>
