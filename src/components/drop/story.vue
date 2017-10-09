<template>
  <div class="uk-padding">
    <vk-button
      @mouseenter="show1 = true"
      @mouseleave="show1 = false"
    >
      Hover
    </vk-button>
    <vk-drop
      :show="show1"
      @mouseleave="show1 = false"
    >
      <ui-card />
    </vk-drop>

    <vk-button
      @click="show2 = !show2"
    >
      Click
    </vk-button>
    <vk-drop
      :show="show2"
    >
      <ui-card />
    </vk-drop>
  </div>
</template>

<script>
const UiCard = {
  functional: true,
  render (h) {
    return <div class="uk-card uk-card-body uk-card-default">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
    </div>
  }
}

export default {
  components: {
    UiCard
  },
  data: () => ({
    show1: false,
    show2: false
  })
}
</script>
