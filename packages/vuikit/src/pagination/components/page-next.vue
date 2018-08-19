<template>
  <ElPageNext
    :disabled="$parent.nextPage > $parent.lastPage"
    @click="$parent.update($parent.nextPage)"
    v-bind="$attrs"
  />
</template>

<script>
import { ElPageNext } from '../elements'

export default {
  name: 'VkPaginationPageNext',
  inheritAttrs: false,
  components: { ElPageNext }
}
</script>
