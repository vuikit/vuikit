<template>
  <div class="uk-padding">
    <div class="uk-panel uk-placeholder uk-text-center" ref="boundary">
      <span>bottom-left</span>
      <vk-button
        class="uk-float-left"
        ref="btn1"
        @mouseenter="
          target = $refs.btn1,
          position = 'bottom-left'
        "
        v-text="'Hover'"
      ></vk-button>
      <vk-button
        ref="btn2"
        class="uk-float-right"
        @mouseenter="
          target = $refs.btn2,
          position = 'bottom-left'
        "
        v-text="'Hover'"
      ></vk-button>
    </div>

    <div class="uk-panel uk-placeholder uk-text-center" ref="boundary-2">
      <span>bottom-center</span>
      <vk-button
        class="uk-float-left"
        ref="btn3"
        @mouseenter="
          target = $refs.btn3,
          position = 'bottom-center'
        "
        v-text="'Hover'"
      ></vk-button>
      <vk-button
        ref="btn4"
        class="uk-float-right"
        @mouseenter="
          target = $refs.btn4,
          position = 'bottom-center'
        "
        v-text="'Hover'"
      ></vk-button>
    </div>

    <ui-drop
      :flip="flip"
      :show="true"
      :target="target"
      :boundary="boundary"
      :position="position"
    >
      <ui-card />
    </ui-drop>
  </div>
</template>

<script>
import UiDrop from './drop'
import DropPosition from './v-drop-position'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'

const UiCard = {
  functional: true,
  render (h, { children }) {
    return <div class="uk-background-primary uk-padding-small uk-light uk-text-center">
      { children || lorem }
    </div>
  }
}

export default {
  components: {
    UiDrop,
    UiCard
  },
  directives: {
    DropPosition
  },
  data: () => ({
    flip: true,
    show: false,
    target: '',
    boundary: '',
    position: 'bottom-left'
  }),
  mounted () {
    this.boundary = this.$refs['boundary']
  }
}
</script>
