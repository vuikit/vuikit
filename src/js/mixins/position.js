import { flipPosition, getPosition, toNumber } from '../util/index'

export default {
  props: {
    animation: {
      type: String,
      default: ''
    },
    flip: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [String, Boolean],
      default: false
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    top: '',
    left: ''
  }),
  computed: {
    pos () {
      return (this.position + (!~this.position.indexOf('-') ? '-center' : '')).split('-')
    },
    dir () {
      return this.pos[0]
    },
    align () {
      return this.pos[1]
    }
  },
  methods: {
    positionAt (element, target, boundary) {
      const offset = toNumber(this.offset) || 0
      const axis = this.getAxis()
      const flipped = getPosition(
        element,
        target,
        axis === 'x'
          ? `${flipPosition(this.dir)} ${this.align}`
          : `${this.align} ${flipPosition(this.dir)}`,
        axis === 'x'
          ? `${this.dir} ${this.align}`
          : `${this.align} ${this.dir}`,
        axis === 'x'
          ? `${this.dir === 'left'
            ? -1 * offset : offset}`
            : ` ${this.dir === 'top' ? -1 * offset : offset}`,
        null,
        this.flip,
        boundary
      )

      this.top = flipped.top
      this.left = flipped.left

      this.dir = axis === 'x'
        ? flipped.target.x
        : flipped.target.y
      this.align = axis === 'x'
        ? flipped.target.y
        : flipped.target.x
    },
    getAxis () {
      return this.pos[0] === 'top' || this.pos[0] === 'bottom'
        ? 'y'
        : 'x'
    }
  },
  created () {
    this.dir = this.pos[0]
    this.align = this.pos[1]
  }
}
