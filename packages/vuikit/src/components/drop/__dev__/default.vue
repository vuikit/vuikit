<template>
  <div class="uk-padding">
    <vk-button ref="btn1">Default</vk-button>
    <vk-drop
      :show.sync="show1"
      target="btn1"
    >
      <ui-card />
    </vk-drop>

    <vk-button ref="btn2">On Click</vk-button>
    <vk-drop
      :show.sync="show2"
      target="btn2"
      triggers="click"
    >
      <ui-card />
    </vk-drop>

    <vk-button ref="btn3">Delayed</vk-button>
    <vk-drop
      :show.sync="show3"
      target="btn3"
      :show-delay="300"
    >
      <ui-card />
    </vk-drop>
  </div>
</template>

<script>
import { Drop as VkDrop } from '../'
import { Button as VkButton } from '../../button'

const UiCard = {
  functional: true,
  render (h) {
    const Lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'

    return h('div', {
      class: 'uk-card uk-card-body uk-card-default'
    }, Lorem)
  }
}

export default {
  components: {
    UiCard,
    VkDrop,
    VkButton
  },
  data: () => ({
    show1: false,
    show2: false,
    show3: false
  })
}
</script>
