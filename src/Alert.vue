<template>
  <div v-if="show"
    transition="fade"
    class="uk-alert"
    :class="{
      'uk-alert-success': color === 'success',
      'uk-alert-warning': color === 'warning',
      'uk-alert-danger': color === 'danger',
      'uk-alert-large': large
    }">
    <a href="" class="uk-close"
      v-if="!block"
      @click.prevent="show = !show">
    </a>
    <slot></slot>
  </div>
</template>

<script>
import UI from 'uikit'
import { merge } from 'lodash'

export default {
  props: {
    // display status
    show: {
      type: Boolean,
      default: true
    },
    // color modifier
    color: {
      type: String,
      default: ''
    },
    // size modifier
    large: {
      type: Boolean,
      default: false
    },
    // when blocked can't be
    // closed by user action
    block: {
      type: Boolean,
      default: false
    },
    // on close transition
    transition: {
      type: Object,
      default: () => ({
        duration: 200,
        fade: true
      })
    }
  },
  computed: {
    transitionOptions () {
      return merge(this.$options.props.transition.default(), this.transition)
    }
  },
  transitions: {
    fade: {
      css: false,
      leave: function (el, done) {
        if (this.transitionOptions.fade) {
          UI.$(el).animate({ opacity: 0 }, this.transitionOptions.duration, done)
        } else {
          done()
        }
      }
    }
  }
}
</script>
