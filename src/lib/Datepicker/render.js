export default function (h) {
  return (
    <vk-calendar
      year={ this.year }
      month={ this.month }
      date-render={ dateRender }
      on-change={date => this.$emit('change', date)}>
    </vk-calendar>
  )
}

const dateRender = function (h, { props, parent }) {
  const $calendar = parent
  const $datepicker = parent.$parent
  return (
    <a class={{
      'uk-active': $datepicker.isPicked(props.date),
      'uk-datepicker-table-disabled': $datepicker.isDisabled(props.date),
      'uk-datepicker-table-muted': props.date.month() !== $calendar.month ||
        $datepicker.isDisabled(props.date)
    }} on-click={() => {
      if (!$datepicker.isDisabled(props.date)) {
        $datepicker.toggle(props.date)
      }
    }}>
      { props.date.format('D') }
    </a>
  )
}
