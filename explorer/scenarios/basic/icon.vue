<template>
  <div>
    <vk-icon icon="album"></vk-icon>
    <vk-icon icon="album" ratio="2"></vk-icon>
    <vk-icon icon="check" link></vk-icon>
    <vk-icon icon="check" link link-reset></vk-icon>
    <vk-icon icon="check" link button></vk-icon>
  </div>
</template>

<script>
import { Icon } from 'src/js/vuikit'
Icon.register(require('src/icons/album'))
Icon.register(require('src/icons/check'))
</script>
