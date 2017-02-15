const isSameMonth = require('date-fns/is_same_month')
const getYear = require('date-fns/get_year')
const getMonth = require('date-fns/get_month')
const getDate = require('date-fns/get_date')
const addDays = require('date-fns/add_days')
const startOfWeek = require('date-fns/start_of_week')
const range = require('utils/range')

const rows = range(6)
const cols = range(7)

/**
 * Returns a two-dimensional array with calendar represented dates
 *
 * @date  Date or Object
 * @plain Boolean - Whetever the dates should be set as raw numbers
 */
module.exports = function ({ year, month, weekStartsOn } = {
  year: getYear(Date.now()),
  month: getMonth(Date.now()),
  weekStartsOn: 0
}, plain = false) {
  const matrix = []
  const date = arguments[0] instanceof Date
    ? arguments[0]
    : new Date(year, month)
  let curDate = startOfWeek(date, { weekStartsOn })

  rows.forEach(row => {
    const week = []
    cols.forEach(col => {
      // when plain return a raw date re
      if (plain) {
        week.push(isSameMonth(curDate, date)
          ? getDate(curDate)
          : -getDate(curDate)
        )
      } else {
        week.push(curDate)
      }
      curDate = addDays(curDate, 1)
    })

    matrix.push(week)
  })

  return matrix
}
