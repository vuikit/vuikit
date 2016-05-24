<template>
  <div class="uk-datepicker">
    <div class="uk-datepicker-nav">
      <a href="" class="uk-datepicker-previous"
        v-if="!isInRange(prevMonth)"
        @click.prevent="date = prevMonth">
      </a>
      <a href="" class="uk-datepicker-next"
        v-if="!isInRange(nextMonth)"
        @click.prevent="date = nextMonth">
      </a>
      <div class="uk-datepicker-heading">
        <span class="uk-form-select">
          <a href="" v-text="date | date 'MMMM'"></a>
          <select v-model="month">
            <option v-for="(i, month) in MonthsYearsList.months"
              :value="i"
              v-text="month">
            </option>
          </select>
        </span>
        <span class="uk-form-select">
          <a href="" v-text="date | date 'YYYY'"></a>
          <select v-model="year">
            <option v-for="year in MonthsYearsList.years"
              :value="year"
              v-text="year">
            </option>
          </select>
        </span>
      </div>
    </div>
    <table class="uk-datepicker-table">
      <thead>
        <tr>
          <th v-for="day in locale.weekDays" v-text="day"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in matrix">
          <td v-for="day in week"
            track-by="$index">
            <a href=""
              :class="{
                'uk-active': isSelected(day),
                'uk-datepicker-date-disabled': isInRange(day),
                'uk-datepicker-table-muted': !isInCurrentMonth(day) || isInRange(day)
              }"
              @click.prevent="select(day)"
              v-text="day | date 'D'">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import momentMixin from './mixins/moment'

export default {
  mixins: [momentMixin],
  created () {
    // update day names order to weekStart
    if (this.locale.weekStart !== 0) {
      var iterator = this.locale.weekStart
      while (iterator > 0) {
        this.locale.weekDays.push(this.locale.weekDays.shift())
        iterator--
      }
    }
  },
  props: {
    year: {
      type: Number,
      default () {
        return this.$moment().year()
      }
    },
    month: {
      type: Number, // from 0 to 11
      default () {
        return this.$moment().month()
      }
    },
    selected: {
      type: [Object, Array],
      default () {
        return this.$moment() // today
      }
    },
    minDate: {
      type: [String, Object, Number, Boolean],
      default: false
    },
    maxDate: {
      type: [String, Object, Number, Boolean],
      default: false
    },
    locale: {
      type: Object,
      default: () => ({
        weekStart: 1,
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        weekDays: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      })
    }
  },
  computed: {
    date: {
      get () {
        return this.$moment().set({ year: this.year, month: this.month })
      },
      set (moment) {
        this.year = moment.year()
        this.month = moment.month()
      }
    },
    // returns a 6x7 calendar matrix
    matrix () {
      const year = this.date.year()
      const month = this.date.month()
      const hour = this.date.hour()
      const minute = this.date.minute()
      const second = this.date.second()
      const daysInMonth = this.date.daysInMonth()
      const firstDay = this.$moment([year, month, 1])
      const lastDay = this.$moment([year, month, daysInMonth])
      const lastMonth = this.$moment(firstDay).subtract(1, 'month').month()
      const lastYear = this.$moment(firstDay).subtract(1, 'month').year()
      const daysInLastMonth = this.$moment([lastYear, lastMonth]).daysInMonth()
      const dayOfWeek = firstDay.day()
      const firstDayOfWeek = this.locale.weekStart
      // initialize a 6 rows x 7 columns array
      const matrix = []
      matrix.firstDay = firstDay
      matrix.lastDay = lastDay
      let i
      for (i = 0; i < 6; i++) {
        matrix[i] = []
      }
      // populate the matrix with date objects
      var startDay = daysInLastMonth - dayOfWeek + firstDayOfWeek + 1
      if (startDay > daysInLastMonth) {
        startDay -= 7
      }
      if (dayOfWeek === firstDayOfWeek) {
        startDay = daysInLastMonth - 6
      }
      let curDate = this.$moment([lastYear, lastMonth, startDay, 12, minute, second])
      let col
      let row
      for (i = 0, col = 0, row = 0; i < 42; i++, col++,
        curDate = this.$moment(curDate).add(24, 'hour')
      ) {
        if (i > 0 && col % 7 === 0) {
          col = 0
          row++
        }
        matrix[row][col] = curDate.clone().hour(hour).minute(minute).second(second)
        curDate.hour(12)
      }
      this.$emit('update')
      return matrix
    },
    dateLimits () {
      return {
        min: !this.minDate
          ? false
          : Number.isInteger(this.minDate)
            ? this.$moment().add(-this.minDate - 1, 'days')
            : this.getMoment(this.minDate),
        max: !this.maxDate
          ? false
          : Number.isInteger(this.maxDate)
            ? this.$moment().add(this.maxDate, 'days')
            : this.getMoment(this.maxDate).add(1, 'days')
      }
    },
    MonthsYearsList () {
      const currentYear = this.$moment().year()
      const minDate = this.dateLimits.min
      const maxDate = this.dateLimits.max
      const minYear = minDate
        ? minDate.year()
        : currentYear - 50
      const maxYear = maxDate
        ? maxDate.year()
        : currentYear + 5
      const inMinYear = currentYear === minYear
      const inMaxYear = currentYear === maxYear
      // get months
      const months = []
      for (var m = 0; m < 12; m++) {
        if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
          months.push(this.locale.months[m])
        }
      }
      // get years
      const years = []
      for (var y = minYear; y <= maxYear; y++) {
        years.push(y)
      }
      return { years, months }
    },
    prevMonth () {
      return this.date.clone().subtract(1, 'month')
    },
    nextMonth () {
      return this.date.clone().add(1, 'month')
    }
  },
  methods: {
    isInRange (moment) {
      const { min, max } = this.dateLimits
      return (min && moment.isAfter(min)) && (max && moment.isBefore(max))
    },
    isInCurrentMonth (moment) {
      return moment.isSame(this.date, 'month')
    },
    isToday (moment) {
      return moment.isSame(this.$moment(), 'day')
    },
    isSelected (moment) {
      return Vue.util.isArray(this.selected)
        ? this.selected.some(selected => selected.isSame(moment, 'day'))
        : this.selected.isSame(moment, 'day')
    },
    select (moment) {
      if (!this.isInRange(moment)) {
        this.$emit('select', moment)
      }
    }
  }
}
</script>
