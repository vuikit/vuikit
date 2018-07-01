<template>
  <div>

    <div class="uk-section uk-section-large">
      <div
        ref="placeholder"
        :style="{
          width: '350px'
        }"
        class="uk-panel uk-width-large uk-placeholder uk-padding-small uk-text-center uk-margin-remove uk-margin-auto"
      >
        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="left-top" />
            <pos-button position="top-left" />
          </div>
          <div class="uk-button-group">
            <pos-button position="top-center" />
            <pos-button position="top-justify" v-if="withJustifyPosition" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="top-right" />
            <pos-button position="right-top" />
          </div>
        </div>

        <div class="uk-clearfix uk-margin">
          <div class="uk-button-group uk-float-left">
            <pos-button position="left-center" />
            <pos-button position="left-justify" v-if="withJustifyPosition" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="right-justify" v-if="withJustifyPosition" />
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
            <pos-button position="bottom-justify" v-if="withJustifyPosition" />
          </div>
          <div class="uk-button-group uk-float-right">
            <pos-button position="bottom-right" />
            <pos-button position="right-bottom" />
          </div>
        </div>
      </div>
    </div>

    <div class="uk-form uk-margin-large-top uk-width-large uk-margin-auto">
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        Flip
        <label>
          <input
            class="uk-checkbox"
            type="checkbox"
            v-model="flip"
          >
        </label>
      </div>

      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        Target
        <label>
          <input
            class="uk-radio"
            type="radio"
            value="placeholder"
            v-model="target"
          > Placeholder
        </label>
        <label>
          <input
            class="uk-radio"
            type="radio"
            value="button"
            v-model="target"
          > Button
        </label>
      </div>

      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        Boundary
        <label>
          <input
            class="uk-radio"
            type="radio"
            value="placeholder"
            v-model="boundary"
          > Placeholder
        </label>
        <label>
          <input
            class="uk-radio"
            type="radio"
            value="window"
            v-model="boundary"
          > Window
        </label>
      </div>
    </div>

  </div>
</template>

<script>
const PosButton = {
  props: ['position'],
  render (h) {
    let label = this.position.split('-')
    label = `${label[0][0]}${label[1][0]}`

    return h('button', {
      style: {
        zIndex: 999
      },
      class: ['uk-button uk-button-default uk-button-small', {
        'uk-active': this.$parent.position === this.position
      }],
      on: {
        click: e => {
          this.$parent.position = this.position
          this.$parent.triggerChange()
        }
      }
    }, label)
  }
}

export default {
  components: {
    PosButton
  },
  props: {
    withJustifyPosition: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flip: false,
      boundary: 'window',
      target: 'placeholder',
      position: 'bottom-center'
    }
  },
  methods: {
    triggerChange () {
      this.$emit('change', {
        flip: this.flip,
        position: this.position,
        target: this.targetElement,
        boundary: this.boundaryElement
      })
      this.$forceUpdate()
    }
  },
  computed: {
    targetElement () {
      if (this.target === 'button') {
        return this.$children
          .filter(c => c && c.position === this.position)[0].$el
      }

      return this.$refs.placeholder
    },
    boundaryElement () {
      return this.boundary === 'window'
        ? window
        : this.$refs.placeholder
    }
  },
  watch: {
    target () {
      this.triggerChange()
    },
    boundary () {
      this.triggerChange()
    },
    flip () {
      this.triggerChange()
    }
  },
  mounted () {
    this.triggerChange()
  }
}
</script>
