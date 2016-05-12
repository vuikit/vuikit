<template>
  <div data-uk-button-checkbox
    :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import ButtonGroup from './ButtonGroup'

export default {
  extends: ButtonGroup,
  props: {
    value: {
      type: Array,
      description: 'The current value determined by the active buttons.'
    }
  },
  ready: function () {
    this.$on('_click', () => {
      // get actives buttons raw values
      const actives = this.getActiveButtons().map((btn, i) => btn.value)
      // if active button has changed
      if (actives !== this.value) {
        // save new value determined by the actives button
        this.value = actives
        // trigger change event
        this.$emit('change')
      }
    })
  }
}
</script>
