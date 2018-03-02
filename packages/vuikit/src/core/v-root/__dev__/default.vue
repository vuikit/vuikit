<template>
  <div class="uk-padding">

    <div v-vk-root>
      I should be in the app $root
    </div>

  </div>
</template>

<script>
import VkRoot from '../index'

export default {
  directives: {
    VkRoot
  }
}
</script>
