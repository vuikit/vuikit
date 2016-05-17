<template>
  <div>
    <vk-button
      :style="api.style"
      :size="api.size"
      :width="api.width"
      :icon-left="api.iconLeft"
      :icon-right="api.iconRight"
      :state="api.state"
      :disabled="api.disabled"
      :value.sync="api.value">
      Button
    </vk-button>
    <vk-button-link
      :style="api.style"
      :size="api.size"
      :width="api.width"
      :icon-left="api.iconLeft"
      :icon-right="api.iconRight"
      :state="api.state"
      :value.sync="api.value">
      Link
    </vk-button-link>
    <div class="uk-margin-large">
      Despite minor specific attributes, <code>vk-button</code> and
      <code>vk-button-link</code> will render a nice looking button sharing the
      same API, being the first a <i>button</i> and the last an <i>anchor</i>.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="propsRows" :values="$data.api"></table-api-props>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getPropsDefaults(Helper.getProps('Button'))
  }),
  computed: {
    demoCode: () => demoCode,
    propsRows: () => merge({},
      Helper.getProps('Button'),
      Helper.getProps('ButtonLink'),
      propsInfo
    )
  }
}

const demoCode =
`<vk-button>Button</vk-button>
<vk-button-link>Link</vk-button-link>`

const propsInfo = {
  style: {
    description: `Determines the style variation of the button, <code>'primary'</code>,
      <code>success</code>, <code>danger</code> or <code>link</code>. Leave empty
      for default.`,
    options: ['default', 'primary', 'success', 'danger', 'link']
  },
  text: {
    description: `The text for the button inner content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  },
  size: {
    description: `Determines the size of the button, <code>mini</code>,
      <code>small</code> or <code>large</code>. Leave empty for default.`,
    options: ['mini', 'small', 'default', 'large']
  },
  width: {
    description: `Determines the width of the button using the <i>UIkit Grid</i>
      classes.`,
    options: ['default', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-10']
  },
  iconLeft: {
    description: `Determines the icon from the <i>Font Awesome</i> library to be
      placed on the left of the button inner content.`,
    options: ['default', 'flag', 'microphone', 'gamepad']
  },
  iconRight: {
    description: `Determines the icon from the <i>Font Awesome</i> library to be placed
      on the right of the button inner content.`,
    options: ['default', 'flag', 'microphone', 'gamepad']
  },
  state: {
    description: 'Determines whether or not the button is active.'
  },
  disabled: {
    description: `Determines whether or not the button is disabled.
      Specific to <code>vk-button</code>.`
  },
  value: {
    description: `Determines the value of the button when used with other
      components. Specific to <code>vk-button</code>.`
  },
  href: {
    editable: false,
    description: `Determines the link to follow when the button is pressed.
      Specific to <code>vk-button-link</code>.`
  },
  type: {
    ignore: true
  }
}
</script>
