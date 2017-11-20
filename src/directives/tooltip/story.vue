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

    <div class="uk-margin-large-top uk-width-large uk-margin-auto">

      <story-prop-toggler v-model="flip" name="Flip">
        <story-prop-toggler-option
          label="Yes"
          :value="true"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="No"
          :value="false"
        ></story-prop-toggler-option>
      </story-prop-toggler>

      <story-prop-toggler v-model="delay" name="Delay">
        <story-prop-toggler-option
          label="300ms"
          :value="300"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="0ms"
          :value="0"
        ></story-prop-toggler-option>
      </story-prop-toggler>

      <story-prop-toggler v-model="boundary" name="Boundary">
        <story-prop-toggler-option
          label="placeholder"
          :value="$refs.placeholder"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="window"
          :value="null"
        ></story-prop-toggler-option>
      </story-prop-toggler>

      <story-prop-toggler v-model="animationIn" name="Animation In">
        <story-prop-toggler-option
          label="scale-up"
          value="scale-up"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="fade"
          value="fade"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="none"
          value=""
        ></story-prop-toggler-option>
      </story-prop-toggler>

      <story-prop-toggler v-model="duration" name="Duration">
        <story-prop-toggler-option
          label="1000ms"
          :value="1000"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="100ms"
          :value="100"
        ></story-prop-toggler-option>
      </story-prop-toggler>

      <story-prop-toggler v-model="triggers" name="Triggers">
        <story-prop-toggler-option
          label="Hover"
          value="hover"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="Focus"
          value="focus"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="Click"
          value="click"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="All"
          value="click hover focus"
        ></story-prop-toggler-option>
      </story-prop-toggler>
    </div>

  </div>
</template>

<script>
const PosButton = {
  props: ['position'],
  render (h) {
    let label = this.position.split('-')
    label = `${label[0][0]}${label[1][0]}`

    return h('vk-button', {
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
