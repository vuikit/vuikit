<template>
  <li :class="classes">
    <a href="" v-text="label"></a>
  </li>
</template>

<script>
export default {
  name: 'vk-tab-header',
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function () {
      const classes = {}
      classes['uk-width-' + this.width] = this.width
      classes['uk-disabled'] = this.disabled
      classes['uk-active'] = this.active
      return classes
    }
  }
}
</script>
