<template>
  <div :class="{
      'uk-button-group': group
    }">
    <slot></slot>
  </div>
</template>

<script>
import { each, addClass, removeClass } from '../util'

export default {
  name: 'VkButtonRadio',
  props: {
    group: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    value: null
  }),
  mounted () {
    each(this.$children, (button) => {
      button.$el.addEventListener('click', () => this.doSelect(button))
      // set initial active state
      button.active
        ? this.setAsActive(button)
        : this.setAsInactive(button)
    })
  },
  methods: {
    setAsActive (button) {
      addClass(button.$el, 'uk-active')
      button.$el.setAttribute('aria-checked', true)
      this.value = button.value
    },
    setAsInactive (button) {
      removeClass(button.$el, 'uk-active')
      button.$el.setAttribute('aria-checked', false)
    },
    doSelect (button) {
      // reset all buttons
      each(this.$children, (button) => {
        this.setAsInactive(button)
      })
      // select button
      this.setAsActive(button)
      // trigger event
      this.$emit('change', this.value)
    }
  }
}
</script>
