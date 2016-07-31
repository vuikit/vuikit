<template>
  <div>
    <div class="uk-datepicker-nav">
      <a href="" class="uk-datepicker-previous"
        v-if="isDisplayable(prevMonth)"
        @click.prevent="$emit('change', prevMonth)">
      </a>
      <a href="" class="uk-datepicker-next"
        v-if="isDisplayable(nextMonth)"
        @click.prevent="$emit('change', nextMonth)">
      </a>
      <div class="uk-datepicker-heading">
        <span class="uk-form-select">
          <a href=""
            @click.prevent>
            {{ date | format('MMMM') }}
          </a>
          <select v-model="selectedMonth">
            <option v-for="month in monthsList"
              :value="month.value"
              v-text="month.text">
            </option>
          </select>
        </span>
        <span class="uk-form-select">
          <a href=""
            @click.prevent>
            {{ date | format('YYYY') }}
          </a>
          <select v-model="selectedYear">
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
          <th v-for="day in listWeekDays"
            v-text="day">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks">
          <td-day v-for="(day, index) in week"
            :key="index"
            :day="day">
          </td-day>
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
  name: 'VkCalendar',
  mixins: [momentMixin],
  beforeCreate () {
    // set component ref earlier
    // so it can be used in the slot
    const context = this.$options._parentVnode.context
    const ref = this.$options._parentVnode.data.ref
    if (ref) {
      context.$refs[ref] = this
    }
    // keep the template, null slot rendering
    this.$renderingTemplate = this.$options._renderChildren
    this.$options._renderChildren = null
  },
  components: {
    tdDay: {
      functional: true,
      render (h, { parent, data }) {
        // set rendering day
        parent.$renderingDay = data.attrs.day
        return h('td', parent.$renderingTemplate)
      }
    }
  },
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
    template: {
      type: String,
      default: ''
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
    listWeekDays,
    date () {
      return this.$moment().set({ year: this.year, month: this.month })
    },
    weeks () {
      return getCalendarMatrix(this.date)
    },
    yearsList () {
      return listYears(this.minMoment, this.maxMoment)
    },
    monthsList () {
      return listMonths(this.date.year(), this.minMoment, this.maxMoment)
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
    }
  },
  methods: {
    isToday,
    isDisplayable (moment) {
      return isBetween(moment, this.minMoment, this.maxMoment)
    },
    isInCurrentMonth (moment) {
      return moment.isSame(this.date, 'month')
    }
  }
}
</script>
