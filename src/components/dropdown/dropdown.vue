<template>
  <div
    :style="$style"
    :class="['uk-dropdown', { 'uk-open': show }]"
    @mouseleave="onMouseleave"
    v-position="{
      flip,
      target: $target,
      clsPos: 'uk-dropdown',
      position: $position,
      boundary: $boundary
    }"
  >
    <slot />
  </div>
</template>
<script>
import Drop from '../drop/drop'

export default {
  name: 'Dropdown',
  extends: Drop
}
</script>
