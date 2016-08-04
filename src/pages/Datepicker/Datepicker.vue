<template>
  <div class="uk-block">
    <h2>Datepicker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-datepicker
      :dates="props.dates.demo.value"
      :disabled-dates="props.disabledDates.demo.value"
      :min="props.min.demo.value"
      :max="props.max.demo.value"
      @pick="
        events.pick.emited = true,
        props.dates.demo.value.push(arguments[0].format('YYYY-MM-DD'))
      "
      @unpick="
        events.unpick.emited = true,
        props.dates.demo.value.splice(
          props.dates.demo.value.indexOf(arguments[0].format('YYYY-MM-DD')), 1
        )
      ">
      <vk-calendar
        :year="calendar.year"
        :month="calendar.month"
        @change="
          calendar.year = arguments[0].year(),
          calendar.month = arguments[0].month()
        ">
      </vk-calendar>
    </vk-datepicker>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-datepicker</code> component wraps a <code>vk-calendar</code>
      adding to it custom rendering template for the purpose of picking a date.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Moment from 'moment'
import Component from '../../lib/Datepicker'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

export default {
  name: 'Block',
  mixins: [mixin],
  data: () => ({
    calendar: {
      year: undefined,
      month: undefined
    },
    props: mergeProps(Component.props, props),
    events,
    example
  })
}

const props = {
  dates: {
    description: `Array of currently picked dates. Supports any input format
      supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      value: [ Moment().format('YYYY-MM-DD') ],
      type: 'Overview'
    }
  },
  disabledDates: {
    description: `Array of arbitrary dates that will be set as disabled
      disallowing them to be picked. Supports any input format supported by
      <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      value: [
        Moment().add(1, 'days').format('YYYY-MM-DD'),
        Moment().add(2, 'days').format('YYYY-MM-DD'),
        Moment().add(3, 'days').format('YYYY-MM-DD')
      ],
      type: 'Overview'
    }
  },
  min: {
    description: `The minimum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: undefined },
        { text: '5', value: 5 },
        { text: '10', value: 10 }
      ],
      value: undefined
    }
  },
  max: {
    description: `The maximum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: undefined },
        { text: '5', value: 5 },
        { text: '10', value: 10 }
      ],
      value: undefined
    }
  }
}

const events = {
  pick: {
    description: `Emited when a date is picked passing as argument it moment.js
      <code>Object</code> and the <code>Array</code> of all picked dates.`,
    emited: false
  },
  unpick: {
    description: `Emited when a date is unpicked passing as argument it moment.js
      <code>Object</code> and the <code>Array</code> of all picked dates left.`,
    emited: false
  }
}

const example =
`<vk-datepicker {attrs}
  @pick="dates.push(arguments[0].format('YYYY-MM-DD'))"
  @unpick="dates.splice(dates.indexOf(arguments[0].format('YYYY-MM-DD')), 1)">
  <vk-calendar
    :year="year"
    :month="month"
    @change="
      year = arguments[0].year(),
      month = arguments[0].month()
    ">
  </vk-calendar>
</vk-datepicker>`
</script>
