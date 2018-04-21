import { isRtl } from 'vuikit/src/util/env'

export default {
  target: {},
  boundary: {},
  boundaryAlign: {
    type: Boolean,
    default: false
  },
  flip: {
    type: [String, Boolean],
    default: true
  },
  position: {
    type: String,
    default: `bottom-${isRtl ? 'right' : 'left'}`,
    validator: pos =>
      /^(top|bottom)-(left|right|center|justify)$/.test(pos) ||
      /^(left|right)-(top|bottom|center|justify)$/.test(pos)
  },
  offset: {
    type: [Boolean, Number],
    default: false
  },
  animation: {
    type: String,
    default: 'fade'
  },
  duration: {
    type: Number,
    default: 200
  },
  mode: {
    type: String,
    default: 'click hover'
  },
  delayShow: {
    type: Number,
    default: 0
  },
  delayHide: {
    type: Number,
    default: 800
  },
  mainClass: {
    type: String,
    default: 'uk-drop'
  }
}
