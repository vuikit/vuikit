<template>
  <div class="uk-block">
    <h2>Datepicker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-datepicker
      :year="calendar.year"
      :month="calendar.month"
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
      "
      @change="
        calendar.year = arguments[0].year(),
        calendar.month = arguments[0].month()
      ">
    </vk-datepicker>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-datepicker</code> component wraps <code>vk-calendar</code>
      and renders a UIkit inspired Datepicker.
    </div>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="tabsIndex = arguments[0]">
      <vk-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tabs-item>
      <vk-tabs-item name="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tabs-item>
      <vk-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import Moment from 'moment'
import Component from '../../lib/Datepicker'
import mixin from '../_mixin'
import { mergeProps } from '../../helpers/pages'

export default {
  name: 'Block',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
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
        { text: 'Default', value: '1980-01-01' },
        { text: '5', value: 5 },
        { text: '10', value: 10 }
      ],
      value: '1980-01-01'
    }
  },
  max: {
    description: `The maximum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: '2050-12-31' },
        { text: '5', value: 5 },
        { text: '10', value: 10 }
      ],
      value: '2050-12-31'
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
  @unpick="dates.splice(dates.indexOf(arguments[0].format('YYYY-MM-DD')), 1)"
  @change="
    calendar.year = arguments[0].year(),
    calendar.month = arguments[0].month()
  ">
</vk-datepicker>`
</script>
