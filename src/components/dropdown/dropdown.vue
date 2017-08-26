<template>
  <div v-show="show"
    class="uk-dropdown"
    :class="{
      'uk-open': show,
      [`uk-dropdown-${position}`]: show
    }"
    :style="{
      'top': `${top}px`,
      'left': `${left}px`
    }">
    <slot></slot>
  </div>
</template>

<script>
import Drop from '../drop/drop'

export default {
  name: 'VkDropdown',
  extends: Drop
}
</script>
