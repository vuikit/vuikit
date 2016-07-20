<template>
  <button class="uk-button"
    :class="classes"
    :disabled="disabled"
    :type="type">
    <i v-if="iconLeft"
      class="uk-icon-justify"
      :class="[`uk-icon-${iconLeft}`]">
    </i>
    <slot></slot>
    <i v-if="icon"
      class="uk-icon-justify"
      :class="[`uk-icon-${icon}`]">
    </i>
  </button>
</template>

<script>
export default {
  name: 'VkButton',
  props: {
    value: {},
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconLeft: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    classes: function () {
      const classes = {
        /* color */
        'uk-button-primary': this.color === 'primary',
        'uk-button-success': this.color === 'success',
        'uk-button-danger': this.color === 'danger',
        'uk-button-link': this.color === 'link',
        /* size */
        'uk-button-mini': this.size === 'mini',
        'uk-button-small': this.size === 'small',
        'uk-button-large': this.size === 'large',
        /* active */
        'uk-active': this.active
      }
      /* width */
      classes[`uk-width-${this.width}`] = this.width
      return classes
    }
  }
}
</script>
