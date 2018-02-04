<template>
  <div class="uk-padding ">

    <div :style="{ padding: '10px' }">
      <div
        ref="placeholder"
        class="uk-panel uk-placeholder uk-padding-small uk-text-center uk-margin-remove uk-margin-auto"
        :style="{ width: '230px' }"
      >
        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="top-left" />
          </div>
          <div class="uk-button-group">
            <pos-button position="top-center" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="top-right" />
          </div>
        </div>

        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="left-center" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="right-center" />
          </div>
        </div>

        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="bottom-left" />
          </div>
          <div class="uk-button-group">
            <pos-button position="bottom-center" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="bottom-right" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { Button as VkButton } from '../../../components/button'
import VkTooltip from '../'

const PosButton = {
  props: ['position'],
  directives: {
    VkTooltip
  },
  render (h) {
    let label = this.position.split('-')
    label = `${label[0][0]}${label[1][0]}`

    return h(VkButton, {
      props: {
        size: 'small'
      },
      directives: [{
        name: 'vk-tooltip',
        value: {
          content: this.position,
          position: this.position,
          flip: this.$parent.flip,
          delay: this.$parent.delay,
          boundary: this.$parent.boundary,
          duration: this.$parent.duration,
          triggers: this.$parent.triggers,
          animation: `${this.$parent.animationIn}, ${this.$parent.animationOut}`
        }
      }]
    }, label)
  }
}

export default {
  components: {
    PosButton
  },
  data: () => ({
    delay: 0,
    flip: false,
    boundary: null,
    animationIn: '',
    duration: 100,
    triggers: 'hover focus'
  })
}
</script>
