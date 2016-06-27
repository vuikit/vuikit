<template>
  <div class="uk-block">
    <h2>Datepicker</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <div class="uk-form">
      <vk-datepicker v-ref:demo
        :value.sync="props.value.demo.value"
        :position="props.position.demo.value"
        :mobile="props.mobile.demo.value"
        :min-date="props.minDate.demo.value"
        :max-date="props.maxDate.demo.value"
        :offset="props.offset.demo.value">
      </vk-datepicker>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-datepicker</code> component renders an input with a toggleable datepicker.
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
import { merge, pick } from 'lodash'
import Component from '../lib/Datepicker'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    events,
    example
  })
}

const props = {
  value: {
    description: 'The selected date that will be reflected on the input.',
    demo: {
      editable: false
    }
  },
  format: {
    description: `The date format that will be applied on the input. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>`
  },
  offset: {
    description: 'Determines the dropdown top offset relative to the input.',
    demo: {
      options: [20, 50]
    }
  },
  position: {
    description: 'Determines the dropdown position relative to the input.',
    demo: {
      options: ['top', 'bottom']
    }
  },
  mobile: {
    description: 'Wheter to render the dropdown on mobile devices or use their native date input.',
    demo: {}
  },
  minDate: {
    description: `The minimum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [5, 10]
    }
  },
  maxDate: {
    description: `The maximum date that is selectable. Supports any input
      format supported by <a href="http://momentjs.com/docs/#/parsing/">moment.js</a>
      or an <code>integer</code> as offset days from current day.`,
    demo: {
      options: [5, 10]
    }
  },
  locale: {
    description: `By default, VkDatepicker comes with the English locale strings.
      You can use this to change the language, or change the first day of the week.
      See <a href="http://momentjs.com/docs/#/i18n/">moment.js documentation</a> for more details.`
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

const example =
`<vk-datepicker {attrs}>
</vk-datepicker>`
</script>
