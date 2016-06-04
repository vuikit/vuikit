<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo" class="uk-form">
        <vk-datepicker v-ref:demo
          :value.sync="props.value.value"
          :format="props.format.value"
          :position="props.position.value"
          :mobile="props.mobile.value"
          :min-date="props.minDate.value"
          :max-date="props.maxDate.value"
          :offset-top="props.offsetTop.value">
        </vk-datepicker>
      </div>
      <div slot="desc">
        The <code>vk-datepicker</code> component renders an input with a toggleable datepicker.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Datepicker', props),
    events,
    code,
    demoValue: ''
  }),
  watch: {
    'props.format.value': function (newFormat, oldFormat) {
      // force date format update
      const moment = this.$refs.demo.$moment(this.$refs.demo.value)
      if (this.$refs.demo.value) {
        this.$refs.demo.value = moment.format(newFormat)
      }
    }
  }
}

const code =
'<vk-datepicker></vk-datepicker>'

const props = {
  value: {
    description: 'Determines the currently selected date.',
    editable: false,
    value: ''
  },
  format: {
    description: `Determines the date format with any combination of
      <code>DD</code>, <code>MM</code> and <code>YYYY</code>.`,
    options: ['YYYY-MM-DD', 'YYYY.MM.DD', 'DD/MM/YYYY']
  },
  offsetTop: {
    description: 'Determines the dropdown top offset relative to the input.',
    options: [5, 20, 50]
  },
  position: {
    description: 'Determines the dropdown position relative to the input.',
    options: ['auto', 'top', 'bottom']
  },
  mobile: {
    description: 'Determines if the dropdown should be rendered in mobile devices.'
  },
  minDate: {
    description: `Determines the earliest selectable date. Accepted values are date
    <code>object</code>, date <code>string</code> as in locale format or <code>integer</code>
    as offset days from current day. Set to <code>false</code> to ignore the option.`,
    options: ['default', 5, 10]
  },
  maxDate: {
    description: `Determines the latest selectable date. Accepted values are date
    <code>object</code>, date <code>string</code> as in locale format or <code>integer</code>
    as offset days from current day. Set to <code>false</code> to ignore the option.`,
    options: ['default', 5, 10]
  },
  locale: {
    description: `Determines the locale data object, <code>months</code>,
      <code>weekDays</code> and <code>weekStart</code>.`,
    default: {},
    value: ''
  }
}

const events = {
  show: {
    description: 'Emited on dropdown show.'
  },
  hide: {
    description: 'Emited on dropdown hide.'
  },
  update: {
    description: 'Emited on calendar rendering.'
  },
  change: {
    description: `Emited on date selection passing as argument the
      <code>Moment</code> object.`
  }
}
</script>
