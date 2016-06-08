<template>
  <input type="text"
    v-el:input
    v-model="value"
    @focus="show = true">
  <div class="uk-dropdown uk-datepicker"
    v-if="renderDropdown"
    v-el:dropdown
    :style="dropdownCss">
    <calendar v-ref:calendar
      :min="minDateMoment"
      :max="maxDateMoment"
      :disabled-dates="disabledDates"
      :selected-dates="selectedDates"
      :locale="locale"
      @select="select">
    </calendar>
  </div>
</template>

<script>
import Calendar from './Calendar'
import moment from './mixins/moment'
import UI from 'uikit'
import { flatten } from 'lodash'
import { getCalendarMatrix, isBetween } from './utils/dates'

export default {
  components: {
    Calendar
  },
  init () {
    // this.$options.template = '<input>'
  },
  mixins: [moment],
  ready () {
    const vm = this
    // hide dropdown on outter click/focus
    if (this.renderDropdown) {
      UI.$html.on('click focus', '*', function (e) {
        if (vm.show &&
          e.target !== vm.$els.dropdown &&
          e.target !== vm.$els.input &&
          !UI.$(e.target).parents('.uk-datepicker:first').length
        ) {
          vm.show = false
        }
      })
    }
  },
  props: {
    value: {
      type: [String, Object],
      required: true
    },
    // dropdown position
    position: {
      type: String,
      default: 'auto' // auto, top or bottom
    },
    // the dropdown offset
    offsetTop: {
      type: Number,
      default: 5
    },
    // display dropdown on mobiles
    mobile: {
      type: Boolean,
      default: false
    },
    // the minimum date that can be selected
    minDate: {
      type: [String, Number],
      default: '1980-01-01'
    },
    // the maximum date that can be selected
    maxDate: {
      type: [String, Number],
      default: '2050-12-31'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    locale: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    // the selected date
    selected: {
      get () {
        return this.value && this.$moment(this.value).isValid()
          ? this.$moment(this.value)
          : null
      },
      set: function (moment) {
        this.value = moment.format(this.format)
      }
    },
    // should dropdown display on touch
    // devices or use native picker
    renderDropdown () {
      return this.mobile || (!UI.support.touch && UI.$(this.$els.input).attr('type') !== 'date')
    },
    dropdownCss () {
      if (!this.show) {
        return { display: 'none' }
      }
      const input = UI.$(this.$els.input)
      const dropdown = UI.$(this.$els.dropdown)
      const offset = input.offset()
      const posTop = (
        (offset.top - input.outerHeight() + input.height()) -
        this.offsetTop - dropdown.outerHeight()
      )
      const posBottom = offset.top + input.outerHeight() + this.offsetTop
      const css = { left: offset.left, right: '' }
      if (UI.langdirection === 'right') {
        css.right = window.innerWidth - (css.left + input.outerWidth())
        css.left = ''
      }
      css.top = posBottom
      if (this.position === 'top') {
        css.top = posTop
      } else if (this.position === 'auto' &&
        (window.innerHeight - posBottom - dropdown.outerHeight() < 0 && posTop >= 0)
      ) {
        css.top = posTop
      }
      return {
        top: `${css.top}px`,
        left: `${css.left}px`,
        right: `${css.right}px`,
        display: 'block'
      }
    },
    minDateMoment () {
      return Number.isInteger(this.minDate)
        ? this.$moment().add(-this.minDate - 1, 'days')
        : this.$moment(this.minDate || this.$options.props.minDate.default)
    },
    maxDateMoment () {
      return Number.isInteger(this.maxDate)
        ? this.$moment().add(this.maxDate, 'days')
        : this.$moment(this.maxDate || this.$options.props.maxDate.default)
    },
    selectedDates () {
      return this.selected
        ? [this.selected]
        : []
    },
    disabledDates () {
      const min = this.minDateMoment
      const max = this.maxDateMoment
      const matrix = getCalendarMatrix(this.selected
        ? this.selected
        : this.$moment())
      return flatten(matrix).filter(moment => {
        return !isBetween(moment, min, max)
      })
    }
  },
  methods: {
    isDisabled (moment) {
      return this.disabledDates.some(date => moment.isSame(date, 'day'))
    },
    select (moment) {
      if (!this.isDisabled(moment) && !moment.isSame(this.selected, 'day')) {
        this.selected = moment.clone()
        // trigger change event
        this.$nextTick(() => this.$emit('change', this.selected))
        // hide dropdown
        this.show = false
      }
    }
  },
  watch: {
    show (value) {
      // trigger events
      this.$nextTick(() => this.$emit(value
        ? 'show'
        : 'hide'
      ))
    }
  },
  events: {
    hide () {
      // reset the currently displayed
      // month on the calendar
      this.$refs.calendar.month = this.selected
        ? this.selected.month()
        : this.$moment().month()
    }
  }
}
</script>
