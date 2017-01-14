<template>
  <layouts-default>
    <h1>Modal as Confirm</h1>
    A very common usage of <code>vk-modal</code> is to display a confirm dialog.
      That can be acomplished with just a specific slot layout.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-button
        @click="show = true">
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
            @click="
              confirmed = false,
              show = false
            ">
            Cancel
          </vk-button>
          <vk-button
            color="primary"
            @click="
              confirmed = true,
              show = false
            ">
            OK
          </vk-button>
        </div>
      </vk-modal>
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
  </layouts-default>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    show: false,
    confirmed: false,
    example
  })
}

const example =
`<vk-button
  @click="show = true">
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
      @click="
        confirmed = false,
        show = false
      ">
      Cancel
    </vk-button>
    <vk-button
      color="primary"
      @click="
        confirmed = true,
        show = false
      ">
      OK
    </vk-button>
  </div>
</vk-modal>`
</script>
