<template>
  <div :class="{
    'uk-button-group': group
  }">
    <slot></slot>
  </div>
</template>

<script>
import { inArray } from 'src/js/util/index'
import { filterByTag, getProps } from 'helpers/component'

export default {
  name: 'VkButtonCheckbox',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    this.updateButtonsState()
  },
  beforeUpdate () {
    this.updateButtonsState()
  },
  mounted () {
    this.$children.forEach(button => {
      button.$on('click', () => this.toggle(button))
    })
  },
  methods: {
    updateButtonsState () {
      filterByTag(this.$slots.default, 'vk-button').forEach(component => {
        const props = getProps(component)
        props.active = inArray(this.value, props.value)
      })
    },
    toggle (selected) {
      // recreate new value respecting buttons order
      const value = this.$children
        .filter(button => button === selected
          ? !button.active
          : button.active)
        .map(button => button.value)
      this.$emit('change', value)
    }
  }
}
</script>
