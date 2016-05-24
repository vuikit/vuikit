<template>

<span class="uk-badge" 
  :class="{
    'uk-badge-notification': style === 'notice',
    'uk-badge-success': style === 'success',
    'uk-badge-warning': style === 'warning',
    'uk-badge-danger': style === 'danger'
   }">
  <slot></slot>
</span>
  
</template>

<script>
export default {
  props: {
    style: {
      type: String,
      default: ''
    }
  }
}
</script>
