import Vue from 'vue'
import { each } from 'lodash'

export default {
  ready: function () {
    if (this.$refs.demo) {
      each(this.events, (obj, $event) => {
        // preset the emited property on the fly
        Vue.set(obj, 'emited')
        // fires emited signal when events triggered
        this.$refs.demo.$on($event, () => {
          this.events[$event].emited = true
        })
      })
    }
  }
}
