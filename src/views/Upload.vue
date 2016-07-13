<template>
  <div class="uk-block">
    <h2>Upload</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-upload v-ref:demo>
      <i class="uk-icon-cloud-upload uk-icon-medium uk-text-muted uk-margin-small-right"></i>
      Attach binaries by dropping them here or
      <a class="uk-form-file">
        selecting one<input type="file">
      </a>.
    </vk-upload>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-upload</code> component deals with the UI part of an upload placeholder.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
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
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    slots,
    events,
    example
  })
}

const slots = {
  default: {
    description: 'The container for the placeholder.'
  }
}

const events = {
  dropped: {
    description: 'Emited on file drop passing as arguments the files.'
  },
  selected: {
    description: 'Emited on file selection passing as arguments the file.'
  }
}

const example =
`<vk-upload {attrs}>
  <a class="uk-form-file">Select File<input type="file"></a>
</vk-upload>`
</script>
