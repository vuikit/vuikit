<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Upload</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-upload
        @dropped="events.dropped.emited = true"
        @selected="events.selected.emited = true">
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
      <vk-tabs
        :index="tabsIndex"
        @change="tabsIndex = arguments[0]">
        <vk-tabs-item name="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tabs-item>
        <vk-tabs-item name="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </vk-tabs-item>
        <vk-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tabs-item>
      </vk-tabs>
    </div>
  </layouts-default>
</template>

<script>
import mixin from './_mixin'

export default {
  name: 'PageUpload',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
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
