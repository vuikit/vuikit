<template>
  <button class="uk-button"
    :class="classes"
    :disabled="disabled">
    <i
      v-if="iconLeft"
      :class="iconClass(iconLeft)">
    </i>
    <slot></slot>
    <i
      v-if="iconRight"
      :class="iconClass(iconRight)">
    </i>
  </button>
</template>

<script>
export default {
  props: {
    style: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: 'default'
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    state: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {}
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
        /* state */
        'uk-active': this.state
      }
      /* width */
      classes[`uk-width-${this.width}`] = this.width !== 'default'
      return classes
    }
  },
  methods: {
    iconClass: function (icon) {
      return `uk-icon-justify uk-icon-${icon}`
    }
  }
}
</script>
