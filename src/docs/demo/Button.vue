<template>
  <div>
    <div class="uk-margin-large">
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
    </div>
    <api-prop-table :rows="apiRows" :values="$data.api"></api-prop-table>
  </div>
</template>

<script>
import * as Helper from '../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('Button')
  }),
  computed: {
    apiRows: function () {
      return merge({}, Helper.getComponentProps('Button'), apiDemoData)
    }
  }
}

const apiDemoData = {
  style: {
    description: 'Determines the style variation of the button.',
    options: {
      Default: 'default',
      Primary: 'primary',
      Success: 'success',
      Danger: 'danger',
      Link: 'link'
    }
  },
  size: {
    description: 'Determines the size of the button.',
    options: {
      Mini: 'mini',
      Small: 'small',
      Default: 'default',
      Large: 'large'
    }
  },
  width: {
    description: `Determines the width of the button using the UIkit Grid
      classes.`,
    options: {
      'Default': 'default',
      '1-1': '1-1',
      '1-2': '1-2',
      '1-3': '1-3',
      '1-4': '1-4',
      '1-5': '1-5',
      '1-6': '1-6',
      '1-10': '1-10'
    }
  },
  iconLeft: {
    description: `Determines the icon from the Font Awesome library to be
      placed on the left of the button inner content.`,
    options: {
      none: '',
      Flag: 'flag',
      Microphone: 'microphone',
      Gamepad: 'gamepad',
      '...': ''
    }
  },
  iconRight: {
    description: `Determines the icon from the Font Awesome library to be placed
      on the right of the button inner content.`,
    options: {
      none: '',
      Flag: 'flag',
      Microphone: 'microphone',
      Gamepad: 'gamepad',
      '...': ''
    }
  },
  state: {
    description: 'Determines whether or not the button is active.'
  },
  disabled: {
    description: 'Determines whether or not the button is disabled.'
  },
  value: {
    description: `Determines the value of the button when used with other
      components.`
  }
}
</script>
