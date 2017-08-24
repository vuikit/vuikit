<template>
  <div>
    <h1>Icon</h1>
    <!-- default -->
    <vk-icon>
      <icon-check></icon-check>
    </vk-icon>
    <!-- double ratio -->
    <vk-icon>
      <icon-check ratio="2"></icon-check>
    </vk-icon>
    <!-- link -->
    <vk-icon-link href="#">
      <icon-check></icon-check>
    </vk-icon-link>
    <!-- link-reset -->
    <vk-icon-link reset href="#">
      <icon-check></icon-check>
    </vk-icon-link>
    <!-- button -->
    <vk-icon-button>
      <icon-check></icon-check>
    </vk-icon-button>
  </div>
</template>

<script>
import { IconCheck } from '@vuikit/icons'

export default {
  name: 'Icon',
  components: {
    IconCheck
  }
}
</script>
