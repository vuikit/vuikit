import Popper from 'popper.js'

export default {
  name: 'VkDropdown',
  props: {
    // dom element reference,
    // defaults to parent
    target: null,
    /* [top|right|bottom|left]-[left|center|right] */
    position: {
      type: String,
      default: 'bottom-left'
    },
    animation: {
      type: String,
      default: ''
    },
    flip: {
      type: Boolean,
      default: true
    },
    offset: {
      type: String,
      default: '0 5px'
    },
    modifiers: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    targetElement () {
      // defaults to originalParentEl which remains
      // even when the dropdown dom is removed
      return this.target || this.$options._parentElm
    },
    placement () {
      // translate position to popper.js placement
      return this.position
        .replace(/-(left|top)/, '-start')
        .replace(/-(right|bottom)/, '-end')
        .replace(/-(center|justify)/, '')
    },
    enterActiveClass () {
      const classes = this.animation.split(',').map(c => c.trim()).filter(c => c)
      return classes[0] || ' '
    },
    leaveActiveClass () {
      const classes = this.animation.split(',').map(c => c.trim()).filter(c => c)
      return (classes[1] || classes[0]) || ' '
    }
  },
  beforeUpdate () {
    // update popper
    this.$popper.options.placement = this.placement
    this.$popper.update()
  },
  mounted () {
    // move dom to body
    document.body.appendChild(this.$el)

    // init popper
    this.$popper = new Popper(
      this.targetElement,
      this.$el,
      {
        placement: this.placement,
        modifiers: {
          ...this.modifiers,
          flip: { enabled: this.flip },
          applyStyle: { enabled: false },
          offset: {
            offset: this.offset
          },
          applyCustomStyles: {
            enabled: true,
            function: (data) => {
              this.$el.style.top = data.offsets.popper.top + 'px'
              this.$el.style.left = data.offsets.popper.left + 'px'
            },
            order: 800
          }
        }
      }
    )

    // schedule an update to make sure everything gets positioned correct
    // after being instantiated
    this.$popper.scheduleUpdate()
  }
}
