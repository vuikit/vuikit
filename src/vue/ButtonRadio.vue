<template>
  <div data-uk-button-radio
    :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import ButtonGroup from './ButtonGroup'

export default {
  extends: ButtonGroup,
  ready: function () {
    this.$on('_click', () => {
      const active = this.getActiveButtons().pop()
      // if active button has changed
      if (active && active.value !== this.value) {
        // save new value determined by the active button
        this.value = active.value
        // trigger change event
        this.$emit('change')
      }
    })
  }
}
</script>
