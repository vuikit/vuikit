<template>
  <div>
    <vk-datepicker
      :date="date"
      :pickedDates="pickedDates"
      :weekStartsOn="props.weekStartsOn.demo.value"
      :minDate="props.minDate.demo.value"
      :maxDate="props.maxDate.demo.value"
      @pick="date => {
        events.pick.emited = true
        pickedDates.push(date)
      }"
      @unpick="date => {
        events.unpick.emited = true
        const index = pickedDates.findIndex(d => date.getDate() === d.getDate())
        pickedDates.splice(index, 1)
      }"
      @change="date => {
        events.change.emited = true
        $data.date = date
      }">
    </vk-datepicker>
    <!-- TABS -->
    <vk-tabs
      class="uk-margin-large"
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
import Component from 'src/lib/Datepicker'
import mixin from '../_mixin'
import { mergeProps } from 'src/helpers/pages'

const now = new Date()

export default {
  name: 'Basic',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
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
      related <code>Date</code> object, and the format function as second (in case
      further formating is required).`,
    emited: false
  },
  unpick: {
    description: `Emited on the intention to unpick a date passing as argument the
      related <code>Date</code> object.`,
    emited: false
  },
  change: {
    description: `Emited on the intention to change the calendar date passing as
      argument the new Date object.`,
    emited: false
  }
}

const example =
`<vk-datepicker {attrs}
  @pick="date => {
    pickedDates.push(date)
  }"
  @unpick="date => {
    const index = pickedDates.findIndex(d => date.getDate() === d.getDate())
    pickedDates.splice(index, 1)
  }"
  @change="date => {
    $data.date = date
  }">
</vk-datepicker>`
</script>
