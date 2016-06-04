<template>
  <div>
    <docs-page
      :props="props"
      :slots="slots"
      :code="code">
      <div slot="demo">
        <vk-button
          :style="props.style.value"
          :size="props.size.value"
          :width="props.width.value"
          :icon-left="props.iconLeft.value"
          :icon-right="props.iconRight.value"
          :active="props.active.value"
          :disabled="props.disabled.value"
          :value.sync="props.value.value"
          text="Button">
        </vk-button>
        <vk-button-link
          :style="props.style.value"
          :size="props.size.value"
          :width="props.width.value"
          :icon-left="props.iconLeft.value"
          :icon-right="props.iconRight.value"
          :active="props.active.value"
          :value.sync="props.value.value"
          text="Link"
          @click.prevent>
        </vk-button-link>
      </div>
      <div slot="desc">
        Despite minor specific attributes, <code>vk-button</code> and <code>vk-button-link</code> render a nice looking button, being the first a <i>button</i> and the last an <i>anchor</i>.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import { merge } from 'lodash'

export default {
  mixins: [mixins],
  data: () => ({
    props: merge(
      Helper.getProps('Button', props),
      Helper.getProps('ButtonLink', props)
    ),
    slots,
    code
  })
}

const code =
`<vk-button
  text="Button">
</vk-button>

<vk-button-link
  text="Link">
</vk-button-link>`

const props = {
  active: {
    description: 'Determines whether or not the button is active.'
  },
  disabled: {
    description: `Determines whether or not the button is disabled.
      Specific to <code>vk-button</code>.`
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
  },
  value: {
    description: `Determines the value of the button when used with other
      components. Specific to <code>vk-button</code>.`
  },
  text: {
    description: `The text for the button inner content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  },
  href: {
    description: `Determines the link to follow when the button is pressed.
      Specific to <code>vk-button-link</code>.`,
    editable: false
  }
}

const slots = {
  default: {
    description: 'The default slot holds the button text content.'
  }
}
</script>
