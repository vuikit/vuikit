<template>
  <div class="uk-padding">

    <div :style="{ padding: '50px' }">
      <div
        ref="placeholder"
        class="uk-panel uk-width-large uk-placeholder uk-padding-small uk-text-center uk-margin-remove uk-margin-auto"
      >
        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="left-top" />
            <pos-button position="top-left" />
          </div>
          <div class="uk-button-group">
            <pos-button position="top-center" />
            <pos-button position="top-justify" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="top-right" />
            <pos-button position="right-top" />
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
            <pos-button position="left-bottom" />
            <pos-button position="bottom-left" />
          </div>
          <div class="uk-button-group">
            <pos-button position="bottom-center" />
            <pos-button position="bottom-justify" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="bottom-right" />
            <pos-button position="right-bottom" />
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

      <story-prop-toggler v-model="target" name="Target">
        <story-prop-toggler-option
          label="Button"
          :value="'button'"
        ></story-prop-toggler-option>
        <story-prop-toggler-option
          label="placeholder"
          :value="$refs.placeholder"
        ></story-prop-toggler-option>
      </story-prop-toggler>
    </div>

    <vk-drop
      :show="true"
      :flip="flip"
      :target="activeTarget"
      :boundary="boundary"
      :position="position"
    >
      <div class="uk-background-primary uk-padding-small uk-light uk-text-center uk-text-small">
        {{ position }}
      </div>
    </vk-drop>

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
      style: {
        zIndex: 999
      },
      class: {
        'uk-active': this.$parent.position === this.position
      },
      on: {
        mouseenter: e => {
          this.$parent.position = this.position
          this.$forceUpdate()
        }
      }
    }, label)
  }
}

export default {
  components: {
    PosButton
  },
  data: (vm) => ({
    show: false,
    flip: false,
    target: null,
    boundary: null,
    position: 'top-justify'
  }),
  computed: {
    activeTarget () {
      if (this.target === 'button') {
        return this.$children
          .filter(c => c && c.position === this.position)[0].$el
      }

      return this.target
    }
  },
  mounted () {
    this.target = this.$refs.placeholder
  }
}
</script>
