<template>
  <docs-page
    :props="props"
    :slots="slots"
    :code="code">
    <div slot="demo">
      <vk-button-link v-ref:demo
        :style="props.style.value"
        :size="props.size.value"
        :width="props.width.value"
        :icon-left="props.iconLeft.value"
        :icon-right="props.iconRight.value"
        :active="props.active.value"
        @click.prevent>
        Link
      </vk-button-link>
    </div>
    <div slot="desc">
      The <code>vk-button-link</code> component is a variation that renders an anchor that looks like a button.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('ButtonLink', props),
    slots,
    code
  })
}

const code =
`<vk-button-link>
  Link
</vk-button-link>`

const props = {
  href: {
    description: 'Determines the link to follow when the button is pressed.',
    editable: false
  },
  active: {
    description: 'Determines whether or not the button is active.'
  },
  style: {
    description: `Determines the style variation of the button, <code>'primary'</code>,
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
