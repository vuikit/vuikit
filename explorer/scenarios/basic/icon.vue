<template>
  <div>
    <vk-icon icon="album"></vk-icon>
    <vk-icon icon="album" ratio="2"></vk-icon>
    <vk-icon-link icon="check" href="#"></vk-icon-link>
    <vk-icon-link icon="check" href="#" class="uk-icon-link"></vk-icon-link>
    <vk-icon-link icon="check" href="#" class="uk-icon-button"></vk-icon-link>
  </div>
</template>

<script>
import { Icon } from 'src/js/vuikit'
import album from 'src/icons/album'
import check from 'src/icons/check'

Icon.register(album)
Icon.register(check)
</script>
