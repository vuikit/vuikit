<template>
  <div>
    <vk-calendar
      :year="calendarYear"
      :month="calendarMonth"
      :min="calendarMin"
      :max="calendarMax"
      :locale="calendarLocale"
      :template="calendarTemplate"
      @update="$emit('calendar-update', $arguments[0])">
      <a href=""
        :class="{
          'uk-active': isPicked($day),
          'uk-datepicker-table-disabled': isDisabled($day),
          'uk-datepicker-table-muted': !isInCalendarMonth($day) || isDisabled($day)
        }"
        @click.prevent="pick($day)"
        v-text="$day | format 'D'">
      </a>
    </vk-calendar>
  </div>
</template>

<script>
import moment from './mixins/moment'
import { flatten, merge, mapKeys, upperFirst } from 'lodash'
import { getCalendarMatrix, isBetween } from './helpers/dates'
import Calendar from './Calendar'

export default {
  name: 'VkDatepicker',
  mixins: [moment],
  components: {
    VkCalendar: Calendar
  },
  compiled () {
    // init picked array
    this.picked = this.prePicked
      .map(date => this.$moment(date))
      .filter(date => !this.isDisabled(date))
  },
  data () {
    return {
      // currently picked dates
      picked: []
    }
  },
  props: merge({
    // multi picks support
    multi: {
      type: Boolean,
      default: false
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
    },
    prePicked: {
      type: Array,
      default: () => []
    },
    disabledDates: {
      type: Array,
      default: () => []
    }
  }, // get and prefix subcomponent props
    mapKeys(Calendar.props, (value, key) => 'calendar' + upperFirst(key))
  ),
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
    _disabledDates () {
      return this.disabledDates.map(date => this.$moment(date))
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
    pick (moment) {
      if (this.isDisabled(moment)) {
        return
      }
      this.isPicked(moment)
        ? this.doUnpick(moment)
        : this.doPick(moment)
    },
    doPick (moment) {
      this.multi
        ? this.picked.push(moment)
        : this.picked = [moment]
      this.$emit('pick', moment, this.picked)
    },
    doUnpick (moment) {
      this.picked.splice(this.picked.indexOf(moment), 1)
      this.$emit('unpick', moment, this.picked)
    },
    isDisabled (moment) {
      const dates = this.disabledDates.map(date => this.$moment(date))
      const datesRange = this.disabledDatesRange
      return dates.concat(datesRange).some(date => moment.isSame(date, 'day'))
    },
    isPicked (moment) {
      return this.picked.some(date => moment.isSame(date, 'day'))
    },
    isInCalendarMonth (moment) {
      const calendarMonth = this.$refs.calendar
        ? this.$refs.calendar.month
        : (new Date()).getMonth() // current month
      return calendarMonth === moment.month()
    }
  }
}
</script>
