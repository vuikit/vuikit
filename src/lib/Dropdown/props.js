export default {
  target: {
    required: true
  },
  show: {
    type: Boolean,
    default: false
  },
  blank: {
    type: Boolean,
    default: false
  },
  fixWidth: {
    type: Boolean,
    default: false
  },
  openOn: {
    type: [String, Boolean],
    default: 'click' // hover, focus, always, false
  },
  position: {
    type: String,
    default: 'bottom left'
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  offset: {
    type: String,
    default: '0 0'
  },
  offsetTarget: {
    type: String,
    default: '0 0'
  },
  constrainToWindow: {
    type: Boolean,
    default: true
  },
  constrainToParent: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  // inherited from openDelay and closeDelay
  // if not explicitly defined
  focusDelay: {
    type: Number,
    default: 0
  },
  blurDelay: {
    type: Number,
    default: 0
  },
  hoverOpenDelay: {
    type: Number,
    default: 0
  },
  hoverCloseDelay: {
    type: Number,
    default: 0
  },
  tetherOptions: {
    type: Object,
    default: () => ({})
  }
}
