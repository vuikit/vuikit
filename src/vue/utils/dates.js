import Moment from 'moment'
import 'moment-range'
import { range } from 'lodash'

// Custom date prop validation
export function validDate (moment) {
  return moment && Moment(moment).isValid()
}

// get a list of years withing a range
export function listYears (min, max) {
  const range = Moment.range(Moment(min), Moment(max))
  return range.toArray('years').map(moment => moment.year())
}

// get a list of months withing a range
export function listMonths (currentYear, min, max) {
  const minDate = Moment(min)
  const maxDate = Moment(max)
  const inMinYear = currentYear === minDate.year()
  const inMaxYear = currentYear === maxDate.year()
  const months = {}
  Moment.months().forEach((name, m) => {
    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
      months[m] = name
    }
  })
  return months
}

// get a list of the week days
export function listWeekDays () {
  return range(0, 7).map((val, index) => Moment().weekday(index).format('ddd'))
}

// check if a moment is withing a range of dates
export function isBetween (moment, min, max) {
  const range = Moment.range(Moment(min), Moment(max))
  return range.contains(moment)
}

// check if a moment is today
export function isToday (moment) {
  return moment.isSame(Moment(), 'day')
}

// Creates a 6x7 matrix of dates
export function getCalendarMatrix (date) {
  const year = date.year()
  const month = date.month()
  const hour = date.hour()
  const minute = date.minute()
  const second = date.second()
  const daysInMonth = date.daysInMonth()
  const firstDay = Moment([year, month, 1])
  const lastDay = Moment([year, month, daysInMonth])
  const lastMonth = Moment(firstDay).subtract(1, 'month').month()
  const lastYear = Moment(firstDay).subtract(1, 'month').year()
  const daysInLastMonth = Moment([lastYear, lastMonth]).daysInMonth()
  const dayOfWeek = firstDay.day()
  const firstDayOfWeek = Moment.localeData().firstDayOfWeek()
  const matrix = []
  let i
  let col
  let row
  matrix.firstDay = firstDay
  matrix.lastDay = lastDay
  for (i = 0; i < 6; i++) {
    matrix[i] = []
  }
  // populate the matrix with date objects
  let startDay = daysInLastMonth - dayOfWeek + firstDayOfWeek + 1
  if (startDay > daysInLastMonth) {
    startDay -= 7
  }
  if (dayOfWeek === firstDayOfWeek) {
    startDay = daysInLastMonth - 6
  }
  let curDate = Moment([lastYear, lastMonth, startDay, 12, minute, second])
  for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = curDate.clone().add(24, 'hour')) {
    if (i > 0 && col % 7 === 0) {
      col = 0
      row++
    }
    matrix[row][col] = curDate.clone().hour(hour).minute(minute).second(second)
    curDate.hour(12)
  }
  return matrix
}
