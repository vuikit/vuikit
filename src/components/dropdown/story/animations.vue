<template>
  <div class="uk-padding">
    <vk-button>
      Fade
      <vk-dropdown
        animation="uk-animation-fade, uk-animation-fade uk-animation-reverse"
        :show="fade"
        @mouseenter="fade = true"
        @mouseleave="fade = false">
        <div v-html="content" />
      </vk-dropdown>
    </vk-button>

    <vk-button>
      Slide
      <vk-dropdown
        animation="uk-animation-slide-top-small, uk-animation-slide-top-small uk-animation-reverse"
        :show="slide"
        @mouseenter="slide = true"
        @mouseleave="slide = false">
        <div v-html="content" />
      </vk-dropdown>
    </vk-button>

    <vk-button>
      Scale
      <vk-dropdown
        animation="uk-animation-scale-down, uk-animation-scale-down uk-animation-reverse"
        :show="scale"
        @mouseenter="scale = true"
        @mouseleave="scale = false">
        <div v-html="content" />
      </vk-dropdown>
    </vk-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    fade: false,
    scale: false,
    slide: false,
    content: `
      <ul class="uk-nav uk-dropdown-nav">
        <li class="uk-active"><a href="#">Active</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
      </ul>
    `
  })
}
</script>
