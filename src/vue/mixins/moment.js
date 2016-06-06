import Vue from 'vue'
import Moment from 'moment'
import UUID from '../helpers/uuid'

function localeId (prefix) {
  return UUID.short(`${prefix}-`)
}

export default {
  init () {
    if (Moment === undefined) {
      Vue.util.warn(`${this.$options.name} stopped executing due to missing Moment.js dependency.`)
      this.$destroy()
    } else {
      this.$moment = function (date) {
        const moment = date && Moment(date, this.format, true).isValid()
          ? Moment(date, this.format, true)
          : Moment()
        moment.locale(localeId(this.$options.name))
        return moment
      }
    }
  },
  created () {
    // define custom locale at created event
    // as we need to access to props
    const globalLocale = Moment.locale()
    Moment.defineLocale(localeId(this.$options.name), {
      parentLocale: 'en',
      months: this.locale.months,
      weekdaysShort: this.locale.weekDays,
      week: {
        dow: 1
      }
    })
    // as defineLocale applies the new locale
    // we must get back the previous one
    Moment.locale(globalLocale)
  },
  filters: {
    date: (moment, format) => moment.format(format)
  }
}
