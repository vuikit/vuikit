<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-calendar v-ref:demo
          :year.sync="props.year.value | number"
          :month.sync="props.month.value | number"
          :min-date="props.minDate.value"
          :max-date="props.maxDate.value">
        </vk-calendar>
      </div>
      <div slot="desc">
        The <code>vk-calendar</code> component renders a table based calendar.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import Moment from 'moment'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Calendar', props),
    events,
    code
  }),
  filters: {
    number (val) {
      return parseInt(val)
    }
  }
}

const code =
'<vk-calendar></vk-calendar>'

const props = {
  year: {
    description: 'Determines the calendar year. Defaults to current if omited.',
    options: [
      Moment().add(-1, 'year').year(),
      Moment().year(),
      Moment().add(1, 'year').year()
    ],
    default: Moment().year()
  },
  month: {
    description: `Determines the calendar month. If using numbers notice that
      are zero indexed, so January is month <code>0</code>. Defaults to current
      month if omited.`,
    options: { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 },
    default: Moment().month(),
    value: Moment().month()
  },
  selected: {
    description: `Determines the selected dates represented with a Moment
      <code>object</code>. Defaults to current day if omited.`,
    default: Moment().date()
  },
  locale: {
    description: `Determines the locale data object, <code>months</code>,
      <code>weekDays</code> and <code>weekStart</code>.`,
    default: {},
    value: ''
  },
  minDate: {
    description: `Determines the earliest selectable date. Accepted values are date
    <code>object</code>, date <code>string</code> as in locale format or <code>integer</code>
    as offset days from current day. Set to <code>false</code> to ignore the option.`,
    options: ['default', 5, 10]
  },
  maxDate: {
    description: `Determines the latest selectable date. Accepted values are date
    <code>object</code>, date <code>string</code> as in locale format or <code>integer</code>
    as offset days from current day. Set to <code>false</code> to ignore the option.`,
    options: ['default', 5, 10]
  }
}

const events = {
  select: {
    description: `Emited on day selection passing as argument the
      <code>Moment</code> object.`
  },
  update: {
    description: 'Emited on calendar view update.'
  }
}
</script>
