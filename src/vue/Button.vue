<template>
  <button class="uk-button"
    :class="classes"
    :disabled="disabled">
    <i
      v-if="icon && !iconRight"
      :class="iconClass">
    </i>
    <slot></slot>
    <i
      v-if="icon && iconRight"
      :class="iconClass">
    </i>
  </button>
</template>

<script>
export default {
  props: {
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
    iconRight: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass: function () {
      return `uk-icon-justify uk-icon-${this.icon}`
    },
    classes: function () {
      const classes = {
        /* state */
        'uk-active': this.state,
        /* color */
        'uk-button-primary': this.color === 'primary',
        'uk-button-success': this.color === 'success',
        'uk-button-danger': this.color === 'danger',
        'uk-button-link': this.color === 'link',
        /* size */
        'uk-button-mini': this.size === 'mini',
        'uk-button-small': this.size === 'small',
        'uk-button-large': this.size === 'large'
      }
      /* width */
      classes[`uk-width-${this.width}`] = this.width
      return classes
    }
  }
}
</script>
