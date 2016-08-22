import Moment from 'moment'
import { merge, isArray, isObject, warn } from '../../helpers/util'

const defaultLocale = {
  name: 'en',
  week: {
    dow: 1
  }
}

export default {
  beforeCreate () {
    if (Moment === undefined) {
      warn(`${this.$options.name} stopped executing due to missing Moment.js dependency.`)
      this.$destroy()
    } else {
      this.$moment = function (date) {
        const moment = (!date || isArray(date) || isObject(date))
          ? Moment(date || undefined)
          : Moment(date, this.format)
        if (!moment.isValid()) {
          warn(`Moment object creation failed with date input '${date}'`)
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
