<template>
  <layouts-default>
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
      </vk-calendar>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-calendar</code> component renders a table based calendar.
      </div>
      <!-- TABS -->
      <tm-tabs>
        <tm-tabs-item name="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </tm-tabs-item>
        <tm-tabs-item name="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </tm-tabs-item>
        <tm-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </tm-tabs-item>
      </tm-tabs>
    </div>
  </layouts-default>
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
  fieldComponent: {
    description: `The component definition that will be used during the date fields rendering.
      Each instance will recieve a date prop as <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      object.`
  },
  fieldProps: {
    description: 'Additional props to be passed to the field component instances.'
  },
  locale: {
    description: `By default, VkCalendar comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details.`
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
`<vk-calendar {attr}
  @change="
    year = arguments[0].year(),
    month = arguments[0].month()
  ">
</vk-calendar>`
</script>
