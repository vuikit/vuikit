<template>
  <input type="text"
    v-el:input
    v-model="value"
    @focus="show = true">
  <div class="uk-dropdown uk-datepicker"
    v-el:dropdown
    v-if="dropdown"
    :style="dropdownCss">
    <vk-calendar v-ref:calendar
      :selected.sync="selected"
      :min-date.sync="minDate"
      :max-date.sync="maxDate"
      @select="select">
    </vk-calendar>
  </div>
</template>

<script>
import moment from './mixins/moment'
import UI from 'uikit'

export default {
  init () {
    // this.$options.template = '<input>'
  },
  mixins: [moment],
  ready () {
    // hide on outter click/focus
    const vm = this
    UI.$html.on('click focus', '*', function (e) {
      if (vm.show &&
        e.target !== vm.$els.dropdown &&
        e.target !== vm.$els.input &&
        !UI.$(e.target).parents('.uk-datepicker:first').length
      ) {
        vm.show = false
      }
    })
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
    minDate: {
      type: [String, Object, Number, Boolean],
      default: false
    },
    maxDate: {
      type: [String, Object, Number, Boolean],
      default: false
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
        return this.$moment(this.value)
      },
      set: function (moment) {
        this.value = moment.format(this.format)
      }
    },
    dropdown () {
      // should it render on touch devices?
      if (!this.mobile && UI.support.touch &&
        UI.$(this.$els.input).attr('type') === 'date'
      ) {
        return false
      }
      return true
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
    }
  },
  methods: {
    select (moment) {
      // trigger change event
      if (!this.value || !moment.isSame(this.selected, 'day')) {
        this.selected = moment.clone()
        this.$nextTick(() => this.$emit('change', this.selected))
      }
      // hide dropdown
      this.show = false
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
      // reset calendar date
      this.$refs.calendar.month = this.selected.month()
    }
  }
}
</script>

<style>
/* disabled state */
a.uk-datepicker-date-disabled {
  text-decoration: line-through;
}
a.uk-datepicker-date-disabled:hover,
a.uk-datepicker-date-disabled:focus {
  background-color: inherit;
}
</style>
