<template>
  <div class="uk-padding">
    <h2>Default Target</h2>
    <div>
      <vk-button
        @click="show1 = !show1">
        Click
      </vk-button>
      <vk-drop
        :show="show1">
        <ui-card />
      </vk-drop>
    </div>

    <div class="uk-section">
      <h2>Dynamic Target</h2>
      <vk-button ref="btn1" @click="show2 = true, target = '$refs.btn1'">Target 1</vk-button>
      <vk-button ref="btn2" @click="show2 = true, target = '$refs.btn2'">Target 2</vk-button>
      <vk-drop
        :show="show2"
        :target="target">
        <ui-card />
      </vk-drop>
    </div>
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
    show2: false,
    target: null
  })
}
</script>
