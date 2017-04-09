<template>
  <div>
    <vk-datepicker
      :date="date"
      :pickedDates="pickedDates"
      :weekStartsOn="props.weekStartsOn.demo.value"
      :minDate="props.minDate.demo.value"
      :maxDate="props.maxDate.demo.value"
      @pick="({ dates }) => {
        events.pick.emited = true
        pickedDates = dates
      }"
      @unpick="({ dates }) => {
        events.unpick.emited = true
        pickedDates = dates
      }"
      @change="({ date }) => {
        events.change.emited = true
        $data.date = date
      }">
    </vk-datepicker>
    <!-- TABS -->
    <vk-tabs
      class="uk-margin-large"
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
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
import Component from 'lib/Datepicker'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'

const now = Date.now()

export default {
  name: 'Basic',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(Component.props, props),
    events,
    example,
    date: now,
    pickedDates: [ now ]
  }),
  watch: {
    'props.minDate.demo.value' () {
      // reset calendar view
      this.date = now
    },
    'props.maxDate.demo.value' () {
      // reset calendar view
      this.date = now
    }
  }
}

const props = {
  date: {
    description: `The date representing the currently month being displayed.`,
    default: 'Today'
  },
  weekStartsOn: {
    description: `The index of the first day of the week (0 - Sunday).`,
    demo: {
      type: 'Select',
      options: [
        { text: 0, value: 0 },
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
        { text: 5, value: 5 },
        { text: 6, value: 6 }
      ],
      value: 0
    }
  },
  pickedDates: {
    description: `Array of currently picked dates.`
  },
  disabledDates: {
    description: `Array of arbitrary dates that should not be pickable.`
  },
  minDate: {
    description: `The minimum pickable date.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: '1980-01-01' },
        { text: '5 days from today', value: 5 }
      ],
      value: '1980-01-01'
    }
  },
  maxDate: {
    description: `The maximum pickable date.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: '2050-12-31' },
        { text: '5 days from today', value: 5 }
      ],
      value: '2050-12-31'
    }
  },
  locale: {
    description: `The <a href="https://date-fns.org/docs/I18n#supported-languages" target="_blank">data-fns</a>
      locale object.`
  }
}

const events = {
  pick: {
    description: `Emited on the intention to pick a date passing as first argument the
      related <code>Date</code> object. The second argument is an altered clone of the
      pickedDates reflecting the new picked state. Finally the 3rd argument is the
      format function.`,
    emited: false
  },
  unpick: {
    description: `Emited on the intention to unpick a date passing as argument the
      related <code>Date</code> object. The second argument is an altered clone of the
      pickedDates reflecting the new unpicked state. Finally the 3rd argument is the
      format function.`,
    emited: false
  },
  change: {
    description: `Emited on the intention to change the calendar date passing as
      argument the new Date object and as the second argument the format function.`,
    emited: false
  }
}

const example =
`<vk-datepicker {attrs}
  @pick="({ dates }) => {
    pickedDates = dates
  }"
  @unpick="({ dates }) => {
    pickedDates = dates
  }"
  @change="({ date }) => {
    $data.date = date
  }">
</vk-datepicker>`
</script>
