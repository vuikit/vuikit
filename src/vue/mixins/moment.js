import Vue from 'vue'
import Moment from 'moment'
import { merge } from 'lodash'

const defaultLocale = {
  name: 'en',
  week: {
    dow: 1
  }
}

export default {
  init () {
    if (Moment === undefined) {
      Vue.util.warn(`${this.$options.name} stopped executing due to missing Moment.js dependency.`)
      this.$destroy()
    } else {
      this.$moment = function (date) {
        const moment = (!date || Vue.util.isArray(date) || Vue.util.isObject(date))
          ? Moment(date || undefined)
          : Moment(date, this.format)
        if (!moment.isValid()) {
          Vue.util.warn(`Moment object creation failed with date input '${date}'`)
        }
        return moment
      }
    }
  },
  created () {
    // define custom locale at created event
    // as we need props access
    const locale = merge({}, defaultLocale, this.locale)
    Moment.updateLocale(locale.name, locale)
  },
  filters: {
    format: (moment, format) => moment.format(format)
  }
}
