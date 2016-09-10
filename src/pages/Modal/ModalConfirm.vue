<template>
  <div class="uk-block">
    <h2>Modal as Confirm Dialog</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      @click.native="show = true">
      {{ confirmed ? 'Confirmed' : 'Open' }}
    </vk-button>
    <vk-modal
      :show="show"
      @clickOut="
        show = false,
        confirmed = false
      "
      @keyEsc="
        show = false,
        confirmed = false
      ">
      Please confirm.
      <div class="uk-modal-footer uk-text-right">
        <vk-button
          @click.native="
            confirmed = false,
            show = false
          ">
          Cancel
        </vk-button>
        <vk-button
          color="primary"
          @click.native="
            confirmed = true,
            show = false
          ">
          OK
        </vk-button>
      </div>
    </vk-modal>
    <!-- DESC -->
    <div class="uk-margin-large">
      <p>A very common usage of <code>vk-modal</code> is to display a confirm dialog.
        That can be acomplished with just a specific slot layout.</p>
      <p><span class="uk-badge uk-badge-notification">Note</span> If your project
      requires this combination quite often it would be wise to wrap it all up into
      a custom component.</p>
    </div>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="tabsIndex = arguments[0]">
      <vk-tabs-item name="Code">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    show: false,
    confirmed: false,
    example
  })
}

const example =
`<vk-button
  @click.native="show = true">
  {{ confirmed ? 'Confirmed' : 'Open' }}
</vk-button>
<vk-modal
  :show="show"
  @clickOut="
    show = false,
    confirmed = false
  "
  @keyEsc="
    show = false,
    confirmed = false
  ">
  Please confirm.
  <div class="uk-modal-footer uk-text-right">
    <vk-button
      @click.native="
        confirmed = false,
        show = false
      ">
      Cancel
    </vk-button>
    <vk-button
      color="primary"
      @click.native="
        confirmed = true,
        show = false
      ">
      OK
    </vk-button>
  </div>
</vk-modal>`
</script>
