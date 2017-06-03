<template>
  <div>
    <h1>Icon</h1>
    <vk-icon icon="check"></vk-icon>
    <vk-icon icon="check" ratio="2"></vk-icon>
    <vk-icon icon="check" link></vk-icon>
    <vk-icon icon="check" link-reset></vk-icon>
    <vk-icon icon="check" button></vk-icon>
  </div>
</template>

<script>
import { Icon } from 'src/js/vuikit'
Icon.register(require('icons/check'))
</script>
