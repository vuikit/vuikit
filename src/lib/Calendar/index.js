import Moment from 'moment'
import render from './render'
import momentMixin from '../mixins/moment'
import { range } from 'lodash'
import {
  validDate,
  getCalendarMatrix,
  isToday
} from '../../helpers/date'

export default {
  name: 'VkCalendar',
  mixins: [momentMixin],
  render,
  props: {
    // currently displayed year
    year: {
      type: Number,
      default () {
        return (new Date()).getFullYear() // this year
      }
    },
    // currently displayed month
    month: {
      type: Number, // from 0 to 11
      default () {
        return (new Date()).getMonth() // this month
      }
    },
    // the minimum month that can be displayed
    // supports all moment.js formats
    min: {
      type: [String, Number, Object, Array],
      default: '1980-01-01',
      validator: validDate
    },
    // the maximum month that can be displayed
    // supports all moment.js formats
    max: {
      type: [String, Number, Object, Array],
      default: '2050-12-31',
      validator: validDate
    },
    locale: {
      type: Object,
      default: () => ({})
    },
    dateRender: {
      type: [Function, Boolean],
      default: false
    }
  },
  computed: {
    selectedYear: {
      get () {
        return this.year
      },
      set (year) {
        const date = this.$moment().set({ year, month: this.month })
        this.$emit('change', date)
      }
    },
    selectedMonth: {
      get () {
        return this.month
      },
      set (month) {
        const date = this.$moment().set({ year: this.year, month })
        this.$emit('change', date)
      }
    },
    date () {
      return this.$moment().set({ year: this.year, month: this.month })
    },
    weeks () {
      return getCalendarMatrix(this.date)
    },
    prevMonth () {
      return this.date.clone().subtract(1, 'month')
    },
    nextMonth () {
      return this.date.clone().add(1, 'month')
    },
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
    // get the years list
    listYears () {
      const dates = []
      let currentDate = Moment(this.minMoment)
      while (currentDate <= this.maxMoment) {
        dates.push({
          text: currentDate.year(),
          value: currentDate.year()
        })
        currentDate = Moment(currentDate).add(1, 'year')
      }
      return dates
    },
    // get the months list
    listMonths () {
      const currentYear = this.year
      const min = this.minMoment
      const max = this.maxMoment
      const inMinYear = currentYear === min.year()
      const inMaxYear = currentYear === max.year()
      const months = []
      Moment.months().forEach((name, m) => {
        if ((!inMinYear || m >= min.month()) && (!inMaxYear || m <= max.month())) {
          months.push({ text: name, value: m })
        }
      })
      return months
    },
    weekDays () {
      return range(0, 7).map((val, index) =>
        Moment().weekday(index).format('ddd')
      )
    }
  },
  methods: {
    isToday,
    isDisplayable (moment) {
      return moment.isBetween(this.minMoment, this.maxMoment)
    }
  }
}
