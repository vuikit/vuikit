<template>
  <div>
    <div class="uk-datepicker-nav">
      <a class="uk-datepicker-previous"
        v-show="isMonthDisplayable(prevMonth)"
        @click.prevent="triggerChangeEvent(prevMonth)">
      </a>
      <a class="uk-datepicker-next"
        v-show="isMonthDisplayable(nextMonth)"
        @click.prevent="triggerChangeEvent(nextMonth)">
      </a>
      <picker-header></picker-header>
    </div>
    <table class="uk-datepicker-table">
      <thead>
        <tr>
          <th v-for="day in weekDays">
            {{ format(day, 'ddd') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in matrix">
          <td v-for="(date, index) in week">
            <a :class="{
              'uk-active': isPicked(date),
              'uk-datepicker-table-disabled': isDisabled(date),
              'uk-datepicker-table-muted': !isCurrentMonth(date) || isDisabled(date)
            }" @click.prevent="!isDisabled(date) && (isPicked(date)
              ? triggerUnpickEvent(date)
              : triggerPickEvent (date)
            )">
              {{ format(date, 'D') }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import isSameMonth from 'date-fns/is_same_month'
import isSameDay from 'date-fns/is_same_day'
import isWithinRange from 'date-fns/is_within_range'
import isValid from 'date-fns/is_valid'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import startOfMonth from 'date-fns/start_of_month'
import startOfWeek from 'date-fns/start_of_week'
import endOfMonth from 'date-fns/end_of_month'
import addMonths from 'date-fns/add_months'
import addDays from 'date-fns/add_days'
import subMonths from 'date-fns/sub_months'
import subDays from 'date-fns/sub_days'
import formatDate from 'date-fns/format'
import parse from 'date-fns/parse'
import PickerHeader from './Header'
import dateMatrix from 'helpers/date-matrix'
import { range, isInteger } from 'src/js/util/index'

export default {
  name: 'VkDatepicker',
  components: {
    PickerHeader
  },
  props: {
    date: {
      type: [Date, String, Number],
      default: () => Date.now(),
      validator: date => isValid(parse(date))
    },
    // index first day week (0 - Sunday)
    weekStartsOn: {
      type: Number,
      default: 0
    },
    locale: {
      type: Object,
      default: () => ({})
    },
    pickedDates: {
      type: Array,
      default: () => []
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    // the minimum and maximum selectable dates
    // if Number, is relative from today
    minDate: {
      type: [Date, String, Number],
      default: '1980-01-01',
      validator: date => {
        return isInteger(date)
          ? true
          : isValid(parse(date))
      }
    },
    maxDate: {
      type: [Date, String, Number],
      default: '2050-12-31',
      validator: date => {
        return isInteger(date)
          ? true
          : isValid(parse(date))
      }
    }
  },
  computed: {
    matrix () {
      return dateMatrix({
        year: getYear(this.date),
        month: getMonth(this.date),
        weekStartsOn: this.weekStartsOn
      })
    },
    prevMonth () {
      return this.format(subMonths(this.date, 1), 'YYYY-MM')
    },
    nextMonth () {
      return this.format(addMonths(this.date, 1), 'YYYY-MM')
    },
    minPickableDate () {
      return isInteger(this.minDate)
        ? subDays(Date.now(), this.minDate + 1)
        : this.minDate
    },
    maxPickableDate () {
      return isInteger(this.maxDate)
        ? addDays(Date.now(), this.maxDate)
        : this.maxDate
    },
    weekDays () {
      let startDay = startOfWeek(this.date, { weekStartsOn: this.weekStartsOn })
      return range(7).map((val, index) => addDays(startDay, index))
    }
  },
  methods: {
    triggerChangeEvent (newDate) {
      this.$emit('change', {
        date: newDate,
        format: this.format
      })
    },
    triggerPickEvent (pickedDate) {
      const dirtyPickedDays = [...this.pickedDates, ...[pickedDate]]
      this.$emit('pick', {
        date: pickedDate,
        dates: dirtyPickedDays,
        format: this.format
      })
    },
    triggerUnpickEvent (unpickedDate) {
      const dirtyPickedDays = [...this.pickedDates]
      const index = dirtyPickedDays.findIndex(d => getDate(d) === getDate(unpickedDate))
      dirtyPickedDays.splice(index, 1)
      this.$emit('unpick', {
        date: parse(unpickedDate),
        dates: dirtyPickedDays,
        format: this.format
      })
    },
    isCurrentMonth (date) {
      return isSameMonth(this.date, date)
    },
    isPicked (date) {
      return this.pickedDates.some(d => isSameDay(d, date))
    },
    isDisabled (date) {
      return this.disabledDates.some(d => isSameDay(d, date)) ||
        !isWithinRange(date, this.minPickableDate, this.maxPickableDate)
    },
    isMonthDisplayable (date) {
      return areRangesOverlapping(
        startOfMonth(date),
        endOfMonth(date),
        this.minPickableDate,
        this.maxPickableDate
      )
    },
    format (date, format) {
      return formatDate(date, format, { locale: this.locale })
    }
  }
}
</script>
