<template>
  <input v-el:input
    type="text"
    v-model="value"
    @focus="show = true">
</template>

<script>
import Calendar from './Calendar'
import moment from './mixins/moment'
import $ from 'jquery'
import UI from 'uikit'
import { flatten } from 'lodash'
import { getCalendarMatrix, isBetween } from './utils/dates'

// dropdown layout is separated to avoid fragment instance
// http://vuejs.org/guide/components.html#Fragment-Instance
const dropdownTmpl =
`<div v-el:dropdown
  class="uk-dropdown uk-datepicker"
  :style="dropdownCss">
  <calendar v-ref:calendar
    :min="minDateMoment"
    :max="maxDateMoment"
    :disabled-dates="disabledDates"
    :selected-dates="selectedDates"
    :locale="locale"
    @select="select"
    @update="$emit('update')">
  </calendar>
</div>`

export default {
  mixins: [moment],
  components: {
    Calendar
  },
  data () {
    return {
      show: false
    }
  },
  ready () {
    if (this.displayDropdown) {
      this.renderDropdown()
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // dropdown position
    position: {
      type: String,
      default: 'auto' // auto, top, bottom
    },
    // the dropdown vertical offset
    offset: {
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
    displayDropdown () {
      return this.mobile || (!UI.support.touch && $(this.$els.input).attr('type') !== 'date')
    },
    dropdownCss () {
      if (!this.show) {
        return { display: 'none' }
      }
      const input = $(this.$els.input)
      const dropdown = $(this.$els.dropdown)
      const offset = input.offset()
      const posTop = (
        (offset.top - input.outerHeight() + input.height()) -
        this.offset - dropdown.outerHeight()
      )
      const posBottom = offset.top + input.outerHeight() + this.offset
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
      this.$emit('select', moment)
      if (!this.isDisabled(moment) && !moment.isSame(this.selected, 'day')) {
        this.selected = moment.clone()
        // trigger change event
        this.$nextTick(() => this.$emit('change', this.selected))
        // hide dropdown
        this.show = false
      }
    },
    renderDropdown () {
      const node = document.createElement('div')
      node.innerHTML = dropdownTmpl
      document.body.appendChild(node)
      this.$compile(node, this, this._scope, this._frag)
      // hide dropdown on outter click/focus
      const vm = this
      $('html').on('click focus', '*', function (e) {
        if (vm.show &&
          e.target !== vm.$els.dropdown &&
          e.target !== vm.$els.input &&
          !$(e.target).parents('.uk-datepicker:first').length
        ) {
          vm.show = false
        }
      })
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
