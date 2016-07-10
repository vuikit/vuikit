<template>
  <div>
    <div class="uk-datepicker-nav">
      <a href="" class="uk-datepicker-previous"
        v-if="isDisplayable(prevMonth)"
        @click.prevent="date = prevMonth">
      </a>
      <a href="" class="uk-datepicker-next"
        v-if="isDisplayable(nextMonth)"
        @click.prevent="date = nextMonth">
      </a>
      <div class="uk-datepicker-heading">
        <span class="uk-form-select">
          <a href=""
            v-text="date | format 'MMMM'"
            @click.prevent>
          </a>
          <select v-model="month">
            <option v-for="(m, name) in monthsList"
              :value="m"
              v-text="name">
            </option>
          </select>
        </span>
        <span class="uk-form-select">
          <a href=""
            v-text="date | format 'YYYY'"
            @click.prevent>
          </a>
          <select v-model="year">
            <option v-for="year in yearsList"
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
          <th v-for="day in listWeekDays" v-text="day"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in matrix">
          <td v-for="day in week"
            track-by="$index">
            <a href=""
              :class="{
                'uk-active': isSelected(day),
                'uk-datepicker-table-disabled': isDisabled(day) && !isSelected(day),
                'uk-datepicker-table-muted': !isInCurrentMonth(day) || isDisabled(day)
              }"
              @click.prevent="$emit('select', day)"
              v-text="day | format 'D'">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import momentMixin from './mixins/moment'
import {
  validDate,
  getCalendarMatrix,
  listWeekDays,
  listYears,
  listMonths,
  isToday,
  isBetween
} from './utils/dates'

export default {
  mixins: [momentMixin],
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
    // the disabled days
    disabledDates: {
      type: Array,
      default: () => []
    },
    // the selected days
    selectedDates: {
      type: Array,
      default: () => []
    },
    locale: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    yearsList () {
      return listYears(this.minMoment, this.maxMoment)
    },
    monthsList () {
      return listMonths(this.date.year(), this.minMoment, this.maxMoment)
    },
    listWeekDays,
    date: {
      get () {
        return this.$moment().set({ year: this.year, month: this.month })
      },
      set (moment) {
        this.year = moment.year()
        this.month = moment.month()
      }
    },
    matrix () {
      this.$nextTick(() => this.$emit('update'))
      return getCalendarMatrix(this.date)
    },
    prevMonth () {
      return this.date.clone().subtract(1, 'month')
    },
    nextMonth () {
      return this.date.clone().add(1, 'month')
    },
    _disabledDates () {
      return this.disabledDates.map(date => this.$moment(date))
    },
    _selectedDates () {
      return this.selectedDates.map(date => this.$moment(date))
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
    }
  },
  methods: {
    isToday,
    isDisabled (moment) {
      return this._disabledDates.some(date => moment.isSame(date, 'day'))
    },
    isSelected (moment) {
      return this._selectedDates.some(date => moment.isSame(date, 'day'))
    },
    isDisplayable (moment) {
      return isBetween(moment, this.minMoment, this.maxMoment)
    },
    isInCurrentMonth (moment) {
      return moment.isSame(this.date, 'month')
    }
  }
}
</script>
