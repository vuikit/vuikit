<template>
  <div data-uk-button-radio
    :class="{
      'uk-button-group': group
    }">
    <slot></slot>
  </div>
</template>

<script>
import UI from 'uikit'

export default {
  props: {
    value: {},
    group: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    buttons () {
      return this.$children.filter(btn => btn.$options.name === 'VkButton')
    },
    active () {
      const active = this.buttons.filter(btn => btn.active)
      return active[0]
        ? active[0]
        : false
    }
  },
  ready: function () {
    // inherit value from initially active button
    if (this.active) {
      this.value = this.active.value
    }
    // on each change
    UI.$(this.$el).on('change.uk.button', () => {
      const selected = this.$el.querySelector('.uk-active').__vue__
      // update radio value
      this.value = selected.value
      // trigger event
      this.$emit('change', this.value)
    })
    // update buttons active state
    // on init and on each change
    this.$watch('value', function (value) {
      this.buttons.forEach(btn => {
        btn.active = btn.value === value
      })
    }, { immediate: true })
  }
}
</script>
