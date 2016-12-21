<template>
  <div :class="{
    'uk-button-group': group
  }">
    <slot></slot>
  </div>
</template>

<script>
import { each } from 'src/helpers/util'
import { filterByTag, getProps } from 'src/helpers/component'

export default {
  name: 'VkButtonRadio',
  props: {
    value: {},
    group: {
      type: Boolean,
      default: true
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
