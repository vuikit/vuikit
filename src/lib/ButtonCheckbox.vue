<template>
  <div data-uk-button-checkbox
    :class="{
      'uk-button-group': group
    }">
    <slot></slot>
  </div>
</template>

<script>
import { toArray } from 'lodash'

const UI = typeof window !== 'undefined' && window.UIkit

export default {
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    group: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    buttons () {
      return this.$children.filter(btn => btn.$options.name === 'VkButton')
    }
  },
  ready: function () {
    // inherit value from initially active buttons
    this.buttons.filter(btn => btn.active).forEach(btn => {
      this.value.push(btn.value)
    })
    // on each change
    UI.$(this.$el).on('click', () => {
      // get actives btns
      const actives = toArray(this.$el.querySelectorAll('.uk-active'))
      // save its values as array
      this.value = actives.map(btn => btn.__vue__.value)
      // trigger event
      this.$emit('change', this.value)
    })
    // update buttons active state
    // on init and on each change
    this.$watch('value', function (value) {
      this.buttons.forEach(btn => {
        btn.active = value && value.indexOf(btn.value) !== -1
      })
    }, { immediate: true })
  }
}
</script>
