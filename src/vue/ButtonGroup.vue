<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import UI from 'uikit'

export default {
  props: {
    value: {},
    group: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes: function () {
      return {
        'uk-button-group': this.group
      }
    }
  },
  methods: {
    getActiveButtons () {
      const actives = []
      for (var i = 0, len = this.$children.length; i < len; i++) {
        const btn = this.$children[i]
        if (UI.$(btn.$el).hasClass('uk-active')) {
          actives.push(btn)
        }
      }
      return actives
    }
  },
  ready: function () {
    // internal click event
    UI.$(this.$el).on('change.uk.button', () => this.$emit('_click'))
  }
}
</script>
