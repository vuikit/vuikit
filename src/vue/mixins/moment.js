import Moment from 'moment'
import Vue from 'vue'

export default {
  init () {
    if (Moment === undefined) {
      Vue.util.warn(`${this.$options.name} stopped executing due to missing Moment.js dependency.`)
      this.$destroy()
    } else {
      this.$moment = function (date) {
        return (date && Moment(date, this.format, true).isValid()
          ? Moment(date, this.format, true)
          : Moment()
        ).locale(`${this.$options.name}_${this._uid}`)
      }
    }
  },
  created () {
    // define custom locale at created
    // as we need access to the local object
    const globalLocale = Moment.locale()
    Moment.defineLocale(`${this.$options.name}_${this._uid}`, {
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
