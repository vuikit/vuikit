import Header from './Header'
import Field from './Field'
import Moment from 'moment'
import { range } from 'lodash'

// list of the week days
const weekDays = range(0, 7).map((val, index) =>
  Moment().weekday(index).format('ddd')
)

export default function (h) {
  return (
    <div>
      { h(Header) }
      <table class="uk-datepicker-table">
        <thead>
          <tr>{ weekDays.map(day => h('th', [ day ])) }</tr>
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
