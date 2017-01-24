import diffInCalMonths from 'date-fns/difference_in_calendar_months'
import isBefore from 'date-fns/is_before'
import isWithinRange from 'date-fns/is_within_range'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import addYears from 'date-fns/add_years'
import addMonths from 'date-fns/add_months'
import setYear from 'date-fns/set_year'
import setMonth from 'date-fns/set_month'
import { range } from '../../helpers/util'

export default {
  functional: true,
  render (h, { parent: vm }) {
    return h('div', { class: 'uk-datepicker-heading' }, [
      h(Select, {
        props: {
          value: getMonth(vm.date),
          options: getMonthsRange(vm.minPickableDate, vm.maxPickableDate)
            .filter(month =>
              isWithinRange(setMonth(vm.date, month), vm.minPickableDate, vm.maxPickableDate)
            )
            .map(month => ({
              text: vm.format(setMonth(vm.date, month), 'MMMM'),
              value: month
            })),
          onChange: e => {
            const selectedMonth = e.target.selectedOptions[0].value
            vm.$emit('change', setMonth(vm.date, selectedMonth))
          }
        }
      }, [
        vm.format(vm.date, 'MMMM')
      ]),
      '&nbsp',
      h(Select, {
        props: {
          value: getYear(vm.date),
          options: getYearsRange(vm.minPickableDate, vm.maxPickableDate)
            .filter(year =>
              isWithinRange(setYear(vm.date, year), vm.minPickableDate, vm.maxPickableDate)
            )
            .map(year => ({ text: year, value: year })),
          onChange: e => {
            const selectedYear = e.target.selectedOptions[0].value
            vm.$emit('change', setYear(vm.date, selectedYear))
          }
        }
      }, [
        getYear(vm.date)
      ])
    ])
  }
}

const Select = {
  functional: true,
  props: ['value', 'options', 'onChange'],
  render (h, { props, children }) {
    const { options, value, onChange } = props
    if (options.length > 1) {
      return h('span', { class: 'uk-form-select' }, [
        h('a', {
          on: {
            click: e => e.preventDefault()
          }
        }, [
          children,
          h('select', {
            domProps: {
              value: value
            },
            on: {
              change: onChange
            }
          }, [
            options.map(option =>
              h('option', { domProps: {
                value: option.value
              }}, [ option.text ])
            )
          ])
        ])
      ])
    } else {
      return children
    }
  }
}

function getYearsRange (startDate, endDate) {
  const years = []
  let curDate = startDate
  while (isBefore(curDate, endDate)) {
    years.push(getYear(curDate))
    curDate = addYears(curDate, 1)
  }
  return years
}

function getMonthsRange (startDate, endDate) {
  const months = []
  // if diff is bigger than 12, include all months
  if (diffInCalMonths(endDate, startDate) >= 12) {
    range(12).forEach(month => {
      months.push(month)
    })
  // otherwise iterate range
  } else {
    let curDate = startDate
    while (isBefore(curDate, endDate)) {
      months.push(getMonth(curDate))
      curDate = addMonths(curDate, 1)
    }
  }
  return months
}
