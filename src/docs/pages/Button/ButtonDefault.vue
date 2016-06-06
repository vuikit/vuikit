<template>
  <docs-page
    :props="props"
    :slots="slots"
    :code="code">
    <div slot="demo">
      <vk-button
        :color="props.color.value"
        :size="props.size.value"
        :width="props.width.value"
        :icon-left="props.iconLeft.value"
        :icon-right="props.iconRight.value"
        :active="props.active.value"
        :disabled="props.disabled.value"
        :value.sync="props.value.value">
        Button
      </vk-button>
    </div>
    <div slot="desc">
      The <code>vk-button</code> component renders a standard button.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Button', props),
    slots,
    code
  })
}

const code =
`<vk-button>
  Button
</vk-button>`

const props = {
  value: {
    description: `Determines the value of the button when used with other
      components.`
  },
  active: {
    description: 'Determines whether or not the button is active.'
  },
  disabled: {
    description: 'Determines whether or not the button is disabled.'
  },
  color: {
    description: `Determines the color variation of the button, <code>'primary'</code>,
      <code>success</code>, <code>danger</code> or <code>link</code>. Leave empty
      for default.`,
    options: ['default', 'primary', 'success', 'danger', 'link']
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
  }
}

const slots = {
  default: {
    description: 'The default slot holds the button text content.'
  }
}
</script>
