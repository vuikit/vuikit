<template>
  <div :class="{
    'uk-button-group': group
  }">
    <slot></slot>
  </div>
</template>

<script>
import { filterByTag, getProps } from 'helpers/component'

export default {
  name: 'VkButtonRadio',
  props: {
    value: {},
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
      button.$on('click', () => this.$emit('change', button.value))
    })
  },
  methods: {
    updateButtonsState () {
      filterByTag(this.$slots.default, 'vk-button').forEach(component => {
        const props = getProps(component)
        props.active = props.value === this.value
      })
    }
  }
}
</script>
