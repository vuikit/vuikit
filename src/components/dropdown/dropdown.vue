<template>
  <div
    :style="$style"
    :class="['uk-dropdown', { 'uk-open': show }]"
    @mouseenter.self="triggerShow"
    @mouseleave.self="hideOnLeave && triggerHide()"
    v-position="{
      flip,
      target: $target,
      position: $position,
      boundary: $boundary,
      classPrefix: 'uk-dropdown',
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
