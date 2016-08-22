import Moment from 'moment'

export default {
  functional: true,
  render (h, { parent }) {
    return (
      <div class="uk-datepicker-nav">
        { parent.isDisplayable(parent.prevMonth) && (
          <a class="uk-datepicker-previous"
            on-click={e => {
              e.preventDefault()
              parent.$emit('change', parent.prevMonth)
            }}>
          </a>
        )}
        { parent.isDisplayable(parent.nextMonth) && (
          <a class="uk-datepicker-next"
            on-click={e => {
              e.preventDefault()
              parent.$emit('change', parent.nextMonth)
            }}>
          </a>
        )}
        <div class="uk-datepicker-heading">
          { h(Select, {
            props: {
              value: parent.selectedMonth,
              display: parent.date.format('MMMM'),
              options: listMonths(parent.date.year(), parent.minMoment, parent.maxMoment),
              onChange: e => {
                parent.selectedMonth = e.target.selectedOptions[0].value
              }
            }
          })}
          &nbsp;
          { h(Select, {
            props: {
              value: parent.selectedYear,
              display: parent.date.format('YYYY'),
              options: listYears(parent.minMoment, parent.maxMoment),
              onChange: e => {
                parent.selectedYear = e.target.selectedOptions[0].value
              }
            }
          })}
        </div>
      </div>
    )
  }
}

const Select = {
  functional: true,
  props: ['value', 'display', 'options', 'onChange'],
  render (h, { parent, props }) {
    return h('span', {
      class: 'uk-form-select'
    }, [
      h('a', {
        on: {
          click: e => e.preventDefault()
        }
      }, [ props.display ]),
      h('select', {
        domProps: {
          value: props.value
        },
        on: {
          change: props.onChange
        }
      }, [
        props.options.map(option =>
          h('option', { domProps: {
            value: option.value
          }}, [ option.text ])
        )
      ])
    ])
  }
}

// get a list of months withing a range
function listMonths (currentYear, min, max) {
  const minDate = Moment(min)
  const maxDate = Moment(max)
  const inMinYear = currentYear === minDate.year()
  const inMaxYear = currentYear === maxDate.year()
  const months = []
  Moment.months().forEach((name, m) => {
    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
      months.push({ text: name, value: m })
    }
  })
  return months
}

// get a list of years withing a range
function listYears (min, max) {
  const range = Moment.range(Moment(min), Moment(max))
  return range.toArray('years').map(moment => ({
    text: moment.year(), value: moment.year()
  }))
}
