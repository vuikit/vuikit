<template>
  <div class="uk-padding uk-padding-bottom">
    <div class="uk-panel uk-placeholder" ref="boundary-align">
      <vk-button
        class="uk-float-left"
        ref="btn"
        @click="show = true, position = 'bottom-justify'"
        v-text="'Justify'"
      ></vk-button>
      <vk-button
        class="uk-float-right"
        @click="show = true, position = 'bottom-center'"
        v-text="'Center'"
      ></vk-button>
      <ui-drop
        :show="show"
        :position="position"
        :target="target"
      >
        <ui-card />
      </ui-drop>
    </div>
  </div>
</template>

<script>
import UiDrop from './drop'
import position from './v-position'

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
    vkDropPosition: position
  },
  data: () => ({
    target: '',
    show: false,
    position: 'bottom-left'
  }),
  mounted () {
    this.target = this.$refs['boundary-align']
  }
}
</script>
