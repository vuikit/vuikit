<template>
  <div class="uk-block">
    <h2>Datepicker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-datepicker v-ref:demo
      :multi="props.multi.demo.value"
      :min="props.min.demo.value"
      :max="props.max.demo.value"
      :pre-picked="props.prePicked.demo.value"
      :disabled-dates="props.disabledDates.demo.value">
    </vk-datepicker>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-datepicker</code> component renders a <code>vk-calendar</code> which date can be picked.
      The underlying Calendar instance can be accessed by <code>$refs.calendar</code> reference.
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
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Moment from 'moment'
import { merge } from 'lodash'
import Component from '../../lib/Datepicker'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, Component.props),
    events,
    example
  })
}

const props = {
  multi: {
    description: 'Whether to allow picking multiple dates',
    demo: {}
  },
  min: {
    description: `The minimum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [5, 10]
    }
  },
  max: {
    description: `The maximum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [5, 10]
    }
  },
  prePicked: {
    description: `Array of arbitrary dates that will be highlighted as picked in the calendar.
      Supports any input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      value: [ Moment().format('YYYY-MM-DD') ],
      editable: false
    }
  },
  disabledDates: {
    description: `Array of arbitrary dates that will be set as disabled disallowing them to be picked.
      Supports any input format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>.`,
    demo: {
      value: [ Moment().add(1, 'days').format('YYYY-MM-DD') ],
      editable: false
    }
  },
  calendar: {
    description: `Props passed to the underlying Calendar instance. See the
      <a href="/#!/calendar">Calendar documentation</a> for the possible values.`
  }
}

const events = {
  pick: {
    description: `Emited when a date is picked passing as argument it moment.js
      <code>Object</code> and the <code>Array</code> of all picked dates.`
  },
  unpick: {
    description: `Emited when a date is unpicked passing as argument it moment.js
      <code>Object</code> and the <code>Array</code> of all picked dates left.`
  }
}

const example =
`<vk-datepicker {attrs}>
</vk-datepicker>`
</script>
