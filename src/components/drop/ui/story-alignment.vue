<template>
  <div class="uk-padding uk-padding-bottom">
    <div class="uk-panel uk-placeholder" ref="boundary-align">
      <vk-button
        class="uk-float-left"
        @click="position = 'bottom-justify', show = true"
        v-text="'Justify'"
      ></vk-button>
      <vk-button
        class="uk-float-right"
        @click="position = 'bottom-center', show = true"
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
    target: '',
    show: false,
    position: 'bottom-justify'
  }),
  mounted () {
    this.target = this.$refs['boundary-align']
  }
}
</script>
