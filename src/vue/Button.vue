<template>
  <button class="uk-button"
    :class="classes"
    :disabled="disabled"
    :type="type">
    <i v-if="iconLeft"
      class="uk-icon-justify uk-icon-{{ iconLeft }}">
    </i>
    <slot></slot>
    <i v-if="iconRight"
      class="uk-icon-justify uk-icon-{{ iconRight }}">
    </i>
  </button>
</template>

<script>
export default {
  props: {
    value: {},
    style: {
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
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
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
        /* style */
        'uk-button-primary': this.style === 'primary',
        'uk-button-success': this.style === 'success',
        'uk-button-danger': this.style === 'danger',
        'uk-button-link': this.style === 'link',
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
