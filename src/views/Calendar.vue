<template>
  <div class="uk-block">
    <h2>Calendar</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-calendar v-ref:demo
      :year.sync="props.year.demo.value | number"
      :month.sync="props.month.demo.value | number"
      :min="props.min.demo.value"
      :max="props.max.demo.value">
      {{ $day.date() }}
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
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Moment from 'moment'
import { merge, pick } from 'lodash'
import Component from '../lib/Calendar'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    events,
    example
  }),
  filters: {
    number (val) {
      return parseInt(val)
    }
  },
  watch: {
    'props.min.demo.value' () {
      // reset calendar
      this.props.year.demo.value = Moment().year()
      this.props.month.demo.value = Moment().month()
    },
    'props.max.demo.value' () {
      // reset calendar
      this.props.year.demo.value = Moment().year()
      this.props.month.demo.value = Moment().month()
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
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [
        Moment().add(-1, 'months').format('YYYY-MM-DD'),
        5,
        10
      ]
    }
  },
  max: {
    description: `The maximum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [
        Moment().add(1, 'months').format('YYYY-MM-DD'),
        5,
        10
      ]
    }
  },
  locale: {
    description: `By default, VkCalendar comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details.`
  }
}

const slots = {
  default: {
    description: `The template that will be used to render each day. The <code>$day</code>
      moment.js variable is available representing the current day being rendered.`
  }
}

const events = {
  update: {
    description: 'Emited on each calendar view update.'
  }
}

const example =
`<vk-calendar {attrs}>
  {{ $day.date() }}
</vk-calendar>`
</script>
