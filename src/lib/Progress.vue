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
        width: progress + '%'
      }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VkProgress',
  props: {
    // the bar progress, 0 to 100
    progress: {
      type: Number,
      default: 0
    },
    // default, success, warning or danger
    color: {
      type: String,
      default: ''
    },
    // mini or small
    size: {
      type: String,
      default: ''
    },
    // bool, 'animated'
    stripe: {
      type: [Boolean, String],
      default: false
    },
    // animate the striped bar
    stripeAnimate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
