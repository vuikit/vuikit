<template>
  <div class="uk-grid uk-margin-small-top">
    <div class="uk-width-1-3">
      {{ name }}
    </div>
    <div class="uk-width-2-3">
      <ul class="uk-subnav uk-flex-right">
        <slot />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropToggler',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  }
}
</script>
