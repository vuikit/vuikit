
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
              options: parent.listMonths,
              onChange: e => {
                parent.selectedMonth = e.target.value
              }
            }
          })}
          &nbsp;
          { h(Select, {
            props: {
              value: parent.selectedYear,
              display: parent.date.format('YYYY'),
              options: parent.listYears,
              onChange: e => {
                parent.selectedYear = e.target.value
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
