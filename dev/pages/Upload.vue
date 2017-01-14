<template>
  <layouts-default>
    <h1>Upload</h1>
    Displays a placehoder for uploading files.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-upload
        @dropped="events.dropped.emited = true"
        @selected="events.selected.emited = true">
        <i class="uk-icon-cloud-upload uk-icon-medium uk-text-muted uk-margin-small-right"></i>
        Attach binaries by dropping them here or
        <a class="uk-form-file">
          selecting one<input type="file">
        </a>.
      </vk-upload>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import mixin from './_mixin'

export default {
  name: 'PageUpload',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
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
    description: 'Emited on file drop passing as arguments the files.',
    emited: false
  }
}

const example =
`<vk-upload {attrs}>
  <a class="uk-form-file">Select File<input type="file"></a>
</vk-upload>`
</script>
