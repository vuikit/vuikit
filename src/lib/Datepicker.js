import Moment from 'moment'

export default {
  name: 'VkDatepicker',
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
  render (h) {
    return (
      <vk-calendar
        year={ this.year }
        month={ this.month }
        date-render={ DateRender }
        on-change={date => this.$emit('change', date)}>
      </vk-calendar>
    )
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
      return this.disabledDatesMoments.some(d =>
        d.format('YYYY-MM-DD') === date.format('YYYY-MM-DD') ||
        !date.isBetween(this.minMoment, this.maxMoment)
      )
    },
    toggle (date) {
      this.isPicked(date)
        ? this.$emit('unpick', date)
        : this.$emit('pick', date)
    }
  }
}

const DateRender = function (h, { props, parent }) {
  const $calendar = parent
  const $datepicker = parent.$parent
  return (
    <a class={{
      'uk-active': $datepicker.isPicked(props.date),
      'uk-datepicker-table-disabled': $datepicker.isDisabled(props.date),
      'uk-datepicker-table-muted': props.date.month() !== $calendar.month ||
        $datepicker.isDisabled(props.date)
    }} on-click={() => {
      if (!$datepicker.isDisabled(props.date)) {
        $datepicker.toggle(props.date)
      }
    }}>
      { props.date.format('D') }
    </a>
  )
}
