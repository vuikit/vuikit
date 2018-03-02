import { on, off } from 'vuikit/src/util/event'

// A mixin that maps on/off events methods saving the
// off reference for a cleanup on destroy
export default {
  methods: {
    on (...args) {
      this._vk_events_off.push(on(...args))
    },
    off (...args) {
      off(...args)
    }
  },
  created () {
    this._vk_events_off = []
  },
  beforeDestroy () {
    this._vk_events_off.forEach(off => off())
  }
}
