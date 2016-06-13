<template>
  <docs-page
    component="datepicker"
    :props="props"
    :events="events">
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
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Datepicker', props),
    events,
    demoValue: ''
  })
}

const props = {
  value: {
    description: 'The selected date that will be reflected on the input.',
    editable: false
  },
  format: {
    description: `The date format that will be applied on the input. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>`,
    demo: false
  },
  offsetTop: {
    description: 'Determines the dropdown top offset relative to the input.',
    options: [20, 50]
  },
  position: {
    description: 'Determines the dropdown position relative to the input.',
    options: ['top', 'bottom']
  },
  mobile: {
    description: 'Wheter to render the dropdown on mobile devices or use their native date input.'
  },
  minDate: {
    description: `The minimum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    options: [5, 10]
  },
  maxDate: {
    description: `The maximum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    options: [5, 10]
  },
  locale: {
    description: `By default, VkDatepicker comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details.`,
    default: {},
    demo: false
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
    description: 'Emited on month view update.'
  },
  select: {
    description: 'Emited on day selection with its <code>moment.js</code> object as argument.'
  },
  change: {
    description: 'Emited on selection change with its <code>moment.js</code> object as argument.'
  }
}
</script>
