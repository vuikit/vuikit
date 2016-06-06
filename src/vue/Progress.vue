<template>
  <div class="uk-progress"
    :class="{
      'uk-progress-success': color === 'success',
      'uk-progress-warning': color === 'warning',
      'uk-progress-danger': color === 'danger',
      'uk-progress-mini': size === 'mini',
      'uk-progress-small': size === 'small',
      'uk-progress-striped': stripe,
      'uk-active': stripe === 'animated'
    }">
    <div class="uk-progress-bar"
      :style="{
        width: progressed + '%'
      }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: [Number, String],
      default: 0
    },
    color: { // default, success, warning or danger
      type: String,
      default: ''
    },
    size: {
      type: String, // mini or small
      default: ''
    },
    stripe: { // bool, 'animated'
      type: [Boolean, String],
      default: false
    },
    stripeAnimate: { // animate the striped bar
      type: Boolean,
      default: false
    }
  },
  computed: {
    progressed () {
      return parseInt(this.progress)
    }
  }
}
</script>
