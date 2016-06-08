<template>
  <docs-page
    :props="props"
    :events="events"
    :code="code">
    <div slot="demo">
      <vk-calendar v-ref:demo
        :year.sync="props.year.value | number"
        :month.sync="props.month.value | number"
        :disabled-dates="props.disabledDates.value"
        :selected-dates="props.selectedDates.value"
        :min="props.min.value"
        :max="props.max.value">
      </vk-calendar>
    </div>
    <div slot="desc">
      The <code>vk-calendar</code> component renders a table based calendar.
    </div>
  </docs-page>
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
    description: 'The year currently being displayed. Defaults to current if omited.',
    options: [
      Moment().add(-1, 'year').year(),
      Moment().year(),
      Moment().add(1, 'year').year()
    ],
    default: Moment().year(),
    value: Moment().year()
  },
  month: {
    description: `The month currently being displayed. Notice that the months
      are zero indexed, being January represented as <code>0</code>. Defaults to current
      month if omited.`,
    options: { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 },
    default: Moment().month(),
    value: Moment().month()
  },
  min: {
    description: `The minimum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    options: {
      default: '1980-01-01',
      'Last Month': Moment().add(-1, 'months').format('YYYY-MM-DD')
    }
  },
  max: {
    description: `The maximum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    options: {
      default: '2050-12-31',
      'Next Month': Moment().add(1, 'months').format('YYYY-MM-DD')
    }
  },
  selectedDates: {
    description: `Array of arbitrary dates that should be disabled. Supports any
      input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    options: {
      default: [],
      Today: [Moment().format('YYYY-MM-DD')],
      Tomorrow: [Moment().add(1, 'days').format('YYYY-MM-DD')],
      Both: [Moment().format('YYYY-MM-DD'), Moment().add(1, 'days').format('YYYY-MM-DD')]
    },
    value: [Moment().format('YYYY-MM-DD')]
  },
  disabledDates: {
    description: `Array of arbitrary dates that should be disabled. Supports any
      input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    options: {
      default: [],
      Today: [Moment().format('YYYY-MM-DD')],
      Tomorrow: [Moment().add(1, 'days').format('YYYY-MM-DD')],
      Both: [Moment().format('YYYY-MM-DD'), Moment().add(1, 'days').format('YYYY-MM-DD')]
    },
    value: []
  },
  locale: {
    description: `By default, VkCalendar comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details`,
    default: {},
    value: ''
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
