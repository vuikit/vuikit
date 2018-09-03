<template>
  <div class="uk-padding">

    <div v-vk-root>
      I should be in the app $root
    </div>

  </div>
</template>

<script>
import VkRoot from 'vuikit/src/core/v-root'

export default {
  directives: {
    VkRoot
  }
}
</script>
