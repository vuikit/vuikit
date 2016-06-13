<template>
  <docs-page
    component="upload"
    :code-slot="codeSlot"
    :props="props"
    :slots="slots"
    :events="events">
    <div slot="demo">
      <vk-upload v-ref:demo>
        <i class="uk-icon-cloud-upload uk-icon-medium uk-text-muted uk-margin-small-right"></i>
        Attach binaries by dropping them here or
        <a class="uk-form-file">
          selecting one<input type="file">
        </a>.
      </vk-upload>
    </div>
    <div slot="desc">
      The <code>vk-upload</code> component deals with the UI part of an upload placeholder.
    </div>
  </docs-page>
</template>

<script>
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    slots,
    codeSlot,
    events
  })
}

const codeSlot =
'<a class="uk-form-file">Select File<input type="file"></a>'

const events = {
  dropped: {
    description: 'Emited on file drop passing as arguments the files.'
  },
  selected: {
    description: 'Emited on file selection passing as arguments the file.'
  }
}

const slots = {
  default: {
    description: 'The container for the placeholder.'
  }
}
</script>
