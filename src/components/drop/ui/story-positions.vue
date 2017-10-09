<template>
  <div class="uk-padding uk-padding-bottom">
    <div class="uk-section">
      <div class="uk-flex uk-flex-center uk-flex-middle uk-height-medium">
        <ui-drop
          :show="show"
          :position="position"
          :target="target"
        >
          <ui-card>{{ position }}</ui-card>
        </ui-drop>
        <vk-button
          ref="btn"
          @click="show = true"
          v-text="show ? 'Target' : 'Show'"
        ></vk-button>
      </div>

      <div>
        <a v-for="pos in ['left', 'center', 'right', 'justify']"
          @click.prevent="position = `bottom-${pos}`" class="uk-link-reset"
        >
          {{ `bottom-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['left', 'center', 'right', 'justify']"
          @click.prevent="position = `top-${pos}`" class="uk-link-reset"
        >
          {{ `top-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['top', 'center', 'bottom']"
          @click.prevent="position = `left-${pos}`" class="uk-link-reset"
        >
          {{ `left-${pos}` }},
        </a>
      </div>
      <div>
        <a v-for="pos in ['top', 'center', 'bottom']"
          @click.prevent="position = `right-${pos}`" class="uk-link-reset"
        >
          {{ `right-${pos}` }},
        </a>
      </div>
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
    vkDropPosition: position
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
