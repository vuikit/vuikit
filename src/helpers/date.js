import Moment from 'moment'

// Custom date prop validation
export function validDate (date) {
  return date && Moment(date).isValid()
}

// check if a date is today
export function isToday (date) {
  return date.isSame(Moment(), 'day')
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
