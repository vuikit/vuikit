<template>
  <div>
    <h1>Icon</h1>
    <vk-icon icon="check"></vk-icon>

    <h2>Ratio</h2>
    <vk-icon icon="check" ratio="2"></vk-icon>

    <h2>Link</h2>
    <vk-icon icon="check" link></vk-icon>

    <h2>Link Reset</h2>
    <vk-icon icon="check" link link-reset></vk-icon>

    <h2>Link Button</h2>
    <vk-icon icon="check" link button></vk-icon>
  </div>
</template>

<script>
import { Icon } from 'src/js/vuikit'
Icon.register(require('icons/check'))
</script>
