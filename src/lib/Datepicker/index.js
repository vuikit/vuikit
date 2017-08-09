import Moment from 'moment'
import render from './render'

export default {
  name: 'VkDatepicker',
  render,
  props: {
    year: {},
    month: {},
    dates: {
      type: Array,
      default: () => []
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    // the minimum date that can be selected
    min: {
      type: [String, Number],
      default: '1980-01-01'
    },
    // the maximum date that can be selected
    max: {
      type: [String, Number],
      default: '2050-12-31'
    }
  },
  computed: {
    datesMoments () {
      return this.dates.map(d => Moment(d))
    },
    disabledDatesMoments () {
      return this.disabledDates.map(d => Moment(d))
    },
    minMoment () {
      return Number.isInteger(this.min)
        ? Moment().add(-this.min - 1, 'days')
        : Moment(this.min || this.$options.props.min.default)
    },
    maxMoment () {
      return Number.isInteger(this.max)
        ? Moment().add(this.max, 'days')
        : Moment(this.max || this.$options.props.max.default)
    }
  },
  methods: {
    isPicked (date) {
      return this.datesMoments.some(d => d.format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
    },
    isDisabled (date) {
      return !date.isBetween(this.minMoment, this.maxMoment) ||
        this.disabledDatesMoments.some(d =>
          d.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        )
    },
    toggle (date) {
      this.isPicked(date)
        ? this.$emit('unpick', date)
        : this.$emit('pick', date)
    }
  }
}
