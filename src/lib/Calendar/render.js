import { merge } from '../../helpers/util'

export default function (h) {
  return (
    <div>
      { renderHeader.call(this, h) }
      <table class="uk-datepicker-table">
        <thead>
          <tr>{
            this.listWeekDays.map(day => (<th>{ day }</th>))
          }</tr>
        </thead>
        <tbody>{
          this.weeks.map(week => (
            <tr>{ week.map((date, index) =>
              h(field, {
                key: index,
                props: {
                  date: date
                }
              })
            )}</tr>
          ))
        }</tbody>
      </table>
    </div>
  )
}

function renderHeader (h) {
  const nodes = {}
  if (this.isDisplayable(this.prevMonth)) {
    nodes.previous = (
      <a class="uk-datepicker-previous"
        on-click={e => {
          e.preventDefault()
          this.$emit('change', this.prevMonth)
        }}>
      </a>
    )
  }
  if (this.isDisplayable(this.nextMonth)) {
    nodes.next = (
      <a class="uk-datepicker-next"
        on-click={e => {
          e.preventDefault()
          this.$emit('change', this.nextMonth)
        }}>
      </a>
    )
  }
  return (
    <div class="uk-datepicker-nav">
      { nodes.previous }
      { nodes.next }
      <div class="uk-datepicker-heading">
        <span class="uk-form-select">
          <a on-click={ e => e.preventDefault() }>
            { this.date.format('MMMM') }
          </a>
          <select on-change={e => {
            this.selectedMonth = e.target.selectedOptions[0].value
          }}>{
            this.monthsList.map(month => (
              <option value={ month.value }>
                { month.text }
              </option>
            ))
          }</select>
        </span>
        &nbsp;
        <span class="uk-form-select">
          <a on-click={ e => e.preventDefault() }>
            { this.date.format('YYYY') }
          </a>
          <select on-change={e => {
            this.selectedYear = e.target.selectedOptions[0].value
          }}>{
            this.yearsList.map(year => (
              <option value={ year }>
                { year }
              </option>
            ))
          }</select>
        </span>
      </div>
    </div>
  )
}

const field = {
  functional: true,
  props: {
    date: {
      required: true
    }
  },
  render (h, { parent, props, data }) {
    let field
    if (parent.fieldComponent) {
      field = h(parent.fieldComponent, {
        props: merge({}, parent.fieldProps, props)
      })
    } else {
      field = (
        <a class={{
          'uk-datepicker-table-muted': !parent.isInCurrentMonth(props.date)
        }}>
          { props.date.format('D') }
        </a>
      )
    }
    return (<td {...data}>{ field }</td>)
  }
}
