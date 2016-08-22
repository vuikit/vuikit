import { warn } from '../../helpers/util'

export default function (h) {
  if (this.$slots.default !== undefined) {
    const calendarVnode = this.$slots.default[0]
    calendarVnode.componentOptions.propsData.fieldComponent = DateField
    calendarVnode.componentOptions.propsData.fieldProps = {
      $datepicker: this
    }
    return calendarVnode
  } else {
    warn('VkDatepicker expects VkCalendar as child.')
  }
}

const DateField = {
  name: 'DateField',
  functional: true,
  props: {
    date: {
      required: true
    },
    $datepicker: {
      required: true
    }
  },
  render (h, { parent: $calendar, props }) {
    const $datepicker = props.$datepicker
    return (
      <a class={{
        'uk-active': $datepicker.isPicked(props.date),
        'uk-datepicker-table-disabled': $datepicker.isDisabled(props.date),
        'uk-datepicker-table-muted': !$calendar.isInCurrentMonth(props.date) ||
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
}
