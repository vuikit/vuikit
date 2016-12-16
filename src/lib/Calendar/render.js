import Header from './Header'
import Field from './Field'

export default function (h) {
  return (
    <div>
      { h(Header) }
      <table class="uk-datepicker-table">
        <thead>
          <tr>{ this.weekDays.map(day => h('th', [ day ])) }</tr>
        </thead>
        <tbody>{
          this.weeks.map(week => h('tr', [
            week.map((date, index) => h('td', { key: index }, [
              h(Field, { props: { date: date } })
            ]))
          ]))
        }</tbody>
      </table>
    </div>
  )
}
