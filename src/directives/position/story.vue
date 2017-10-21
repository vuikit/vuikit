<template>
  <div class="uk-padding">
    <div class="uk-height-viewport uk-flex uk-flex-center uk-flex-middle">
      <div>

        <div
          ref="placeholder"
          :style="{ width: '350px' }"
          class="uk-panel uk-placeholder uk-padding-small uk-text-center"
        >
          <div class="uk-clearfix uk-margin">
            <div class="uk-button-group uk-float-left">
              <pos-button position="left-top" />
              <pos-button position="top-left" />
            </div>
            <div class="uk-button-group">
              <pos-button position="top-center" />
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
            </div>
            <div class="uk-button-group uk-float-right">
              <pos-button position="bottom-right" />
              <pos-button position="right-bottom" />
            </div>
          </div>
        </div>

        <div class="uk-margin-xlarge-top">
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
        <div>
          Target
          <a :class="{
              'uk-link-reset': target === $refs.placeholder
            }"
            v-text="'button'"
            @click.prevent="target = activeButton"
          ></a>
          /
          <a :class="{
              'uk-link-reset': target !== $refs.placeholder
            }"
            v-text="'placeholder'"
            @click.prevent="target = $refs.placeholder"
          ></a>
        </div>

      </div>
    </div>

    <div
      :style="{
        zIndex: 888,
        position: 'absolute'
      }"
      v-vk-position="{ target, position, boundary, flip }">
      <div class="uk-background-primary uk-padding-small uk-light uk-text-center uk-text-small">
        {{ position }}
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
      style={{
        zIndex: 999
      }}
      class={{
        'uk-active': this.$parent.position === this.position
      }}
      onMouseenter={ e => {
        this.$parent.position = this.position

        // don't override placeholder target
        if (this.$parent.target !== this.$parent.$refs.placeholder) {
          this.$parent.target = e.target
        }

        this.$forceUpdate()
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
    show: false,
    flip: false,
    position: 'left-top',
    target: null,
    boundary: null, // defaults to window
    content: 'Lorem ipsum'
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
