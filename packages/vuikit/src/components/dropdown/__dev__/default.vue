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

    <vk-button ref="btn3">On Click</vk-button>
    <vk-dropdown
      :show.sync="show3"
      target="btn3"
      triggers="click"
    >
      Lorem ipsum dolor sit amet.
    </vk-dropdown>
  </div>
</template>

<script>
import { Dropdown as VkDropdown } from '../'
import { Button as VkButton } from '../..'

export default {
  components: {
    VkButton,
    VkDropdown
  },
  data: () => ({
    show1: false,
    show2: false,
    show3: false
  })
}
</script>
