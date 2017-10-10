<template>
  <div class="uk-padding">
    <div class="uk-section uk-text-center">
      <div class="uk-flex uk-flex-center uk-flex-middle uk-height-medium">
        <vk-button ref="btn">
          Target
        </vk-button>
        <ui-drop
          :show="true"
          :position="position"
          :target="target"
          :flip="false"
        >
          <ui-card>{{ position }}</ui-card>
        </ui-drop>
      </div>

      <div>
        <a v-for="pos in ['left', 'center', 'justify', 'right']"
          @mouseenter="position = `top-${pos}`" class="uk-link-reset"
        >
          {{ `top-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['top', 'center', 'bottom']"
          @mouseenter="position = `right-${pos}`" class="uk-link-reset"
        >
          {{ `right-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['top', 'center', 'bottom']"
          @mouseenter="position = `left-${pos}`" class="uk-link-reset"
        >
          {{ `left-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['left', 'center', 'justify', 'right']"
          @mouseenter="position = `bottom-${pos}`" class="uk-link-reset"
        >
          {{ `bottom-${pos}` }},
        </a>
      </div>
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
    return <div class="uk-background-primary uk-padding uk-light uk-text-center">
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
    position: 'bottom-left'
  }),
  mounted () {
    this.target = this.$refs.btn
  }
}
</script>
