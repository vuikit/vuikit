<template>
  <div class="uk-padding">

    <vk-label>Default</vk-label>
    <vk-label type="success">Success</vk-label>
    <vk-label type="warning">Warning</vk-label>
    <vk-label type="danger">Danger</vk-label>

  </div>
</template>

<script>
import { Label as VkLabel } from '../'

export default {
  components: {
    VkLabel
  }
}
</script>
