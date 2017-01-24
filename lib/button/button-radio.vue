<template>
  <div :class="{
    'uk-button-group': group
  }">
    <slot></slot>
  </div>
</template>

<script>
import { each } from 'helpers/util'
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
    each(this.$children, button => {
      button.$on('click', () => this.$emit('change', button.value))
    })
  },
  methods: {
    updateButtonsState () {
      each(filterByTag(this.$slots.default, 'vk-button'), component => {
        const props = getProps(component)
        props.active = props.value === this.value
      })
    }
  }
}
</script>
