<template>
  <div class="uk-padding">

    <story-positions
      ref="placeholder"
      @change="val => {
        flip = val.flip
        target = val.target
        position = val.position
        boundary = val.boundary
      }"
    ></story-positions>

    <div v-if="target"
      :style="{
        zIndex: 888,
        position: 'absolute'
      }"
      v-vk-position="{ target, position, boundary, flip }">
      <div class="uk-background-primary uk-padding-small uk-light uk-text-center uk-text-small">
        {{ position }}
      </div>
    </div>

  </div>
</template>

<script>
import VkPosition from '../index'

export default {
  directives: {
    VkPosition
  },
  data: () => ({
    flip: true,
    boundary: '',
    target: null,
    position: 'top-center'
  })
}
</script>
