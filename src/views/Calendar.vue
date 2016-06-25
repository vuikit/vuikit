<template>
  <div class="uk-block">
    <h2>Calendar</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-calendar v-ref:demo
      :year.sync="props.year.demo.value | number"
      :month.sync="props.month.demo.value | number"
      :disabled-dates="props.disabledDates.demo.value"
      :selected-dates="props.selectedDates.demo.value"
      :min="props.min.demo.value"
      :max="props.max.demo.value">
    </vk-calendar>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-calendar</code> component renders a table based calendar.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>
<vk-calendar></vk-calendar>
        </vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Moment from 'moment'
import { merge, pick } from 'lodash'
import Component from '../lib/Calendar'

export default {
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    events
  }),
  filters: {
    number (val) {
      return parseInt(val)
    }
  }
}

const props = {
  year: {
    description: 'The year of the month currently being displayed. Defaults to current year if omited.',
    demo: {
      options: [
        Moment().add(-1, 'year').year(),
        Moment().year(),
        Moment().add(1, 'year').year()
      ]
    }
  },
  month: {
    description: `The month currently being displayed. Notice that the months
      are zero indexed, being January represented as <code>0</code>. Defaults to current
      month if omited.`,
    demo: {
      options: { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 }
    }
  },
  min: {
    description: `The minimum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      options: { 'Last Month': Moment().add(-1, 'months').format('YYYY-MM-DD') }
    }
  },
  max: {
    description: `The maximum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      options: { 'Next Month': Moment().add(1, 'months').format('YYYY-MM-DD') }
    }
  },
  selectedDates: {
    description: `Array of arbitrary dates that should be disabled. Supports any
      input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      options: {
        Today: [Moment().format('YYYY-MM-DD')],
        Tomorrow: [Moment().add(1, 'days').format('YYYY-MM-DD')],
        Both: [Moment().format('YYYY-MM-DD'), Moment().add(1, 'days').format('YYYY-MM-DD')]
      },
      value: [Moment().format('YYYY-MM-DD')]
    }
  },
  disabledDates: {
    description: `Array of arbitrary dates that should be disabled. Supports any
      input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      options: {
        Today: [Moment().format('YYYY-MM-DD')],
        Tomorrow: [Moment().add(1, 'days').format('YYYY-MM-DD')],
        Both: [Moment().format('YYYY-MM-DD'), Moment().add(1, 'days').format('YYYY-MM-DD')]
      },
      value: [Moment().add(1, 'days').format('YYYY-MM-DD')]
    }
  },
  locale: {
    description: `By default, VkCalendar comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details.`
  }
}

const events = {
  select: {
    description: 'Emited on day selection with its <code>moment.js</code> object as argument.'
  },
  update: {
    description: 'Emited on month view update.'
  }
}
</script>
