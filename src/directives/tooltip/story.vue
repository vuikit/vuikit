<template>
  <div class="uk-padding ">

    <div class="uk-flex uk-flex-center uk-flex-column">

      <div class="uk-flex uk-flex-center">
        <div
          ref="placeholder"
          :style="{ width: '230px' }"
          class="uk-panel uk-placeholder uk-padding-small uk-text-center"
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

      <div class="uk-text-center">
        Boundary
        <a :class="{
            'uk-link-reset': flip === true
          }"
          v-text="'none'"
          @click.prevent="flip = false"
        ></a>
        /
        <a
          :class="{
            'uk-link-reset': boundary !== null || flip === false
          }"
          v-text="'window'"
          @click.prevent="boundary = null, flip = true"
        ></a>
        /
        <a
          :class="{
            'uk-link-reset': boundary === null || flip === false
          }"
          v-text="'placeholder'"
          @click.prevent="boundary = $refs.placeholder, flip = true"
        ></a>
      </div>

      <div class="uk-text-center">
        Delay
        <a :class="{
            'uk-link-reset': delay !== 0
          }"
          v-text="'0ms'"
          @click.prevent="delay = 0"
        ></a> / <a :class="{
            'uk-link-reset': delay === 0
          }"
          v-text="'300ms'"
          @click.prevent="delay = 300"
        ></a>
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

    return <vk-button
      size="small"
      v-vk-tooltip={{
        content: this.position,
        position: this.position,
        flip: this.$parent.flip,
        boundary: this.$parent.boundary,
        delay: this.$parent.delay
      }}
    >
      { label }
    </vk-button>
  }
}

export default {
  components: {
    PosButton
  },
  data: () => ({
    delay: 0,
    flip: false,
    boundary: null
  }),
  computed: {
    activeButton () {
      return this.$children
        .filter(c => c && c.position === this.position)[0].$el
    }
  },
  mounted () {
    this.target = this.$refs.placeholder
    this.boundary = this.$refs.placeholder
  }
}
</script>
