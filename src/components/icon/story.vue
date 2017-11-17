<template>
  <div class="uk-padding">

    <h2>Default</h2>
    <vk-icon icon="check" />

    <h2>Link</h2>
    <vk-icon-link icon="check" />

    <h2>Link Reset</h2>
    <vk-icon-link icon="check" reset />

    <h2>Button</h2>
    <vk-icon-button icon="check" />

    <h2>Custom Icon</h2>
    <vk-icon><icon-plus /></vk-icon>

    <h2>Icon Options</h2>

    <h3>Ratio</h3>
    <vk-icon icon="check" ratio="2" />

    <h3>Width/Height</h3>
    <vk-icon icon="check" width="16" height="16" />

    <h3>ViewBox</h3>
    <vk-icon icon="check" viewBox="6 6 16 16" />

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
