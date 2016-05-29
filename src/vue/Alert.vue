<template>
  <div
    v-if="show"
    transition="fade"
    class="uk-alert"
    :class="{
      'uk-alert-success': style === 'success',
      'uk-alert-warning': style === 'warning',
      'uk-alert-danger': style === 'danger',
      'uk-alert-large': size === 'large'
    }">
    <a href=""
      class="uk-close uk-alert-close"
      v-if="close"
      @click.prevent="toggleMessage()">
    </a>
    <slot></slot>
  </div>
</template>

<script>
import UI from 'uikit'
import Vue from 'vue'

export default {
  props: {
    style: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Object,
      default: () => ({
        duration: 200,
        fade: true
      })
    }
  },
  computed: {
    transitionOptions: function () {
      return Vue.util.extend(this.$options.props.transition.default(), this.transition)
    }
  },
  methods: {
    toggleMessage () {
      this.show = !this.show
    }
  },
  transitions: {
    fade: {
      css: false,
      leave: function (el, done) {
        if (this.transitionOptions.fade) {
          UI.$(el).animate({opacity: 0}, this.transitionOptions.duration, done)
        } else {
          done()
        }
      }
    }
  }
}
</script>
