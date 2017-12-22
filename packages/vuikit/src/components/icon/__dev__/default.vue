<template>
  <div class="uk-padding">

    <h2>Default</h2>
    <vk-icon name="check" />

    <h2>Link</h2>
    <vk-icon-link name="check" />

    <h2>Link Reset</h2>
    <vk-icon-link name="check" reset />

    <h2>Button</h2>
    <vk-icon-button name="check" />

    <h2>Custom Icon</h2>
    <vk-icon>
      <icon-check></icon-check>
    </vk-icon>

    <h2>Icon Options</h2>

    <h3>Ratio</h3>
    <vk-icon name="check" ratio="2" />

    <h3>Width/Height</h3>
    <vk-icon name="check" width="16" height="16" />

    <h3>ViewBox</h3>
    <vk-icon name="check" viewBox="6 6 16 16" />

  </div>
</template>

<script>
import {
  Icon as VkIcon,
  IconLink as VkIconLink,
  IconButton as VkIconButton
} from '../'
import IconCheck from './icon-check'

export default {
  components: {
    VkIcon,
    VkIconLink,
    VkIconButton,
    IconCheck
  }
}
</script>
