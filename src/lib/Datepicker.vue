<template>
  <input type="text" v-model="value">
</template>

<script>
import Dropdown from './Dropdown'
import Calendar from './Calendar'
import moment from './mixins/moment'
import UI from 'uikit'
import { flatten } from 'lodash'
import { getCalendarMatrix, isBetween } from './utils/dates'

// dropdown layout is separated to avoid fragment instance
// http://vuejs.org/guide/components.html#Fragment-Instance
const dropdownTmpl =
`<dropdown v-ref:dropdown
  class="uk-datepicker"
  :show.sync="show"
  :target="$el"
  :position="dropdownPosition"
  :offset="offset + 'px 0'"
  :constrain-to-window="this.position === 'auto'"
  :constrain-to-parent="false">
  <calendar v-ref:calendar
    :min="minDateMoment"
    :max="maxDateMoment"
    :disabled-dates="disabledDates"
    :selected-dates="selectedDates"
    :locale="locale"
    @select="select"
    @update="$emit('update')">
  </calendar>
</dropdown>`

export default {
  mixins: [moment],
  components: {
    Dropdown,
    Calendar
  },
  data () {
    return {
      show: false
    }
  },
  compiled () {
    if (this.displayDropdown) {
      const node = document.createElement('div')
      node.innerHTML = dropdownTmpl
      document.body.appendChild(node)
      this.$compile(node, this, this._scope, this._frag)
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
      return this.mobile || (!UI.support.touch && this.$el.getAttribute('type') !== 'date')
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
    },
    dropdownPosition () {
      return this.position === 'top' || this.position === 'auto'
        ? 'top left'
        : 'bottom left'
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
    }
  },
  watch: {
    show (value) {
      // update offset depending on
      // top or bottom attachment
      const dropdown = this.$refs.dropdown.$el
      const $tether = this.$refs.dropdown.$tether
      const topClass = 'vk-tether-target-attached-top'
      $tether.offset.top = dropdown.classList.contains(topClass)
        ? $tether.offset.top.replace('-', '')
        : '-' + $tether.offset.top.replace('-', '')
      $tether.position()
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
