<template>
  <ul class="uk-switcher">
    <slot></slot>
  </ul>
</template>

<script>
import Vue from 'vue'
import UI from 'uikit'

export default {
  props: {
    // the nav el or component that
    // the switcher relies on
    connect: {
      required: true
    },
    animation: {
      type: String,
      default: ''
    },
    swiping: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    nav () {
      return Vue.util.isPlainObject(this.connect) && this.connect.$el
        ? this.connect.$el
        : this.connect
    }
  },
  ready () {
    const vm = this
    // in our impelmentation the switcher
    // and connect change sides
    UI.switcher(this.nav, UI.Utils.options({
      connect: this.$el,
      animation: this.animation,
      swiping: this.swiping
    }))
    // listen to nav changes
    .on('show.uk.switcher', function (event, area) {
      vm.$emit('change')
    })
  }
}
</script>
