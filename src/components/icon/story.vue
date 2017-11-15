<template>
  <div class="uk-padding">

    <h2>Default</h2>
    <vk-icon icon="check" />

    <h2>Ratio</h2>
    <vk-icon icon="check" ratio="2" />

    <h2>Custom Icon</h2>
    <vk-icon><icon-plus /></vk-icon>

    <h2>Link</h2>
    <vk-icon-link icon="check" />

    <h2>Link Reset</h2>
    <vk-icon-link icon="check" reset />

    <h2>Button</h2>
    <vk-icon-button icon="check" />

  </div>
</template>

<script>
import IconPlus from '@vuikit/icons/lib/plus'

export default {
  components: {
    IconPlus
  }
}
</script>
