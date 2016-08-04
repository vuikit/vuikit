<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Calendar</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-calendar ref="calendar"
        :year="props.year.demo.value"
        :month="props.month.demo.value"
        :min="props.min.demo.value"
        :max="props.max.demo.value"
        @change="
          events.change.emited = true,
          props.year.demo.value = arguments[0].year(),
          props.month.demo.value = arguments[0].month()
        ">
        {{ $refs.calendar.$renderingDay.date() }}
      </vk-calendar>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-calendar</code> component renders a table based calendar.
      </div>
      <!-- TABS -->
      <vk-tabs>
        <vk-tab label="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </vk-tab>
        <vk-tab label="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tab>
        <vk-tab label="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </vk-tab>
        <vk-tab label="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tab>
      </vk-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import Moment from 'moment'
import Component from '../lib/Calendar'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageCalendar',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  }),
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
    description: `The year of the month currently being displayed. Defaults to
      current year.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Current', value: undefined },
        { text: 'Previous', value: Moment().add(-1, 'year').year() },
        { text: 'Next', value: Moment().add(1, 'year').year() }
      ],
      value: undefined
    }
  },
  month: {
    description: `The month currently being displayed. Notice that the months
      are zero indexed, being January represented as <code>0</code>. Defaults to current
      month.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Current', value: undefined },
        { text: 'Previous', value: Moment().add(-1, 'month').month() },
        { text: 'Next', value: Moment().add(1, 'month').month() }
      ],
      value: undefined
    }
  },
  min: {
    description: `The minimum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: undefined },
        { text: 'Specific date', value: Moment().add(-2, 'months').format('YYYY-MM-DD') },
        { text: '5 days from today', value: 5 }
      ],
      value: undefined
    }
  },
  max: {
    description: `The maximum month that can be displayed. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: undefined },
        { text: 'Specific date', value: Moment().add(2, 'months').format('YYYY-MM-DD') },
        { text: '5 days from today', value: 5 }
      ],
      value: undefined
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
    description: `The template for each day field rendering. The
      <a href="http://momentjs.com/docs/#/parsing/">moment.js</a> object of the day
      being currently rendered can be accessed at the component <code>$renderingDate</code>.
      Use with combination of <code>ref</code>, eg. <code>$refs.calendar.$renderingDate</code>.`
  }
}

const events = {
  change: {
    description: `Emited on the intention to change the calendar date passing as argument the
      <a href="http://momentjs.com/docs/#/parsing/">moment.js</a> object.`,
    emited: false
  }
}

const example =
`<vk-calendar ref="calendar" {attrs}
  @change="
    yearh = arguments[0].year(),
    month = arguments[0].month()
  ">
  {{ $refs.calendar.$renderingDay.date() }}
</vk-calendar>`
</script>
