<template>
  <div class="uk-padding">
    <vk-button ref="btn1">
      Default
    </vk-button>
    <vk-dropdown
      :show.sync="show1"
      target="btn1"
    >
      Lorem ipsum dolor sit amet.
    </vk-dropdown>

    <div class="uk-inline">
      <vk-button ref="btn2">
        Inline placement
      </vk-button>
      <vk-dropdown
        :show.sync="show2"
        target="btn2"
        :placement="false"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </vk-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    show2: false
  })
}
</script>
