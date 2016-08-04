<script>
import moment from './mixins/moment'
import { flatten } from 'lodash'
import { getCalendarMatrix, isBetween } from './helpers/dates'

export default {
  name: 'VkDatepicker',
  render (h) {
    if (this.$slots.default !== undefined) {
      const calendarVnode = this.$slots.default[0]
      calendarVnode.componentOptions.children = () => {
        return [
          h('PickDate', {
            props: {
              date: calendarVnode.child.$renderingDate,
              $datepicker: this,
              $calendar: calendarVnode.child
            }
          })
        ]
      }
      return calendarVnode
    }
  },
  mixins: [moment],
  components: {
    PickDate: {
      functional: true,
      props: ['date', '$datepicker', '$calendar'],
      render (h, { props }) {
        const $datepicker = props.$datepicker
        const $calendar = props.$calendar
        return (
          <a class={{
            'uk-active': $datepicker.isPicked(props.date),
            'uk-datepicker-table-disabled': $datepicker.isDisabled(props.date),
            'uk-datepicker-table-muted': !$calendar.isInCurrentMonth(props.date) ||
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
    }
  },
  props: {
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
    minMoment () {
      return Number.isInteger(this.min)
        ? this.$moment().add(-this.min - 1, 'days')
        : this.$moment(this.min || this.$options.props.min.default)
    },
    maxMoment () {
      return Number.isInteger(this.max)
        ? this.$moment().add(this.max, 'days')
        : this.$moment(this.max || this.$options.props.max.default)
    },
    disabledDatesRange () {
      const min = this.minMoment
      const max = this.maxMoment
      const matrix = this.$refs.calendar
        ? this.$refs.calendar.matrix
        : getCalendarMatrix(this.$moment())
      return flatten(matrix).filter(moment => {
        return !isBetween(moment, min, max)
      })
    }
  },
  methods: {
    isPicked (moment) {
      return this.dates
        .map(date => this.$moment(date))
        .filter(date => !this.isDisabled(date)) // exclude disabled dates
        .some(date => moment.isSame(date, 'day'))
    },
    isDisabled (moment) {
      const dates = this.disabledDates.map(date => this.$moment(date))
      const datesRange = this.disabledDatesRange
      return dates.concat(datesRange).some(date => moment.isSame(date, 'day'))
    },
    toggle (moment) {
      this.isPicked(moment)
        ? this.$emit('unpick', moment)
        : this.$emit('pick', moment)
    }
  }
}
</script>
