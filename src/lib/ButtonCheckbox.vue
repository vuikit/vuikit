<template>
  <div :class="{
      'uk-button-group': group
    }">
    <slot></slot>
  </div>
</template>

<script>
import { each, addClass, removeClass } from '../util'
import { toArray } from 'lodash'

export default {
  name: 'VkButtonCheckbox',
  props: {
    group: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    value: null
  }),
  mounted: function () {
    // inherit value from initially active buttons
    this.buttons.filter(btn => btn.active).forEach(btn => {
      this.value.push(btn.value)
    })
    // on each change
    // UI.$(this.$el).on('click', () => {
    //   // get actives btns
    //   const actives = toArray(this.$el.querySelectorAll('.uk-active'))
    //   // trigger event
    //   this.$emit('change', actives.map(btn => btn.__vue__.value))
    // })
    // update buttons active state
    // on init and on each change
    this.$watch('value', function (value) {
      this.buttons.forEach(btn => {
        btn.active = value && value.indexOf(btn.value) !== -1
      })
    }, { immediate: true })
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
